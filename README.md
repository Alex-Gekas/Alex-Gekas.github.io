# Technical Writing Portfolio (MkDocs + Material)

A ready-to-use portfolio template with a **branded landing page** and **doc-style samples**.

## Quick start
1. **Install Python 3.10+** and `pip`.
2. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```
3. Run locally:
   ```bash
   mkdocs serve
   ```
   Visit http://127.0.0.1:8000

## Customize
- Edit `docs/index.md` to brand the landing page.
- Add your portrait at `docs/assets/images/portrait.jpg` (the file is optional).
- Replace sample pages in `docs/writing-samples/*` with your work.
- Adjust theme colors/logo in `mkdocs.yml`.

## Deploy to GitHub Pages
1. Create a GitHub repo and push this project.
2. In **Settings → Pages**, set **Source: GitHub Actions**.
3. The provided workflow builds and deploys automatically on pushes to `main`.

## Custom domain
- Add your domain in repo **Settings → Pages**.
- Update `site_url` in `mkdocs.yml` accordingly.

## Notes
- Uses **Material for MkDocs**.
- Mermaid diagrams work out of the box via `pymdownx.superfences` (use code fences with `mermaid`).
