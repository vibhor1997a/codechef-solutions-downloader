const request = require('request');
const cheerio = require('cheerio');
const Problem = require('./problemclass');

/**
* Get all the solutions
* @typedef {function(object,string[])} callback
* @param {Problem} problem Problem Object 
* @param {callback} callback Callback function with parameters (err,solution)
* @returns {Promise}
*/
function getSolutions(problem, callback) {
    return new Promise((resolve, reject) => {
        request.get(problem.link, (err, res, body) => {
            if (err) {
                console.log(err);
                reject(err);
                process.exit(1);
            }
            else {
                let $ = cheerio.load(body);
                let tableBody = $('.dataTable > tbody:nth-child(2)');
                let rows = tableBody.find('tr');
                rows.each()
            }
        });
    });
}

module.exports = getSolutions