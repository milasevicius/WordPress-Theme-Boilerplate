module.exports = function(grunt) {
  require('load-grunt-tasks')(grunt);

  grunt.initConfig({
    themeName: 'theme',

    php: {
      dev: {
        options: {
          port: 3000,
        }
      }
    },

    sass: {
        assets: {
          files: [
            {
              src: 'wp-content/themes/<%= themeName %>/assets/scss/app.scss',
              dest: 'wp-content/themes/<%= themeName %>/public/css/app.css'
            }
          ]
        }
      },

      babel: {
          options: {
              sourceMap: true,
              presets: ['es2015-script']
          },
          dist: {
              files: {
                  'wp-content/themes/<%= themeName %>/public/js/app.js': 'wp-content/themes/<%= themeName %>/assets/babel/app.js'
              }
          }
      },

      sync: {
        dev: {
          files: [
            {
              cwd: 'wp-content/themes/<%= themeName %>/assets/images/', 
              src: ['**'], 
              dest: 'wp-content/themes/<%= themeName %>/public/images/'
            },
            {
              cwd: 'wp-content/themes/<%= themeName %>/assets/fonts/', 
              src: ['**'], 
              dest: 'wp-content/themes/<%= themeName %>/public/fonts/'
            }
          ],
          failOnError: true,
          updateAndDelete: true
        }
      },

      watch: {
        sass: {
          files: 'wp-content/themes/<%= themeName %>/assets/scss/**/*.scss',
          tasks: 'sass'
        },

        babel: {
          files: 'wp-content/themes/<%= themeName %>/assets/babel/**/*.js',
          tasks: 'babel'
        },

        sync: {
          files: [
            'wp-content/themes/<%= themeName %>/assets/images/**',
            'wp-content/themes/<%= themeName %>/assets/fonts/**'
            ],
            tasks: 'sync'
        }
      },

      browserSync: {
        dev: {
          bsFiles: {
            src: [
              'wp-content/themes/<%= themeName %>/public/css/*.css',
              'wp-content/themes/<%= themeName %>/public/js/*.js',
              'wp-content/themes/<%= themeName %>/public/images/**/*',
              'wp-content/themes/<%= themeName %>/public/fonts/**/*',
              'wp-content/themes/<%= themeName %>/**/*.php'
            ]
          },
          options: {
            proxy: 'localhost:3000',
            // port: 3000,
            watchTask: true,
            open: true
          }
        }
      }
  });

  grunt.registerTask('default', ['php', 'browserSync', 'watch']);
  grunt.registerTask('build', ['sass', 'babel', 'sync']);
}