const axios = require('axios');
const fs = require('fs');
const process = require('process');

// This function handles the output depending of if another argument, out 
// is provided.

function handleOutput(str, out){

    if (out){
        fs.writeFile(out, str, "utf8", function(err) {
            if (err) {
              console.error(`Couldn't write ${out}: ${err}`);
              process.exit(1);
            }
            console.log('Successfully wrote to file!');
          });
    }
    else{
        console.log(str);
    }
}

// This function reads the contents of a file saved locally given
// the appropraite file path and writes to a file if give the appropraite
// file path and second argument out
function cat(path, out){

    fs.readFile(path, 'utf8', function(err, data){

        if (err){
            console.log(`Error reading ${path}: ${err}`);
            process.exit(1);
        }

       handleOutput(data, out);
    })
}


// This function is an asynchronous function that takes a url and 
// returns the content of the url if no errors and writes to a file if given the appropraite 
// file path and the second argument out
async function webCat(url, out){
    try{
        response = await axios.get(url);
        handleOutput(response.data, out);
    }
    catch(err){

        console.log(`Error fetching ${url}: ${err}`);
        process.exit(1);
    };
}

let out;
let path;

if(process.argv[2] === '--out'){
    out = process.argv[3];
    path = process.argv[4];
}
else{
    path = process.argv[2];
}

if(path.slice(0,4) === 'http'){
    webCat(path, out);
}
else{
    cat(path, out);
}