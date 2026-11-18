# smuglilgoat.github.io

Portfolio of Ahmed Moussaoui — a Hugo site published at <https://smuglilgoat.github.io/>.

## What it does

The site has About, Hobbies, Projects and Posts sections, in English and French. Most pages are content files under `content/en/` and `content/fr/`, with shared layouts and settings in `config/_default/`.

- Theme: [hugo-theme-monochrome](https://github.com/kaiiiz/hugo-theme-monochrome), vendored as a Git submodule under `themes/`.
- Menus, languages, params, markup and site settings: `config/_default/*.toml`.
- The home page uses the theme's `balloon` layout; Projects uses `gallery`.

## Stack

Hugo (extended) + Dart Sass, GitHub Pages.

## Getting started

```bash
git clone --recurse-submodules https://github.com/smuglilgoat/smuglilgoat.github.io.git
cd smuglilgoat.github.io
hugo server
# http://localhost:1313
```

If the repository was cloned without submodules:

```bash
git submodule update --init --recursive
```

The CI workflow pins Hugo `0.120.2` (extended) and installs Dart Sass.

## Deploy

`.github/workflows/hugo.yaml` builds and publishes the site on every push to `main`, plus manual `workflow_dispatch`:

```bash
hugo --gc --minify --baseURL "<pages-url>/"
```

The generated `public/` directory is uploaded as a Pages artifact and deployed with `actions/deploy-pages`.

## Notes

- `public/`, `resources/` and `.hugo_build.lock` are build artefacts that are currently present in the repository; the source of truth is `content/`, `config/`, `assets/` and `static/`.
- The theme is a submodule: changes inside `themes/hugo-theme-monochrome` belong to its own repository.
