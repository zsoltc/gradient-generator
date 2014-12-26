call browserify src/gradient-generator.js --standalone GradientGenerator > bin/gradient-generator.dev.js
call uglifyjs bin/gradient-generator.dev.js -o bin/gradient-generator.js -c -m
