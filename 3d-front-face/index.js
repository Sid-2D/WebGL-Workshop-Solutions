var setup         = require('./setup')
var drawIt

exports.init = function(gl) {
  drawIt = setup(gl)
  gl.enable(gl.DEPTH_TEST)
}

exports.draw = function(gl, t) {
  gl.viewport(0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight)
  gl.frontFace(gl.CW)
  gl.clear(gl.DEPTH_BUFFER_BIT)
  drawIt(t)
}
