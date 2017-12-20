#!/usr/bin/env node
const fs = require('fs');
const request = require('request');
const co = require('co');
const prompt = require('co-prompt');
const commander = require('commander');
const chalk = require('chalk');
const version = require('./package.json').version;
const cheerio = require('cheerio');
const os = require('os');
const homedir = os.userInfo().homedir;
let solutionsDir = homedir + '\\cocodownloader';
let getSolved = require('./lib/getsolved');
let getSolutions = require('./lib/getsolutions');

commander.arguments('<username>').version(version).option('-v, --version', "output the version number", () => {
    console.log(version);
}).action(update).parse(process.argv);

function update(username) {
    fs.exists(solutionsDir, (exists) => {
        if (!exists) {
            fs.mkdirSync(solutionsDir);
        }
        let userDir = solutionsDir + '\\' + username;
        if (!fs.existsSync(userDir)) {
            fs.mkdirSync(userDir);
        }
        getSolved(username, (err, problems) => {
            let p = [];
            problems.forEach((problem) => {
                p.push(getSolutions(problem));
            });
            Promise.all(p).then((solutions) => {
                solutions = solutions.filter((x) => x.link != '');
            }, (err) => {
                console.log(err);
            });
        });
    });
}