/**
 * Problem Class
 * @class Problem
 */
class Problem {
    /**
     * @param {string} name Name of the Problem
     * @param {string} link Link of the Problem
     * @param {string} contest code of the Contest
     */
    constructor(name, link, contest) {
        this.name = name;
        this.link = link;
        this.contest = contest;
    }
}
module.exports = Problem;