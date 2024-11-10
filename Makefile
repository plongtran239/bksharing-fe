default: up

bootstrap: install 
	cp .env.example .env
	make up

up:
	yarn dev

build:
	yarn build

check:
	yarn lint
	yarn prettier:check

format:
	yarn prettier:write

install:
	yarn install

reinstall:
	rm -rf node_modules
	rm -rf yarn.lock
	yarn install

add-ui:
	npx shadcn@latest add $(name)