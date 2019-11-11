install:
	npm install
start:
	npx babel-node src/bin/gendiff.js
build:
	rm -rf dist
	npm run build
publish:
	npm publish
lint:
	npx eslint .
test:
	npx jest
watch:
	npm run test -- --watch
