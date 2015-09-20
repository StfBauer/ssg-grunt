// Required
var fs = require('fs'),
    fspath = require('path');

// var styleGenerator = styleGenerator || {};


module.exports.generator = function() {

    var baseDocPath = '.docs';
    var curConfig,
        atoms = [],
        fileCounter = 0;


    var atomicConfig = {
        lastModfied: null
    }

    var atomicItem = {
        title: '',
        description: '',
        filename: '',
        filepath: '',
        folder: '',
        found: false
    };

    var getFsObject = function(path) {

        var objFS = null;

        try {

            objFS = fs.lstatSync(path);

        } catch (Exception) {}

        return objFS;

    }

    var exists = function(filePath) {

        if (atoms === undefined) {
            return [];
        }

        var result = atoms.filter(function(obj) {

            return obj.filepath === filePath;

        })

        return result;

    }

    var sortByProperty = function(property) {
        return function(x, y) {
            return ((x[property] === y[property]) ? 0 : ((x[property] > y[property]) ? 1 : -1));
        };
    }

    var sortItems = function() {

        if (atoms !== undefined) {

            atoms = atoms.sort(sortByProperty('filepath'));

        }

    };

    var removeFileExt = function(filename) {
        return filename.substr(0, filename.lastIndexOf('.'));
    }

    var createAtomicItem = function(fileInfo, path) {

        var filename = removeFileExt(fileInfo);

        var curFilePath = path.replace(curConfig.patterns, '');

        var curFolder = curConfig.patterns.replace(curConfig.cwd, '');

        if (exists(curFilePath).length === 0) {

            fileCounter += 1;

            var docInfo = {
                filePath: (function() {
                    return path
                        .replace(curConfig.patterns, curConfig.patterns + baseDocPath)
                        .replace('html', 'json');
                }()),
                dirPath: (function() {
                    return path
                        .replace(curConfig.patterns, curConfig.patterns + baseDocPath)
                        .replace(fileInfo, '');
                }())
            }

            var additionInfo = {
                name: filename,
                description: ''
            };

            if (fs.existsSync(docInfo.filePath)) {

                var doc = fs.readFileSync(docInfo.filePath);

                try {

                    var jsonDoc = JSON.parse(doc);
                    additionInfo.name = jsonDoc.name;
                    additionInfo.description = jsonDoc.note;

                } catch (e) {

                    console.log("An error occured for file: " + filename);

                }

            } else {

                try {

                    // create directory first
                    if (fs.existsSync(docInfo.dirPath) !== true) {
                        fs.mkdirSync(docInfo.dirPath);
                    }

                    fs.writeFileSync(docInfo.filePath, JSON.stringify(additionInfo, null, 4));

                    console.log("... New documentation file created: " + filename);

                } catch (e) {

                    console.log("Error occured" + e);

                }

            }

            var fileItem = {
                title: additionInfo.name,
                description: additionInfo.description,
                filename: fileInfo,
                filepath: curFilePath,
                folder: curFolder,
                found: true
            }

            atoms.push(fileItem);

            console.log("... Pattern added: " + additionInfo.name + "\n");

        }
    }

    var readFiles = function(path) {

        var fileInfo = fs.readdirSync(path);

        for (var i = 0; i < fileInfo.length; i++) {

            var curPath = path + '/' + fileInfo[i];

            var objFS = getFsObject(curPath);

            if (objFS !== null) {

                if (objFS.isDirectory()) {

                    readFiles(curPath);

                } else {

                    if (curPath.toLowerCase().indexOf('.htm') !== -1) {
                        createAtomicItem(fileInfo[i], curPath);
                    }

                }

            }

        }

    };

    var getConfig = function() {

        if (atomicConfig === undefined) {

            return;

        }

        if (fileCounter !== 0) {

            atomicConfig.lastModfied = new Date();
            atomicConfig.items = atoms;

            return JSON.stringify(atomicConfig, null, 4);

        }

        return null;

    }

    return {

        init: function(conf, curAtoms) {

            if (!conf) {

                throw 'No config defined';

            } else {

                curConfig = conf;

            }

            if (curAtoms !== undefined) {

                atomicConfig = curAtoms;
                atoms = curAtoms.items;

            }

            if (!fs.existsSync(curConfig.patterns)) {

                fs.mkdirSync(curConfig.patterns);
            
            }

            if (!fs.existsSync(curConfig.patterns + baseDocPath)) {

                fs.mkdirSync(curConfig.patterns + baseDocPath);
            
            }

            readFiles(curConfig.patterns);
            sortItems();
            return getConfig();
        },


    }

}();
