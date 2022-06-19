# lambda-cypress
Sketch of smoke tests for the WikiLambda front-end

## Pre-requisites

You need npm in a recent version, and WikiLambda running.

Your WikiLambda installation should be available on http://localhost:8080/wiki/

If it is in a different place, change the first line of cypress/e2e/spec.cy.js

Do *not* run this against a public installation such as NotWikiLambda, beta.wikifunctions or Wikifunctions itself.

## Installation

git clone https://github.com/vrandezo/lambda-cypress/

npm init

npx cypress open

(or to run it on the command line:)

npx cypress run


## Warnings

Some tests are sometimes flaky. Better to rerun the tests before starting to debug.
