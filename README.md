# Margin

A study app for MATH 135, MATH 137, CHEM 120 and PHYS 121: lessons with diagrams, proof practice, spaced review, test planning and an AI tutor that answers from your own notes.

Open it on an iPhone in Safari, tap Share, then **Add to Home Screen**. It works offline, and progress is saved on the device.

## How updates ship

The app's source is in `source/`. Every push that changes it runs `.github/workflows/build.yml`, which tests about 38,000 generated questions, builds the app and publishes the build only if everything passes.

To build locally: `python3 source/build_pwa.py` (writes `index.html`, `sw.js` and `manifest.webmanifest` at the repo root).

PDF reading uses [pdf.js](https://github.com/mozilla/pdf.js) (Apache 2.0, `lib/PDFJS-LICENSE`).
