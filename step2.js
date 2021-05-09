
const axios = require('axios');
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


// This function is an asynchronous function that takes a url and 
// returns the content of the url if no errors.
async function webCat(url){
    try{
        response = await axios.get(url);
        console.log(response.data);
    }
    catch(err){

        console.log(`Error fetching ${url}: ${err}`);
        process.exit(1);
    };
}

let path = process.argv[2]
if(path.slice(0,4) === 'http'){
    webCat(path);
}
else{
    cat(path);
}