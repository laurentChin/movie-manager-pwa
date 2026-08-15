# /!\ WIP /!\

This is a side-project focused on learning new technologies and experimenting ideas.
The main pattern used in this is "Getting the shit done!"

# movie-manager-pwa

A ReactJS based pwa to manage a movie collection

## Prerequisites

- [Bun](https://bun.com) (runtime, package manager, bundler and dev server)
- A running instance of the [movie-manager-api](https://github.com/laurentChin/movie-manager-api) — this PWA is only the client, it needs the API reachable over HTTP to do anything useful

## Setup

Install dependencies:

```bash
bun install
```

Create a `.env` file at the project root with the API's location:

```
REACT_APP_GQL_SERVER=http://localhost:8000/graphql
REACT_APP_API_URL=http://localhost:8000
REACT_APP_MOVIE_LIST_ITEM_LIMIT=20
```

Adjust the URLs/port to match wherever the API is actually running.

## Development

```bash
bun run start
```

Starts Bun's dev server (with hot reload) on `http://localhost:3000`.

## Production build

```bash
bun run build
```

Outputs a static, deployable bundle to `build/`.
