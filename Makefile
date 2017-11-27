ENV ?= ./node_modules/
SEQUELIZE ?= ./node_modules/.bin/sequelize
M_NAME ?= 

TEST ?= .

# All rules are idempotent.
update:
	npm i
	${SEQUELIZE} db:migrate

run:
	npm start

runserver:
	npm run server

makemigration:
	${SEQUELIZE} migration:create --name ${M_NAME}

migrate:
	${SEQUELIZE} db:migrate
