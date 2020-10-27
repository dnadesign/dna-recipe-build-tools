themeDir := themes/base
sake := @vendor/silverstripe/framework/sake
tape := ../tape
pipeline_project_name := defaultProject  # swap this out for the name of your project on the SilverStripe Dashboard

list: help ## Get a list of available commands

help: ## Get a list of available commands
	@echo "Available commands:"
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36mmake %-30s\033[0m %s\n", $$1, $$2}'

setup: ## Run when first setting up this project
	@test -f .env || cp .example.env .env
	@cd $(themeDir) && yarn install
	@make yarnprod && cd ../../
	@composer install && composer vendor-expose
	@make devbuild
	@echo "---\n\n\n \033[1;35m 💥   Project built! Don't forget to update your .env file. See Makefile for more commands \033[0m \n\n"

yarnwatch: ## Start gulp watch on the themes/base folder
	@cd $(themeDir) && yarn watch

yarndev: ## Start gulp watch on the themes/base folder
	@cd $(themeDir) && yarn dev

yarnserve: ## Start gulp watch on the themes/base folder
	@cd $(themeDir) && yarn serve

yarnprod: ## Install theme-default dependencies & build the theme
	@cd $(themeDir) && yarn install && yarn prod

devbuild: ## Rebuilds Silverstripe database tables/fields, refreshes the manifest, and clears the silverstripe cache
	$(sake) dev/build "flush=1"

flush: ## Flushes the Silverstripe cache
	$(sake) "flush=1"

test: ## Runs all the unit tests for this project
	@vendor/bin/phpunit

iconref: ## displays silverstripe's icon library
	@open vendor/silverstripe/admin/client/src/font/icons-reference.html


# Solr helpers
solr_start: ## For projects using the fulltextsearch-localsolr module, this will start up the solr server.
	@cd fulltextsearch-localsolr/server/ && java -jar start.jar &

solr_conf: ## Configure the solr indexes after schema changes
	$(sake) dev/tasks/Solr_Configure verbose=1

solr_reindex: ## Refresh the solr index
	$(sake) dev/tasks/Solr_Reindex

solr_kill: ## shows command to kill solr
	@echo "\n\nTo kill solr run: \033[1;35m lsof -i tcp:8983 | awk -F ' ' '{print \$$2}' | grep -v PID | xargs kill \033[0m \n\n"
