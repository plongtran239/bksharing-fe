default:
	clear
	make up

bootstrap: 
	make install
	make up

up:
	yarn dev

install:
	yarn install

reinstall:
	rm -rf node_modules
	rm -rf yarn.lock
	yarn install

add-ui:
	npx shadcn@latest add $(name)