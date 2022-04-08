const request = require('request'),
    fs = require('fs');

const dirs = fs.readFileSync('./data/common_dir.txt').toString().split(/\r?\n/),
    inputUrl = process.argv[2];

(async () => {
    let results = [],
        urlResults = [],
        urlBugs = [];
    for(let d of dirs) {
        let url = `${inputUrl}/${d}`;
        console.log(`Probando: ${url}`);
    
        results.push(new Promise(resolve => {
            request(url, {}, async (err, res, body) => {
    
                if(body === undefined) {
                    urlBugs.push(url);
                } else if(!body.includes('Error 404')) {
                    console.log(`Encontrado: ${url}`);
                    urlResults.push(url);
                }
                resolve();
            });
        }));
    }
    console.log(await results[results.length - 1]);
    console.log(urlResults);
    console.log(urlBugs);
})();