ICONS REQUIRED
==============
Generate two PNG icon files and place them here:

  icon-192x192.png  — 192×192 px PNG
  icon-512x512.png  — 512×512 px PNG

How to generate them from icon.svg:
  Option 1: Use https://realfavicongenerator.net
  Option 2: Use https://www.pwabuilder.com/imageGenerator
  Option 3: Run:  npx sharp-cli --input icon.svg --output icon-192x192.png resize 192 192

The app will install on phones without icons, but they are needed
for the home-screen shortcut to look professional.
