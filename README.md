# make-icons
Makes a bunch of iOS App icons from a Master image

## Quick Start

1. Install make-icons
```sh
npm install -g @wr/make-icons
```

2. Create a PNG image, at least 1024x1024, without rounded corners, and without transparency. You may also use this icon ![sample image](icon.png), which is included as a sample.
3. Execute `make-icons`
4. Your new icons should be in a new folder, `./ios/App/App/Assets.xcassets/AppIcon.appiconset/`

## Prerequisites
- Node 8 (LTS) or later.
- [sharp](https://github.com/lovell/sharp) image processing library, which is installed by default.

## OS Requirements
- MacOS
- Linux
- Windows

## Adding to your Ionic/Capacitor project
1. Add this package as a devDependency, with `npm -D @wr/make-icons`
1. Open `package.json`.
1. Add the following line to your `scripts` section. `"icons: make-icons"`
1. Create your icons on demand with `npm run icons`

# Contributions
Contributions are welcome. I'm sure there are a lot of things we could add to this script. I made this for myself, and know it can be better still.

If you wish to contribute, please submit a pull request. Some of the things I'd like to do.

- Android icons
- Documentation
- iOS splash screens
- Android splash screens
- Automatic npm publishing
- Better command line arguments
- Ability to specify only android or iOS images