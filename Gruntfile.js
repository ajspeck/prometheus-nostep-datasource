module.exports = function(grunt) {

  require('load-grunt-tasks')(grunt);

  grunt.loadNpmTasks('grunt-execute');
  grunt.loadNpmTasks('grunt-typescript');
  grunt.loadNpmTasks('grunt-contrib-clean');

  grunt.initConfig({

    clean: ["dist"],

    copy: {
      src_to_dist: {
        cwd: 'src',
        expand: true,
        src: ['**/*', '!**/*.js', '!**/*.scss'],
        dest: 'dist'
      },
      pluginDef: {
        expand: true,
        src: ['README.md'],
        dest: 'dist'
      }
    },

    watch: {
      rebuild_all: {
        files: ['src/**/*'],
        tasks: ['default'],
        options: {spawn: false}
      }
    },
    
    typescript: {
      build: {
          src: [
              "dist/**/*.ts"
          ],
          dest: "dist/",
          options: {
              module: "system",
              target: "es5",
              rootDir: "dist/",
              keepDirectoryHierarchy: false,
              declaration: true,
              emitDecoratorMetadata: true,
              experimentalDecorators: true,
              sourceMap: true,
              noImplicitAny: false
          }
      }
  },
  babel: {
      options: {
          sourceMap: true,
          presets: ["es2015"]
      },
      distTestsSpecsNoSystemJs: {
          files: [{
              expand: true,
              cwd: "src/spec",
              src: ["**/*.js"],
              dest: "dist/test/spec",
              ext: ".js"
          }]
      }
  },

    mochaTest: {
      test: {
        options: {
          reporter: 'spec'
        },
        src: ['dist/test/spec/test-main.js', 'dist/test/spec/*_spec.js']
      }
    }
  });

  grunt.registerTask('default', ['clean', 'copy:src_to_dist', 'copy:pluginDef', 'typescript:build', 'babel', 'mochaTest']);
};
