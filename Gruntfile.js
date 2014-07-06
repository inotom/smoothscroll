/* jshint strict: true */
/* global module */

module.exports = function(grunt) {
  'use strict';

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    connect: {
      server: {
        options: {
          port: 9000,
          hostname: 'localhost',
          base: 'build/'
        }
      }
    },
    watch: {
      jade: {
        files: 'src/jade/**/*.jade',
        tasks: ['jade:dev']
      },
      scripts: {
        files: 'src/js/*.js',
        tasks: ['concat']
      },
      options: {
        livereload: true
      }
    },
    copy: {
      main: {
        files: [{
          expand: true,
          cwd: 'src/',
          src: ['css/**'],
          dest: 'build/lib/'
        }]
      }
    },
    jade: {
      dev: {
        options: {
          pretty: true,
          data: {
            devMode: true
          }
        },
        files: {
          'build/index.html': ['src/jade/index.jade'],
          'build/easing.html': ['src/jade/easing.jade']
        }
      },
      prod: {
        options: {
          pretty: true,
          data: {
            devMode: false
          }
        },
        files: {
          'build/index.html': ['src/jade/index.jade'],
          'build/easing.html': ['src/jade/easing.jade']
        }
      }
    },
    concat: {
      common: {
        files: {
          'build/lib/js/smoothscroll.js': [
            'src/js/smoothscroll.js'
          ]
        }
      }
    },
    uglify: {
      common: {
        files: {
          'build/lib/js/smoothscroll.min.js': 'build/lib/js/smoothscroll.js'
        },
        options: {
          banner: "/* <%= pkg.name %>.js (ver <%= pkg.version %>) - Copyright (c) <%= grunt.template.today('yyyy') %> <%= pkg.author %> (<%= pkg.siteurl %>) <%= pkg.license %> */\n"
        }
      }
    },
    clean: {
      build: ['build']
    }
  });

  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-jade');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-compass');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.registerTask('default', ['clean', 'copy', 'jade:dev', 'concat', 'connect', 'watch']);
  grunt.registerTask('build', ['clean', 'copy', 'jade:prod', 'concat', 'uglify']);

};
