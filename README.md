# omerviner.github.io

Portfolio site, built by GitHub Pages with Jekyll.

## Run it locally

```
bundle install        # once
bundle exec jekyll serve
```

Then open http://localhost:4000. Pages rebuild when you save.

## Add or edit a project

Each project is one file in `_projects/`. The file name is its URL (`_projects/bazaart.html` → `/work/bazaart/`).

Front matter fields (all optional except `title`, `group`, `order`):

| Field | What it is |
|---|---|
| `title` | Project name |
| `group` | `selected`, `interactive`, `design` or `hidden` |
| `order` | Position within its group |
| `summary` | One line, shown on the card and in link previews |
| `year`, `context`, `role`, `tools` | The facts row on the project page |
| `outcome` | Highlighted result box |
| `description_html` | Intro paragraph |
| `hero` | Big image at the top |
| `thumb` | 2:1 card image on the home page (no thumb = a teal text card) |
| `links` | List of `label` / `url` |
| `redirect_from` | Old URLs that should land here |

Below the front matter goes the page body: images, captions and videos in HTML.

## OrCam images

The OrCam Hear visuals come from the designers' case studies (used with permission). Download them once with:

```
sh tools/fetch-orcam-images.sh
```

## PopApp screenshots

```
npx -y playwright@1.48.2 install chromium   # once
npx -y -p playwright@1.48.2 node tools/screenshot-popapp.mjs
```

Saves home (desktop and phone) and purchase screenshots of popappbooks.me into `images/popapp/`.
For `images/popapp/design-system.png`, export the Design System artboard from the design canvas.
