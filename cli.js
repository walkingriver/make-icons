#!/usr/bin/env node

//////////////////////////////////////////////////////////////
// Make a bunch of iOS App icons from a Master
// Given an image at least 1024x1024 pixels named icon.png, resize and create a
// duplicate at each specified size. Add new sizes as needed. When finished,
// copy the resulting images into your Xcode iOS project.

const fs = require('fs');
const path = require('path');
const [, , ...args] = process.argv;
const sep = path.sep;
const iosOutDir = path.join(process.cwd(), 'ios/App/App/Assets.xcassets/AppIcon.appiconset');
const iosFiles = [
  { size: 20, name: '/AppIcon-20x20@1x.png' },
  { size: 40, name: '/AppIcon-20x20@2x-1.png' },
  { size: 40, name: '/AppIcon-20x20@2x.png' },
  { size: 60, name: '/AppIcon-20x20@3x.png' },
  { size: 29, name: '/AppIcon-29x29@1x.png' },
  { size: 58, name: '/AppIcon-29x29@2x-1.png' },
  { size: 58, name: '/AppIcon-29x29@2x.png' },
  { size: 40, name: '/AppIcon-40x40@1x.png' },
  { size: 76, name: '/AppIcon-76x76@1x.png' },
  { size: 80, name: '/AppIcon-40x40@2x-1.png' },
  { size: 80, name: '/AppIcon-40x40@2x.png' },
  { size: 87, name: '/AppIcon-29x29@3x.png' },
  { size: 120, name: '/AppIcon-40x40@3x.png' },
  { size: 120, name: '/AppIcon-60x60@2x.png' },
  { size: 180, name: '/AppIcon-60x60@3x.png' },
  { size: 152, name: '/AppIcon-76x76@2x.png' },
  { size: 167, name: '/AppIcon-83.5x83.5@2x.png' },
  { size: 1024, name: '/AppIcon-512@2x.png' },
];

// console.log(args);

function makeFileNameIos(opts) {
  return path.join(iosOutDir, opts.name);
}

function resize(inputFile, width, height, outFile) {
  return new Promise((resolve, reject) => {

    require('sharp')(inputFile)
      .resize(width, height)
      .toFile(outFile, (err) => {
        if (err) {
          reject(err)
        } else {
          resolve(outFile);
        }
      })
  });
}

const allImages = iosFiles.map((x) => {
  x.path = makeFileNameIos(x);
  console.log(`Resizing to (${x.size},${x.size}) > ${x.path}`);
  return resize('icon.png', x.size, x.size, x.path);
})

const initDir = path.isAbsolute(iosOutDir) ? sep : '';
iosOutDir.split(sep).reduce((parentDir, childDir) => {
  const curDir = path.resolve(parentDir, childDir);
  // console.log(`Dir Name: ${curDir}`);
  if (!fs.existsSync(curDir)) {
    // console.log('Created');
    fs.mkdirSync(curDir);
  }

  return curDir;
}, initDir);


Promise.all(allImages)
  .then(() => { console.log("DONE!") })
  .catch((err) => { console.error(err) });
