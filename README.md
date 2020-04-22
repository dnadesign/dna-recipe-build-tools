# DNA Project Boilerplate

## Introduction

This is a collection of tools, configurations and recommendations for setting up a project. It provides build tooling setup for SilverStripe based websites, which includes Vue (or optionally React) and recommended extensions for a productive development experience within the IDE most developers use at DNA – [Visual Studio Code](https://code.visualstudio.com) (VS Code).

Although this provides a lot out of the box, feel free to customise it to fit the project.

## Setup

1. Make sure you have _nvm_ and _yarn_ installed
2. Install required development extensions (see the _Development Extensions_ section)
3. By default this is configured for Vue, if you are using React then move and replace the files from `themes/base/react` otherwise this folder can be deleted
4. Make appropriate configuration changes to `webpack.env.js`
5. Run `yarn install` in the folder containing `package.json`

## Configuration

Near the top of `webpack.env.js` are a set of constants that should be configured to match your project setup.

-   `theme` is the name of your theme directory (default is `'base'`)
-   `defaultLocalDomain` is the domain name for local development (default is `dna.test`)

If you prefer to have a different domain for your local environment to the one defined in `webpack.env.js` you can define `WEBPACK_DOMAIN` in your `.env` file.

## Environment Configuration

The following variables may be included in your `.env` file:

-   `WEBPACK_DOMAIN`: Domain to be used by webpackDevServer
-   `WEBPACK_SSL_ENABLE`: Whether your local server is HTTPS, if so provide the following variables
-   `WEBPACK_SSL_KEY`: SSL Key to be used by webpackDevServer
-   `WEBPACK_SSL_CERT`: SSL Cert to be used by webpackDevServer
-   `WEBPACK_SSL_CA`: SSL CA to be used by webpackDevServer

## Development Extensions

Most developers at DNA use VS Code, there is workspace specific configuration for these extensions in `vscode-settings.json`, you should copy these to `.vscode/settings.json` (we don't commit this dir so you can make your own workspace customisations). If you do not use VS Code it is recommended that you use equivalent extensions/configuration for your IDE

The tasks only auto-fix files when running the `prod` task (otherwise you would have to reload files every time you save), so it is recommended that you auto-fix files using extensions, we rely on VS Code extensions to do this, you can install these with the [code](https://code.visualstudio.com/docs/setup/mac#_launching-from-the-command-line) CLI tool using the following command `code --install-extension <extension-id>`.

### Required

These extensions are to provide code linting and formatting, this is to make sure that we are avoiding common pitfalls and writing code the same style, it will mean that you will avoid having to fix errors reported by the build task, as you will be warned about errors while typing and files will be fixed on save.

| Extension                    | Description                 |
| ---------------------------- | --------------------------- |
| `editorconfig.editorconfig`  | Consistent spacing in files |
| `dbaeumer.vscode-eslint`     | JS linting and fixing       |
| `esbenp.prettier-vscode`     | File formatting             |
| `stylelint.vscode-stylelint` | SCSS linting and fixing     |

### Recommended

These extensions are likely to improve your development experience for _js_ and _scss_

| Extension                            | Description                                         |
| ------------------------------------ | --------------------------------------------------- |
| `mgmcdermott.vscode-language-babel`  | Support for newer ES syntax in js (i.e. decorators) |
| `wix.vscode-import-cost`             | Displays the size of imported js                    |
| `christian-kohler.npm-intellisense`  | JS import suggestions                               |
| `christian-kohler.path-intellisense` | File path suggestions                               |
| `mrmlnc.vscode-scss`                 | SCSS Intellisense                                   |
| `orta.vscode-jest`                   | Jest Integration                                    |

### Silverstripe/PHP

It is likely that you will be using this build chain in conjunction with Silverstripe/PHP development, these extensions will greatly enhance your Silverstripe development experience. Note _phpcs_ and _phpcbf_ tools must be installed to take advantage of use the linting and formatting, this can be done by running `composer global require squizlabs/php_codesniffer`

| Extension                               | Description                                          |
| --------------------------------------- | ---------------------------------------------------- |
| `felixfbecker.php-debug`                | Debug support for PHP with XDebug                    |
| `neilbrayfield.php-docblocker`          | PHP Docblock support                                 |
| `phproberto.vscode-php-getters-setters` | Create PHP getters and setters from class properties |
| `bmewburn.vscode-intelephense-client`   | PHP Intellisense                                     |
| `mehedidracula.php-namespace-resolver`  | Import and expand PHP namespaces                     |
| `valeryanm.vscode-phpsab`               | PHP linting and fixing                               |
| `adrianhumphreys.silverstripe`          | Silverstripe `.ss` syntax support                    |

## Tasks

We use [webpack](https://webpack.js.org) (see `webpack.common.js`) to generate assets

To run a task run `yarn <task-name>`

-   `dev`: compiles code from `src` to `dist` with source-maps (see `webpack.dev.js`)
-   `watch`: complies code from `src` to `dist` with source-maps, watches for code changes and compiles accordingly (see `webpack.dev.js`)
-   `serve`: serves files directly via [webpack-dev-server](https://webpack.js.org/configuration/dev-server/) (port `:8080`), uses [HMR](https://webpack.js.org/concepts/hot-module-replacement/) to update page with code changes without reloading (if configured in your app), otherwise falls back to reloading on change (see `webpack.dev.js`)
-   `prod`: compiles code from `src` to `dist` without source-maps, fixes files, performs vendor chunking (see `webpack.prod.js`)
-   `test`: runs [jest](https://jestjs.io/) which runs any `test.jsx?`

## Javascript

-   [babel](https://babeljs.io) transpiles the js (see `.babelrc`)
    -   `@babel/plugin-proposal-class-properties` and `@babel/plugin-proposal-decorators` allow us to use [js decorators](https://github.com/tc39/proposal-decorators)
-   [eslint](https://eslint.org/) lints and fixes the js (see `.eslintrc`)
    -   [airbnb](https://github.com/airbnb/javascript/tree/master/react) as our style guide
    -   [simple-import-sort](https://github.com/lydell/eslint-plugin-simple-import-sort) for automatic import sorting
-   [prettier](https://prettier.io) for overall formatting (see `.prettierrc`)
-   [modernizr] for feature detection (see `.modernizrrc.js`), the full list of supported options can be found in [config-all.json](https://github.com/Modernizr/Modernizr/blob/master/lib/config-all.json)

## CSS

-   [stylelint](https://stylelint.io/) lints and fixes scss (see `.stylelintrc`)
    -   [sass-guidelines](https://sass-guidelin.es) as our style guide
    -   [stylelint-concentric-order](https://www.npmjs.com/package/stylelint-config-concentric-order) for automatic property sorting
-   [prettier](https://prettier.io) for overall formatting (see `.prettierrc`)
-   [postcss](https://postcss.org) for CSS Processing (see `postcss.config.js`)
    -   [autoprefixer](https://github.com/postcss/autoprefixer) for adding appropriate prefixes for your supported browsers
    -   [inline-svg](https://github.com/TrySound/postcss-inline-svg) for inlining svg within css files
    -   [normalize](https://github.com/csstools/postcss-normalize) for normalising default styles across browsers

## Browser Support

Many of the build tools we use support [browserslist](https://github.com/browserslist/browserslist), you should define `browserslist` in your `package.json`, it is recommended that you use 'defaults' (Equivalent to `> 0.5%, last 2 versions, Firefox ESR, not dead`) but you can tweak it if desired. This affects _babel_, _normalize_ and _autoprefixer_.

## Javascript Testing

We use [Jest](https://jestjs.io/docs/en/getting-started.html) to test javascript components. Note there is a configuration file called `jest.config.js` where custom configuration and mocks can be added. Additionally there is `jest.setup.js` which is run before each test.
Also included is [enzyme](https://enzymejs.github.io/enzyme/) which makes it easier to test React components.

## Loading built files

Below are some PHP functions that automatically includes generated files by parsing the `stats.json` that webpack outputs (it contains has a list of `.js` and `.css` files generated). This can be helpful because `dev` produces less files than `prod` as it does not perform vendor chunking

In `Page.php`

```php
    public function init()
    {
        parent::init();

        $builtChunks = $this->getBuiltReqs();
        if ($builtChunks) {
            if (array_key_exists('vendor', $builtChunks)) {
                foreach ($builtChunks['vendor'] as $req) {
                    $this->loadRequirement($req);
                }
                unset($builtChunks['vendor']);
            }
            foreach ($builtChunks as $reqs) {
                foreach ($reqs as $req) {
                    $this->loadRequirement($req);
                }
            }
        }
    }

    /**
     * Loads a requirement according to it's extension
     *
     * @return void
     */
    private function loadRequirement($req)
    {
        $ext = pathinfo($req, PATHINFO_EXTENSION);

        if ($ext === 'js') {
            Requirements::javascript("themes/base/dist/" . $req);
        } elseif ($ext === 'css') {
            Requirements::css("themes/base/dist/" . $req);
        }
    }

    /**
     * Loads the list of built requirements from webpack 'stats.json'
     *
     * @return array|null
     */
    public function getBuiltReqs()
    {
        $statsFile = glob($_ENV['DOCUMENT_ROOT'] . '/themes/base/dist/stats.json');
        if ($statsFile) {
            $stats = json_decode(file_get_contents($statsFile[0]), true);
            return array_key_exists('assetsByChunkName', $stats) ? $stats['assetsByChunkName'] : null;
        } else {
            return null;
        }
    }
```
