# Contributing

We welcome all kinds of contributions! Feel free to create an issue when in
doubt and take part in RFCs discussions.

## Developing

First run `yarn` and `yarn build` to install all deps and build a project. If
you run into any problems while installing dependencies consider using the node
version specified in `.nvmrc` file. Personally, I use `fnm` with shell
integration to automatically pick up `.nvmrc` file and install the correct
version but simple `nvm` also will do.

### Project structure

We use monorepo with yarn workspaces. The main package is placed under
`packages/earljs`, and this is where probably you will spend the most time.

### Running tests

```sh
yarn format
yarn lint
yarn typecheck
yarn test
```

### Introducing changes

We use prettier, and static analysis extensively but don't you worry! We have a
magic script to run all checks locally and automatically fix all the
auto-fixable problems:

```
yarn test:fix
```

### Watch mode

While inside `packages/earljs` you might run `yarn build:watch` to build project
in watch mode.

`yarn build:watch:test` will watch tests too. _WARNING_: this will create broken
build (containing tests) in `dist` so you need to run `yarn build` when done
with watching.
