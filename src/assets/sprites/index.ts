import fs from 'fs';
import path from 'path';

const testFolder = './';

const allowedExts = [
  '.png' // add any extensions you need
]

const modules = {};

const files = fs.readdirSync(testFolder);

if (files && files.length) {
  files
    .filter(file => allowedExts.indexOf(path.extname(file)) > -1)
    .forEach(file => exports[path.basename(file, path.extname(file))] = require(`./${file}`));
}

module.exports = modules;