const request = require('request');
const cheerio = require('cheerio');
const Problem = require('./problemclass');
const Solution = require('./solutionclass');
const link = 'https://www.codechef.com/viewplaintext/';

/**
 * Get the source code of a solution object
 * @typedef {function(object,string)} myCallback
 * @param {Solution} solution 
 * @param {myCallback} callback 
 */
function getCode(solution,callback){
    request.get(link+solution.id,(err,res,body)=>{
        if(err){
            callback(err);
        }
        else{
            if(res.statusCode!=200){
                callback("code not found!");
            }
            else{
                let $ = cheerio.load(body);
                let code = $('pre').text();
                callback(null,code);    
            }
        }        
    });
}

module.exports=getCode;