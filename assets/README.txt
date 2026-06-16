ASSETS FOLDER
=============

These files are referenced from ../config.js. Swap them for your own, keeping
the same file names — or change the paths in config.js (meta.photo,
meta.photoBack, meta.resume, and each projects.items[].image).

This repo ships with only favicon.svg. ADD the files below yourself — the site
still runs without them (it shows your initials where a photo would go), but the
résumé button won't work until resume.pdf exists.

  profile.jpg     Main photo (portrait, ~800x1000px looks best).
                  Until you add it, the site shows your initials instead.

  profile2.jpg    Second photo. The hero photo flips on scroll and reveals
                  this one. Use the same size/orientation as profile.jpg.

  resume.pdf      Your résumé. The "Download résumé" buttons point here.
                  (Change meta.resume in config.js if you rename it.)

  favicon.svg     Logo shown in the browser tab. A placeholder is included —
                  edit it (color + letter) or replace it with your own.

  projects/       Optional per-project images. Reference one via
                  projects.items[].image, e.g. "assets/projects/project-one.jpg".
                  These show as a side panel on laptops/monitors only.
