# Phaser React Bifrost Vite TS Template

![Phaser](http://i.imgur.com/9M26w5m.png)
![TypeScript](http://i.imgur.com/5MWne89.png)
![Vite](https://seeklogo.com/images/V/vite-logo-BFD4283991-seeklogo.com.png)
![React Bifrost](https://github.com/Dark-Magic-Studios/react-bifrost/raw/master/docs/logo.png)


Phaser + React Bifrost + Vite + TypeScript  Stack
With ESLint & Prettier


## Template Features

- Latest Phaser 3.x
- Using React Bifrost for the UI
- Prettier + ESLint
- Vite for blazing fast compilation and hot reloading
- Assets generator
- BGM Player (Howler.js)
- Logger (pino & donsole)
- React UI integration (React Bifrost)
- Animated tiles plugin

### React Bifrost Examples
This template includes three examples for using React Bifrost to build your UI with React.
- Title Realm
  - Simple menu with buttons that starts the Phaser game.
- Hud Realm
  - Communicates back and forth between React & Phaser to show the HP meter
- Game Over
  - Restarts the game

## Developing & Building
### Setup

```
yarn
yarn assets
yarn dev
```
### Generating Assets Auto Import

! If you use the auto generated assets :point_down: !
Everytime you add something to your assets directory, you should run the `yarn assets` command to generate the auto import file.
### Run live server

```
yarn dev
```
### Build
```
yarn build
```
## Recipe
### Aseprite Export Example
In this template, I've included the following sprite:
![image](https://user-images.githubusercontent.com/22729436/165117297-dd659594-8ac8-4ef2-aea0-18ac37723b03.png)
Exported like so
![image](https://user-images.githubusercontent.com/22729436/165117340-ef9519b0-98d8-4735-a0f2-aec19fc0dbdb.png)
![image](https://user-images.githubusercontent.com/22729436/165117371-3915b378-290a-4f56-b7e7-fea3b75f0b15.png)

### Tiled Maps
Mark all walls with custom property: `collides: true`
![image](https://user-images.githubusercontent.com/22729436/165117412-5e2c844e-852d-4e33-9a17-da5429f6a456.png)

Embed tileset in map
![image](https://user-images.githubusercontent.com/22729436/165117456-8a7f809c-60db-447f-adfc-35d7a4033f2b.png)

### Audiosprites
Since Vite **does not support** `ac3` & `m4a`  formats, we need to make sure the audiosprite `json` is not referencing those files and that they're not included in the bundle.


## Credits
[Tileset](https://ninjikin.itch.io/starter-tiles)
[Knight Sprite](https://aamatniekss.itch.io/fantasy-knight-free-pixelart-animated-character)

