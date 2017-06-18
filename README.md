<img src="http://i.imgur.com/Dtki82g.png" align="right" />

# xf.js 

## Synopsis

a simple 2d game framework written entirely with javascript, intended for beginner programmers to get starting making games right away.

This project is inspred by macite's Swingame
+ Keep it simple!
+ Keep it cross platform
+ Make it easy to understand

## Installation

using npm 

    npm install xf.js
     
## Features & Usage

import using require

```javascript
    var xf = require('xf.js');
```

### Core

// TODO

### Graphics


Creating sprites are ever so easy.
<img src="http://i.imgur.com/X8Nwaxc.png" align="right" />

```javascript
    var mario = new xf.Sprite("mario").source(["assets/mario.png"])
```

wants some layers to your sprites? try this

```javascript
    var mario = new xf.Sprite("mario").source(["assets/mario.png","assets/mario2.png"])
```

Want to animate your sprites, add a spritesheet and define frames simply like this
<img src="https://media.giphy.com/media/a2mwR72nJsTS0/giphy.gif" width="10%" align="right" />


```javascript
    var tim = new Sprite("tim")
                 .animate("idle",["assets/tim/Tim_idle.png"],2,12,22,0,-1)
                 .animate("run",["assets/tim/Tim_run.png"],4,7,27,0,-1)
```
    
All component functionality can be addressed directly, for instance, if you want to rotate and transfrom a sprite etc., you can do
<img src="https://media.giphy.com/media/12jwUnRZyIIMGQ/giphy.gif" width="20%" align="right" />

```javascript
    var tim = new xf.Sprite("tim")
                     .animate("idle",["assets/tim/Tim_idle.png"],2,12,22,0,-1)
                     .animate("run",["assets/tim/Tim_run.png"],4,7,27,0,-1)
                     .translate(200,240)
                     .transform(80,100)
                     .center()
                     .weight(10)
                     .velocity(0.8,0)
                     .torque(1)
                     .goto("run")
                     .play(0.8);
```

### Geometry

// TODO

A comprehensive tutorial available [here](https://github.com/xxfast/xf.js/tutorial)  

## API Reference

API reference available [here](https://github.com/xxfast/xf.js/wiki)  

## Contributors

"All by myself" 🎶

## License

MIT
