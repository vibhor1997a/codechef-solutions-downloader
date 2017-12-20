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
        this.date = date;
        this.score = score;
        this.time = time;
        this.mem = mem;
        this.lang = lang;
        this.link = link;
        this.problem = problem;
    }
}

module.exports = Solution;