const request = require('request');
const cheerio = require('cheerio');
const Problem = require('./problemclass');
const Solution = require('./solutionclass');
const hostname = 'https://www.codechef.com';

/**
* Get all the solutions
* @typedef {function(object,string[])} callback
* @param {Problem} problem Problem Object 
* @param {callback} callback Callback function with parameters (err,solution)
* @returns {Promise}
*/
function getSolutions(problem) {
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
                let solutions=[];
                rows.each(function(){
                    let isAccepted = $(this).children(':nth-child(4)').find('img').attr('src').indexOf('tick')>-1;
                    if(isAccepted){
                        let id = $(this).children(':nth-child(1)').text().trim();
                        let date = $(this).children(':nth-child(2)').text().trim();
                        let score = $(this).children(':nth-child(4)').text().trim();    
                        if(score){
                            let reg = /\[(\d{1,3})pts\]/;
                            score = Number(score.replace(reg,''));
                        }
                        let time = $(this).children(':nth-child(5)').text().trim();
                        let mem = $(this).children(':nth-child(6)').text().trim();
                        let lang = $(this).children(':nth-child(7)').text().trim();
                        let link = $(this).children(':nth-child(8)').find('a').attr('href');
                        link=(!link)?"":hostname+link;
                        let solution = new Solution(id,date,score,time,mem,lang,link,problem);
                        solutions.push(solution);
                    }
                    resolve(solutions);
                });
            }
        });
    });
}

module.exports = getSolutions