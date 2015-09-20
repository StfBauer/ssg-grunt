'use strict';

module.exports = function(grunt) {

    var styleUpdater = function() {

        var styleGuide = require('./lib/generator');

        var ssgConfig = grunt.config.get('simpleStyleGuide');

        var cwd = grunt.config.get('config.app');
        ssgConfig.cwd = cwd;

        var curAtomConfig;
        try {

            curAtomConfig = grunt.file.readJSON(ssgConfig.patternConfig);

        } catch (e){};

        var configUpdate = styleGuide.generator.init(ssgConfig, curAtomConfig);

        if(configUpdate !== null){
            grunt.file.write(ssgConfig.patternConfig, configUpdate)
            grunt.log.ok("Pattern config updated");
        } else {
            grunt.log.ok("No changes in pattern config");
        }
        

    }

    grunt.registerTask('simpleStyleGuide', 'Styleguide updater ', styleUpdater);

};
