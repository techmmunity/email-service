# Setup Project Details

## Enviroment config

- [Install yarn](https://classic.yarnpkg.com/en/docs/install/#debian-stable)
- [Install docker](https://docs.docker.com/engine/install/)
- [Install docker-compose](https://docs.docker.com/compose/install/)
- [Do post-instalation docker steps](https://docs.docker.com/engine/install/linux-postinstall/)
- [Install VSCode](https://code.visualstudio.com/Download)
- Install **ALL** the extensions recommended in `.vscode/extensions.json`
- **If the changes are not applied automatically** add the content of `.vscode/settings.json` in your personal settings.json

## Initial config

- [ ] Change the project name on `package.json`
- [ ] Change the name of the project on `docker-compose.yml` (5 places)
- [ ] Change the name of the project in the "docker:clear" script on `package.json`
- [ ] Configure the `src/swagger.ts` file
- [ ] Add project to [CodeFactor](https://www.codefactor.io/)
- [ ] Add project to [DeepScan](https://deepscan.io/dashboard/#view=team&tid=13883)
- [ ] Add project to [Coveralls](https://coveralls.io/welcome)
- [ ] Update the badges on README.md

## After the first test file be added to the project

- [ ] Remove "Test TypeScript Syntax" step from `.github/workflows/tests.yml`
- [ ] Remove script "temp:test-tsc" from `package.json`
- [ ] Uncomment steps "Run Tests" and "Colect Coverage" from `.github/workflows/tests.yml`
- [ ] Uncomment "coverageThreshold" from `jest.config.js`

## After all other steps are completed

- [ ] Delete this file
