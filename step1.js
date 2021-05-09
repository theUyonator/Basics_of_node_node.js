const fs = require('fs');
const process = require('process');

// This function reads the contents of a file saved locally given
// the appropraite file path.
function cat(path){

    fs.readFile(path, 'utf8', function(err, data){

        if (err){
            console.log(`Error reading ${path}: ${err}`);
            process.exit(1);
        }

        console.log(data)
    })
}

cat(process.argv[2]);

// // export an object
// module.exports = {
//     fs: fs,
//     process: process,
//     cat: cat
//   };