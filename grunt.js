module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    jsdoc : {
        dist : {
            src: ['game.js'], 
            dest: 'doc'
        }
    },
    watch: {
      files: 'game.js',
      tasks: ['lint']
    },
    concat: {
      dist: {
        src: ['game.js', 'globals.js', 'field.css.js', 'tripeaks.js'],
        dest: 'tripeaks.cat.js'
      }
    },
    lint: {
      files: ['game.js']
    },
    
    jshint: {
      options: {
        curly: true,
        eqeqeq: true,
        immed: true,
        latedef: true,
        newcap: true,
        noarg: true,
        sub: true,
        undef: true,
        boss: true,
        eqnull: true,
        browser: true
      },
      globals: {
        jQuery: true,
        $: true,
        console: true,
        window: true
      }
    },
    uglify: {}
  });
  grunt.loadNpmTasks('grunt-jsdoc-plugin');
  // Default task.
  grunt.registerTask('default', 'lint jsdoc');
  
};

