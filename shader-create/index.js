//This is a helper function to make it easier to get started.
//You should call this function once your shader is set up
var drawTriangle = require('./draw-triangle')
var fs = require('fs')

//Load the fragment/vertex shader sources
var FRAG_SRC = fs.readFileSync(__dirname + '/shader.frag', 'utf8')
var VERT_SRC = fs.readFileSync(__dirname + '/shader.vert', 'utf8')

//TODO: Create this shader in init
var fragShader, vertexShader;

// Run once at the beginning: use this to create
// and setup things to be used in your draw function.
exports.init = function(gl) {

  //TODO: Initialize the shader here
  fragShader = gl.createShader(gl.FRAGMENT_SHADER);
  vertexShader = gl.createShader(gl.VERTEX_SHADER);
  gl.shaderSource(fragShader, FRAG_SRC);
  gl.shaderSource(vertexShader, VERT_SRC);
  gl.compileShader(fragShader);
  if (!gl.getShaderParameter(fragShader, gl.COMPILE_STATUS)) {
	console.log(gl.getShaderInfoLog(fragShader));
	return null;
  }
  gl.compileShader(vertexShader);
  if (!gl.getShaderParameter(vertexShader, gl.COMPILE_STATUS)) {
	console.log(gl.getShaderInfoLog(vertexShader));
	return null;
  }
}

// Run every frame: use this to draw things to the screen.
exports.draw = function(gl) {
  gl.viewport(0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight)
  //Clear drawing buffer
  gl.clearColor(0,0,0,1)
  gl.clear(gl.COLOR_BUFFER_BIT)

  //TODO: Bind the shader here
  var shaderProgram = gl.createProgram();
  gl.attachShader(shaderProgram, vertexShader);
  gl.attachShader(shaderProgram, fragShader);
  gl.linkProgram(shaderProgram);
  gl.useProgram(shaderProgram);

  //Now draw the triangle
  drawTriangle(gl)
}
