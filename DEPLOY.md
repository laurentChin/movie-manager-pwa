# Deployment

CI/CD runs through GitHub Actions (`.github/workflows/ci.yml`, `deploy.yml`, `rollback.yml`). On every push to `master` that passes CI, the app is built (`bun run build`, static files only — no container, no runtime dependency on the server beyond a web server able to serve static files) and uploaded to a new release directory on the production server. No Docker: this is a pure static site, so there's nothing to run on the server at all.

Deploy is chained off CI's `workflow_run` completing, so it only fires for pushes CI actually ran for. CI's `push` trigger is restricted to paths that affect the built app (`src/**`, `public/**`, `scripts/**`, `bunfig.toml`, `package.json`, `bun.lock`) — changes limited to docs, tests, or CI workflows themselves don't trigger a deploy. PRs still run CI unconditionally, for visibility.

## How it works

- Each deploy builds `build/` on the GitHub Actions runner and `rsync`s its **contents directly** into `<deploy_path>/releases/<commit-sha>/` on the server — a release directory holds only the built files, nothing else.
- `current` is a symlink to the active release directory. The web server (nginx or equivalent) should serve straight from `current` (e.g. `root <deploy_path>/current;`), with an SPA fallback (`try_files $uri /index.html;`) since routing is client-side.
- Deploy = build + upload + `ln -sfn releases/<sha> current`. The 5 most recent releases are kept on the server; older ones are pruned automatically after each deploy.
- **Rollback = repointing that symlink to an older release, nothing else.** No rebuild, no network transfer beyond the SSH round trip — the release directory is already on disk.

## Server-side prerequisites

- A dedicated, unprivileged SSH user for GitHub Actions to deploy as (don't reuse a personal account), with write access to `<deploy_path>/releases/`. If this server already hosts another app deployed the same way (e.g. a companion API), its existing deploy user/key can be reused instead of creating a new one.
- `<deploy_path>/releases/` created and owned by that user.
- A web server vhost pointed at `<deploy_path>/current` with an SPA fallback, as described above.

## GitHub repository secrets

Add these under Settings → Secrets and variables → Actions → **Secrets**:

| Secret            | Value                          |
| ----------------- | ------------------------------ |
| `DEPLOY_SSH_HOST` | SSH host for the deploy target |
| `DEPLOY_SSH_USER` | The dedicated deploy user      |
| `DEPLOY_SSH_KEY`  | Its private key                |

No registry credentials needed — nothing gets pulled from a registry.

## Production environment variables

`REACT_APP_*` variables are baked into the static JS at build time (see `bunfig.toml` / `src/Auth/constants.js` etc.), so they can't be runtime secrets — they're non-sensitive config (URLs, a display limit), stored as **repository Variables** (Settings → Secrets and variables → Actions → **Variables** tab, not Secrets) and referenced in `ci.yml`/`deploy.yml` via `${{ vars.* }}`:

| Variable                          | Value                                 |
| --------------------------------- | ------------------------------------- |
| `REACT_APP_GQL_SERVER`            | The API's public URL, with `/graphql` |
| `REACT_APP_API_URL`               | The API's public base URL             |
| `REACT_APP_MOVIE_LIST_ITEM_LIMIT` | Page size for the movie list          |

## Rollback

Actions tab → **Rollback** workflow → _Run workflow_ → enter the release to redeploy (a commit SHA — visible in `<deploy_path>/releases/` on the server, or in past **Deploy** workflow runs). Fails fast with a clear message if that release directory doesn't exist on the server (e.g. already pruned).
