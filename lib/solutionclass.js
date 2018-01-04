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

    /**
     * Returns the filename with extension and solution details
     * @returns {string} filename with extension 
     */
    getFileName() {
        let fileBaseName = 'source';// + new Date().getTime();
        let score = (this.score) ? '_' + this.score + 'pts' : '';
        fileBaseName += score;
        let fileExt = '.txt';
        if (this.lang.indexOf('C++') > -1) {
            fileExt = '.cpp';
        }
        else if (this.lang.indexOf('C') > -1) {
            fileExt = '.c';
        }
        else if (this.lang.indexOf('JAVA') > -1) {
            fileExt = '.java';
        }
        else if (this.lang.indexOf('PYTH') > -1) {
            fileExt = '.py';
        }
        else if (this.lang.indexOf('NODE') > -1) {
            fileExt = '.js';
        }
        fileBaseName += ('_' + this.time + 's' + '_' + this.mem);
        fileBaseName += ('_' + myDateFormat(this.date));
        return fileBaseName + fileExt;
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
    let [hh, mm] = time.split(':').map(Number);
    let ss = 0;
    let ms = 0;
    if (ampm == 'PM')
        hh += 12;
    let [dd, m, yy] = date.split('/').map(Number);
    yy += 2000;
    m--;
    return new Date(yy, m, dd, hh, mm, ss, ms);
}
/**
 * Returns the date-time in the format like 4-1-2018_12-52-PM to be used in fileName
 * @param {Date} date The date to be converted
 * @returns {string}
 */
function myDateFormat(dt) {
    let dd = dt.getDate() + '-' + (dt.getMonth() + 1) + '-' + dt.getFullYear();
    let time = dt.getHours() + ':' + dt.getMinutes();
    time = tConvert(time);
    return dd + '_' + time;
}
/**
 * Coverts 24 hr format to 12 hr format
 * @param {string} time time string to be converted to 12 hr format
 * @returns {string}
 */
function tConvert(time) {
    // Check correct time format and split into components
    time = time.toString().match(/^([01]\d|2[0-3])(:)([0-5]\d)(:[0-5]\d)?$/) || [time];

    if (time.length > 1) { // If time format correct
        time = time.slice(1);  // Remove full string match value
        time[5] = +time[0] < 12 ? 'AM' : 'PM'; // Set AM/PM
        time[0] = +time[0] % 12 || 12; // Adjust hours
        time = time.join('');
        time = time.replace(':', '-');
        time = time.replace(/(\d)([A-Z])/g, '$1-$2');
        time = time.split('')
    }
    return time.join(''); // return adjusted time or original string
}
module.exports = Solution;