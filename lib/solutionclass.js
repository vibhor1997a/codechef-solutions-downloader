const Problem = require('./problemclass');
/**
 * Solution Class
 * @class Solution
 */
class Solution {
    /**
     * 
     * @param {number} id solution id
     * @param {string} date date at which solution was posted
     * @param {number} score score in percentage
     * @param {string} time cpu time of solution
     * @param {string} mem memory of the solution
     * @param {string} lang language in which it was submitted
     * @param {string} link link of the code
     * @param {Problem} problem Problem of the solution
     */
    constructor(id, date, score, time, mem, lang, link, problem) {
        this.id = id;
        this.date = convertDate(date);
        this.score = score;
        this.time = time;
        this.mem = mem;
        this.lang = lang;
        this.link = link;
        this.problem = problem;
    }
}

/**
 * 
 * @param {string} str 
 */
function convertDate(str) {
    let temp = str.split(' ');
    let time = temp[0];
    let ampm = temp[1];
    let date = temp[2];
    let [hh,mm]=time.split(':').map(Number);
    let ss=0;
    let ms=0;
    if(ampm=='PM')
        hh+=12;
    let [dd,m,yy]=date.split('/').map(Number);
    yy+=2000;
    m--;
    return new Date(yy,m,dd,hh,mm,ss,ms);
}
module.exports = Solution;