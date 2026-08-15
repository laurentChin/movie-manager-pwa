# Deployment

CI/CD runs through GitHub Actions (`.github/workflows/ci.yml`, `deploy.yml`, `rollback.yml`). On every push to `master` that passes CI, the app is built (`bun run build`, static files only — no container, no runtime dependency on the server beyond nginx) and uploaded to a new release directory on the production server. No Docker: this is a pure static site, so there's nothing to run on the server at all.

## How it works

- Each deploy builds `build/` on the GitHub Actions runner and `rsync`s its **contents directly** into `/var/www/movie-manager/pwa/releases/<commit-sha>/` on the server — a release directory holds only the built files, nothing else.
- `current` is a symlink to the active release directory. nginx serves straight from `current` — see `/etc/nginx/sites-available/movie-manager-pwa` (`root /var/www/movie-manager/pwa/current;`). This required a one-time change to that config (it used to point at `current/build`, back when releases held a `build/` subdirectory); already applied on the server.
- Deploy = build + upload + `ln -sfn releases/<sha> current`. The 5 most recent releases are kept on the server; older ones are pruned automatically after each deploy.
- **Rollback = repointing that symlink to an older release, nothing else.** No rebuild, no network transfer beyond the SSH round trip — the release directory is already on disk.

## Reuses the same server access as movie-manager-api

Same server, same purpose, so this reuses the dedicated `deploy` user and SSH key already set up for `movie-manager-api` (see that repo's `DEPLOY.md` for how it was created) — no new user or key needed. The only addition on the server side was creating `/var/www/movie-manager/pwa/releases/`, owned by `deploy` (already done).

Unlike the API, no `GHCR_READ_TOKEN` is needed here — nothing gets pulled from a registry.

## GitHub repository secrets

GitHub secrets are per-repository, so these need to be added again here even though the values are identical to `movie-manager-api`'s:

| Secret            | Value                                                    |
| ----------------- | -------------------------------------------------------- |
| `DEPLOY_SSH_HOST` | Same server hostname/IP as movie-manager-api             |
| `DEPLOY_SSH_USER` | `deploy`                                                 |
| `DEPLOY_SSH_KEY`  | Same private key as movie-manager-api's `DEPLOY_SSH_KEY` |

## Production environment variables

`REACT_APP_*` variables are baked into the static JS at build time (see `bunfig.toml` / `src/Auth/constants.js` etc.), so they can't be runtime secrets — they're non-sensitive config (URLs, a display limit), stored as **repository Variables** (Settings → Secrets and variables → Actions → **Variables** tab, not Secrets) and referenced in `ci.yml`/`deploy.yml` via `${{ vars.* }}`:

| Variable                          | Value                                    |
| --------------------------------- | ---------------------------------------- |
| `REACT_APP_GQL_SERVER`            | `https://api.mm.laurentjanet.fr/graphql` |
| `REACT_APP_API_URL`               | `https://api.mm.laurentjanet.fr`         |
| `REACT_APP_MOVIE_LIST_ITEM_LIMIT` | `20`                                     |

## Rollback

Actions tab → **Rollback** workflow → _Run workflow_ → enter the release to redeploy (a commit SHA — visible in `/var/www/movie-manager/pwa/releases/` on the server, or in past **Deploy** workflow runs). Fails fast with a clear message if that release directory doesn't exist on the server (e.g. already pruned).

## What's not migrated yet

`shipitfile.js` (the old `shipit-cli` deploy, which built directly on the server) is kept in the repo for now as a fallback until this pipeline is confirmed working in production. Remove it (and the `shipit-*` devDependencies) once a real deploy + rollback have both been exercised successfully.
