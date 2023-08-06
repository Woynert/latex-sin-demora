#!/usr/bin/env sh

echo "Starting..."

npm install &&
npm run compile &&
npm run package &&
cp ./dist/*.AppImage /out/.

echo "Finished."
