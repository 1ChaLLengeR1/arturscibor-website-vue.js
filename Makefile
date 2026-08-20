.PHONY: install dev build serve preview clean

install:
	npm install

dev:
	npm run dev

build:
	npm run build

serve:
	npm run serve

preview:
	npm run preview

clean:
	rm -rf node_modules dist
