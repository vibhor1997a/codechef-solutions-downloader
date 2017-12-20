const request = require('request');
const cheerio = require('cheerio');
let Problem = require('./problemclass');
const hostname = 'https://www.codechef.com';

/**
 * @typedef {function(object,Problem[])} myCallback
 */

/**
 * Get all the fully or partially solved problems of a user
 * @param {string} user 
 * @param {myCallback} callback 
 */
function getSolved(user, callback) {
    request.get('https://www.codechef.com/users/' + user, (err, res, body) => {
        if (err) {
            console.log(err);
            process.exit(1);
            callback(err);
        }
        else {
            let $ = cheerio.load(body);
            let contests = $("section.rating-data-section:nth-child(7) > div:nth-child(2)").find('p');
            let problems = [];
            contests.each(function () {
                let contest = $(this).children('strong').html().trim();
                contest = contest.replace(':', '');
                let linkNodes = $(this).find('a');
                linkNodes.each(function () {
                    let link = hostname + $(this).attr('href');
                    let name = $(this).html().trim();
                    problems.push(new Problem(name, link, contest));
                });
            });
            callback(null, problems);
        }
    });
}
module.exports = getSolved