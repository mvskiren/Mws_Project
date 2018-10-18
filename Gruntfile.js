/*
 Used gruntfile to make smaller size images and mostly learned using grunt
*/
/*
resource used from grunt docs
*/
module.exports = function(grunt) {

  grunt.initConfig({
    responsive_images: {
      dev: {
        options: {
          engine: 'im',
          sizes: [{
            /* Change these */
            width: 400,
            suffix: '_small',
            quality: 50
          }]
        },

        files: [{
          expand: true,
          src: ['*.{gif,jpg,png}'],
          cwd: 'img/',
          dest: 'scaled_img/'
        }]
      }
    },

    clean: {
      dev: {
        src: ['scaled_img/'],
      },
    },

    mkdir: {
      dev: {
        options: {
          create: ['scaled_img/']
        },
      },
    },

  });

  grunt.loadNpmTasks('grunt-responsive-images');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-mkdir');
  grunt.registerTask('default', ['clean', 'mkdir', 'responsive_images']);

};
