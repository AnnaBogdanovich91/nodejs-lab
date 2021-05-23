var fs = require ('fs');
var path = require('path');

var filename = 'bad.file';
var path_to_file = path.join (__dirname, 'public', filename);

var fileStream = fs.createReadStream(path_to_file);
fileStream.on('readable', function (){
	var buf = fileStream.read();
	console.log (buf);
} )
fileStream.on('open', function (){
	console.log ('file is opened');
})
fileStream.on('close', function (){
	console.log ('file is closed');
})
fileStream.on('error', function (err){
	console.log (err);
})
