# Contributing

This project welcomes contributions and suggestions.

For questions, discovered bugs, enhancements, or help: leave an [issue](/issues) with the appropriate tag.

## Code of Conduct

For now we will be deferring to the [Next.js Code of Conduct](https://github.com/vercel/next.js/blob/canary/CODE_OF_CONDUCT.md).

Please do not email vercel for enforcement. You can email this project's owner's at [devan@genui.com](mailto:devan@genui.com) or [shane@genui.com](mailto:shane@genui.com)

## Getting Started

To get started with contributing to this project, fork the repository, clone the project into your environment, make your desired changes and submit a pull request to the development branch.

See the [development getting started guide](./DEVELOPMENT.md#getting-started) to get the project running in your local environment. 

## Making a Pull Request

Naming conventions for pull request branches are as follows.

```bash
feature/<branch-name> # New features


refactor/<branch-name> # Changes to currently existing features


fix/<branch-name> # Bug fixes and hot patches
```


## Commit message format

Use the [Conventional Commit](https://www.conventionalcommits.org/en/v1.0.0/) format when writing commit messages. 

```
<type>[optional scope][optional `!` for breaking changes]: <description>

[optional body]

[optional footer(s)]
```

### Examples

A good feature commit message

```
feat: allow provided config object to extend other configs
```

A good commit message with scope and `!` to draw attention to breaking changes

```
fix(api)!: add api key support to prevent security vulnerability 

BREAKING CHANGE: introduce a request id and a reference to latest request
```
