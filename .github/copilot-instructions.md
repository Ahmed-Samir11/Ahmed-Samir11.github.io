<!-- Copilot instructions for contributors and AI coding agents -->
# Repo snapshot

This is a Jekyll-based personal/academic site built from the Academic Pages / Minimal Mistakes theme. Key runtime pieces:

- Jekyll site engine (see `Gemfile` – includes `github-pages`).
- Frontend JS built via `npm` scripts (`package.json` → `npm run build:js`).
- Docker dev image and `docker-compose.yaml` for consistent local dev.

# Where to look (high-signal files/dirs)

- Config: `_config.yml` and `_config_docker.yml` (docker-specific overrides).
- Layouts & includes: `_layouts/` and `_includes/` (change these to modify HTML structure).
- Content collections: `_posts/`, `_talks/`, `_publications/`, `_teaching/` (YAML front matter drives metadata).
- Data and site JSON: `_data/` (e.g. `authors.yml`, `navigation.yml`, `cv.json`).
- Static files: `files/` (served at `/files/...`) and `assets/` (CSS/JS/fonts/images).
- Build tooling: `Gemfile`, `Dockerfile`, `docker-compose.yaml`, `package.json`.
- Generators/tools: `markdown_generator/` and `talkmap/` (Jupyter notebooks and `talkmap.py` used to produce markdown).

# Developer workflows (concrete commands)

- Native Ruby/Jekyll (recommended when editing templates):

  - Install deps: `bundle install` (or `bundle config set --local path 'vendor/bundle'` then `bundle install` if you lack global gem permissions).
  - Serve locally: `bundle exec jekyll serve -l -H localhost` or `jekyll serve -l -H localhost` → visit `http://localhost:4000`.

- Docker (reproducible dev environment):

  - Build & run: `docker compose up` (uses `Dockerfile` + `_config_docker.yml`).
  - Container runs: `jekyll serve -H 0.0.0.0 -w --config _config.yml,_config_docker.yml` on port 4000.

- VS Code Dev Container: use **F1 → Dev Container: Reopen in Container** (automatically serves at `http://localhost:4000`).

- JS asset tasks (when editing `assets/js`):

  - Rebuild minified JS: `npm run build:js`.
  - Watch JS changes: `npm run watch:js`.

# Project-specific conventions & patterns

- Front matter governs page metadata—follow existing examples in `_posts/` and `_talks/` for fields (date, layout, tags, venue).
- Use `_data/` for structured config (authors, navigation); templates read from these YAML/JSON files.
- Static uploads must go to `files/` to be served directly under `/files/`.
- Theme changes: edit `_layouts/*` and `_includes/*` rather than changing many pages individually.
- Keep `Gemfile` and `package.json` in sync with runtime needs: Dockerfile installs a specific `bundler` and a `connection_pool` gem.

# Integration points and gotchas

- CI / GitHub Pages: site depends on `github-pages` gem — publishing occurs via GitHub Pages (see `Gemfile`).
- Dockerfile creates a non-root user with UID 1000; volumes mount the repo into `/usr/src/app` so file ownership can differ on Windows — prefer `docker compose up` for consistency.
- If `bundle install` fails with permissions, use the local bundle path (see commands above).

# Examples to reference while editing

- Update head tags: `_includes/head.html` (SEO/meta changes).
- Add a new post: create ` _posts/YYYY-MM-DD-slug.md` with front matter matching existing posts.
- Modify navigation: `_data/navigation.yml` and `_includes/nav_list`.
- Regenerate publications/talk markdown: use scripts in `markdown_generator/` (see notebooks in `talkmap/`).

# How to propose changes

- For layout or content changes, run the local server and verify at `http://localhost:4000` before pushing.
- Keep JS changes focused: rebuild `assets/js/main.min.js` via `npm run build:js` and commit both source and built artifacts if you change plugin order.

---
If anything above is unclear or you want more detail (CI, Actions, or how `markdown_generator` is used), tell me what to expand and I'll update this file.
