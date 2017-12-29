#!/usr/bin/env node
String.prototype.replaceAll = function (search, replacement) {
    var target = this;
    return target.replace(new RegExp(search, 'g'), replacement);
};
const fs = require('fs');
const request = require('request');
const commander = require('commander');
const chalk = require('chalk');
const version = require('./package.json').version;
const cheerio = require('cheerio');
const os = require('os');
const homedir = os.userInfo().homedir;
const path = require('path');
let appDir = path.join(homedir, 'cocodo');
let getSolved = require('./lib/getsolved');
let getSolutions = require('./lib/getsolutions');
const Solution = require('./lib/solutionclass');
const Problem = require('./lib/problemclass');
let getCode = require('./lib/getCode');

commander.arguments('<username>').version(version).option('-v, --version', "output the version number", () => {
    console.log(version);
}).action(update).parse(process.argv);

/**
 * Callback function to be passed in commander action
 * @param {string} username username
 * @returns null
 */
function update(username) {
    fs.exists(appDir, (exists) => {
        if (!exists) {
            fs.mkdirSync(appDir);
        }
        let userDir = path.join(appDir, username);
        if (!fs.existsSync(userDir)) {
            fs.mkdirSync(userDir);
        }
        console.log('Fetching User Details...');
        getSolved(username, (err, problems) => {
            if (!err) {
                problems.forEach((problem, indexp) => {
                    let p = getSolutions(problem);
                    Promise.resolve(p).then((solutions) => {
                        let contestDir = path.join(userDir, problem.contest);
                        if (!fs.existsSync(contestDir)) {
                            fs.mkdirSync(contestDir);
                        }
                        let problemDir = path.join(userDir, problem.contest, problem.name);
                        if (!fs.existsSync(problemDir)) {
                            fs.mkdirSync(problemDir);
                        }
                        solutions.forEach((solution, indexs) => {
                            if (solution.link) {
                                let solutionFile = path.join(problemDir, solution.getFileName());
                                getCode(solution, (err, code) => {
                                    if (err) {
                                        console.log(err);
                                    }
                                    else {
                                        fs.writeFile(solutionFile, code, (err) => {
                                            if (!err) {
                                                console.log(`${solutionFile} written`);
                                            }
                                            else {
                                                console.log(err);
                                                process.exit(1)
                                            }
                                        });
                                    }
                                });
                            }
                        });
                    }, (err) => {
                        console.log(err);
                    });
                });
            }
            else {
                console.log(err);
                fs.rmdirSync(userDir);
                process.exit(2);
            }
        });
    });
}
