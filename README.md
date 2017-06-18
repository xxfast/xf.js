<img src="http://i.imgur.com/Dtki82g.png" align="right" />

# xf.js 

**[1.0.20] This is an experimental development built**

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

Create a game and add a scene 

```javascript
    var myGame = new xf.Game();
    var scene = new xf.Scene("test","#FFF");
    myGame.scenes().set(scene);
```

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
                 .play(-0.8)
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

Want just shapes to be rendered? easy,
<img src="https://media.giphy.com/media/uHX2LCiPPKzPW/giphy.gif" width="20%" align="right" />
```javascript
    var arrow = new xf.Polygon([{x:10,y:0},{x:10,y:10},{x:0,y:+10},{x:30,y:30}],{fill:"red",stroke:"black"})
                           .translate(200,200)
                           .transform(60,60)
                           .torque(2)
                           .center();
```

or use predefined shapes
<img src="http://i.imgur.com/2lpjNhT.png" width="15%" align="right" />
```javascript
    var circle = new Circle({fill:"grey",stroke:"black"},0,0,10)
                    .translate(200,200)
                    .transform(60,60)
                    .center();
```

A comprehensive tutorial available [here](https://github.com/xxfast/xf.js/tutorial) (coming soon...) 

## API Reference

API reference available [here](https://github.com/xxfast/xf.js/wiki)  

## Contributors

"All by myself" 🎶

## License

MIT
