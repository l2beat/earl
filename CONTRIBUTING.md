# Contributing

We welcome all kinds of contributions! Feel free to create issues when in doubt
and take part in RFCs discussions.

## Developing

Setup is fairly easy at this point. The only twist is that we require pretty new
nodejs version to run tests as we test some of the modern features like
`bignumbers`. We recommend using `14.2.0`. Note that production build doesnt
require such modern environment.

Personally, I use `nvm` with shell integration to automatically pick up `.nvmrc`
file and install correct version - it's great!

### Running tests

```
yarn test
```

### Introducing changes

We use prettier, and static analysis extensively but don't you worry! We have a
magic script to run all checks locally and automatically fix all the
auto-fixable problems:

```
yarn test:fix
```
