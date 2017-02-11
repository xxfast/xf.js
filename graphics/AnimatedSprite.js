/*
  * @override
  * sets the animated resource locations of the desired sprite layers, as a spritesheet
  * @param {string} url - locaiton of the spritesheet.
  * @param {int} clipWidth - width of a frame.
  * @param {int} clipHeight - height of a frame.
  * @param {int} nRows - number of rows in the spritesheet.
  * @param {int} nCols - number of cols in the spritesheet.
  * @param {int} nFrames - number of frames in the spritesheet.
*/
resources(url, clipWidth, clipHeight, nRows, nCols, nFrames){
  this.url = url;
  this.image = new Image();
  this.image.src = this.url;
  this.image.onload = function(){
    alert(this.image);
  }
  return this;
}
