const fs = require('fs');
const https = require('https');

let url = "https://nextstrain.org/charon/getDataset?prefix=ncov%2Fgisaid%2Fglobal%2F6m";

https.get(url,(res) => {
    let body = "";

    res.on("data", (chunk) => {
        body += chunk;
    });

    res.on("end", () => {
        try {
            let json = JSON.parse(body);
            // do something with JSON
            let childrenData = JSON.stringify(json.tree.children)
            saveFile(childrenData);
        } catch (error) {
            console.error(error.message);
        };
    });

}).on("error", (error) => {
    console.error(error.message);
});


function saveFile (content) {
	fs.writeFile('data.json', content, err => {
	  if (err) {
	    console.error(err);
	  }
	  console.log("file written successfully")
	});	
}
