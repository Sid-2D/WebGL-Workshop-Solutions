//No support code to help you here, you are on your own!

function getVertexShader(gl) {
	var script = 'attribute vec2 vertexPositions;' +
				 'void main() {' + 
				 '	gl_Position = vec4(vertexPositions, 0.0, 1.0);' + 
				 '}';
	var shader = gl.createShader(gl.VERTEX_SHADER);
	gl.shaderSource(shader, script);
	gl.compileShader(shader);
	if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
		console.log(gl.getShaderInfoLog(shader));
		return null;
	}
	return shader;
}

function getFragmentShader(gl) {
	var script = 'precision mediump float;' +
				 'void main() {' + 
				 '	gl_FragColor = vec4(0.0, 0.0, 1.0, 1.0);' + 
				 '}';
	var shader = gl.createShader(gl.FRAGMENT_SHADER);
	gl.shaderSource(shader, script);
	gl.compileShader(shader);
	if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
		console.log(gl.getShaderInfoLog(shader));
		return null;
	}
	return shader;
}

exports.init = function(gl) {
	var width  = gl.drawingBufferWidth;
    var height = gl.drawingBufferHeight;
    gl.viewport(0, 0, width, height);
	var shaderProgram = gl.createProgram();
	shaderProgram.fragmentShader = getFragmentShader(gl);
	shaderProgram.vertexShader = getVertexShader(gl);
	gl.attachShader(shaderProgram, shaderProgram.fragmentShader);
	gl.attachShader(shaderProgram, shaderProgram.vertexShader);
	gl.linkProgram(shaderProgram);
	gl.useProgram(shaderProgram);
	var positionBuffer = gl.createBuffer();
	gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
	var vertices = [0.0, 1.0, -1.0, 0.0, 1.0, 0.0];
	gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
	gl.enableVertexAttribArray(0);
	gl.vertexAttribPointer(0, 2, gl.FLOAT, false, 0, 0);
}

exports.draw = function(gl) {
	gl.clearColor(1, 1, 0, 1);
	gl.clear(gl.COLOR_BUFFER_BIT);
	gl.drawArrays(gl.TRIANGLES, 0, 3);
}