# DNA Project Boilerplate

## Introduction

This is a collection of tools, configurations and recommendations for setting up a project. It provides build tooling setup for SilverStripe based websites, which includes Vue (or optionally React) and recommended extensions for a productive development experience within the IDE developers use at DNA – [Visual Studio Code](https://code.visualstudio.com) (VS Code).

Note that this boilerplate uses yarn v3 (berry) which handles node modules quite differently than it previously did, please consult the [yarn docs](https://yarnpkg.com) for an overview and explanation of these changes.

Although this provides a lot out of the box, feel free to customise it to fit the project.

## Setup

1. Make sure you have _nvm_ and _yarn_ installed
2. Install required development extensions (see the _Development Extensions_ section)
3. By default this is configured for Vue, if you are using React then move and replace the files from `themes/base/react` otherwise this folder can be deleted
4. Make appropriate configuration changes to `webpack.env.js`
5. Uncomment and modify folder entries within the `CopyWebpackPlugin` options in `webpack.config.js`
6. Run `yarn install` in the folder containing `package.json`

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

Developers at DNA use VS Code, there is workspace specific configuration for these extensions in `vscode-settings.json`, you should copy these to `.vscode/settings.json` (we don't commit this dir so you can make your own workspace customisations).

You can get all the required/recommended extensions by:

1. Copy `vscode-extensions.json` to `.vscode/extensions.json`
2. Navigate to the 'Extensions' panel in VS Code
3. Filter by 'recommended'
4. Our recommendations are under 'workspace recommendations'

If you do not use VS Code it is recommended that you use equivalent extensions/configuration for your IDE.

### Required

These extensions are to provide code linting and formatting, this is to make sure that we are avoiding common pitfalls and writing code the same style. These extensions help us to fix errors before triggering the build task, as you will be warned about errors while typing and files will be fixed on save.

| Extension                    | Description                 |
| ---------------------------- | --------------------------- |
| `dbaeumer.vscode-eslint`     | JS linting and fixing       |
| `editorconfig.editorconfig`  | Consistent spacing in files |
| `esbenp.prettier-vscode`     | File formatting             |
| `octref.vetur`               | .vue file support           |
| `stylelint.vscode-stylelint` | SCSS linting and fixing     |

### Recommended

These extensions are likely to improve your development experience for _js_ and _scss_

| Extension                               | Description                 |
| --------------------------------------- | --------------------------- |
| `arcanis.vscode-zipfs`                  | Handle yarn 2 zips          |
| `christian-kohler.npm-intellisense`     | JS import suggestions       |
| `christian-kohler.path-intellisense`    | File path suggestions       |
| `mrmlnc.vscode-scss`                    | SCSS Intellisense           |
| `oouo-diogo-perdigao.docthis`           | Generate JSDoc              |
| `orta.vscode-jest`                      | Jest Integration            |
| `streetsidesoftware.code-spell-checker` | Spellchecker                |
| `drknoxy.eslint-disable-snippets`       | Snippets for eslint-disable |

### Silverstripe/PHP

It is likely that you will be using this build chain in conjunction with Silverstripe/PHP development, these extensions will greatly enhance your Silverstripe development experience. Note _phpcs_ and _phpcbf_ tools must be installed to take advantage of use the linting and formatting, this can be done by running `composer global require squizlabs/php_codesniffer`

| Extension                               | Description                                          |
| --------------------------------------- | ---------------------------------------------------- |
| `adrianhumphreys.silverstripe`          | Silverstripe `.ss` syntax support                    |
| `bmewburn.vscode-intelephense-client`   | PHP Intellisense                                     |
| `felixfbecker.php-debug`                | Debug support for PHP with XDebug                    |
| `mehedidracula.php-namespace-resolver`  | Import and expand PHP namespaces                     |
| `neilbrayfield.php-docblocker`          | PHP Docblock support                                 |
| `phproberto.vscode-php-getters-setters` | Create PHP getters and setters from class properties |
| `valeryanm.vscode-phpsab`               | PHP linting and fixing                               |

## Tasks

We use [webpack](https://webpack.js.org) (see `webpack.config.js`) to generate assets

To run a task run `yarn <task-name>`

-   `dev`: compiles code from `src` to `dist` with source-maps
-   `watch`: complies code from `src` to `dist` with source-maps, watches for code changes and compiles accordingly
-   `serve`: serves files directly via [webpack-dev-server](https://webpack.js.org/configuration/dev-server/) (port `:8080`), uses [HMR](https://webpack.js.org/concepts/hot-module-replacement/) to update page with code changes without reloading (if configured in your app), otherwise falls back to reloading on change
-   `prod`: compiles code from `src` to `dist` without source-maps, fixes files, performs vendor chunking
-   `test`: runs [jest](https://jestjs.io/) which runs any `test.js(x)`

## Javascript

-   [babel](https://babeljs.io) transpiles the js (see `.babelrc`) and allows us to use newer syntax
    -   `@babel/plugin-proposal-class-properties` and `@babel/plugin-proposal-decorators` allow us to use [js decorators](https://github.com/tc39/proposal-decorators)
    -   [@babel/plugin-proposal-optional-chaining](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Optional_chaining)
    -   [@babel/plugin-proposal-nullish-coalescing-operator](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Nullish_coalescing_operator)
-   [eslint](https://eslint.org/) lints and fixes the js (see `.eslintrc`)
    -   [airbnb](https://github.com/airbnb/javascript/tree/master/react) as our style guide
    -   [simple-import-sort](https://github.com/lydell/eslint-plugin-simple-import-sort) for automatic import sorting
-   [prettier](https://prettier.io) for overall formatting (see `.prettierrc`)

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

Many of the build tools we use support [browserslist](https://github.com/browserslist/browserslist), you should define `browserslist` in your `package.json`. We have chosen a list which roughly equates to supporting the last 2 versions of major browsers and specifically excludes IE, since we have stopped officially supporting it.

This list affects transformations performed by _babel_, _normalize_ and _autoprefixer_.

## Javascript Testing

We use [Jest](https://jestjs.io/docs/en/getting-started.html) to test javascript components. Note there is a configuration file called `jest.config.js` where custom configuration and mocks can be added. Additionally there is `jest.setup.js` which is run before each test.
Also included is [enzyme](https://enzymejs.github.io/enzyme/) which makes it easier to test React components.

## React

If intending to use React follow these steps:

1. Run these commands in the theme folder

    - `yarn remove eslint-config-airbnb-base;`
    - `yarn add prop-types react react-bem-helper react-dom react-hot-loader react-use;`
    - `yarn add --dev @types/enzyme @types/react enzyme enzyme-adapter-react-16 enzyme-to-json eslint-config-airbnb eslint-plugin-jsx-a11y eslint-plugin-react eslint-plugin-react-hooks;`

2. Update these blocks in `.eslintrc`

    ```json
    "extends": [
        "airbnb",
        "plugin:prettier/recommended",
        "plugin:jest/recommended"
    ],
    "overrides": [
        {
        "files": ["*.test.js", "*.test.jsx"],
        "globals": {
            "React": true
        }
        }
    ]
    ```

3. Update these jest files

    - Add this line to `jest.config.js`

    ```json
        snapshotSerializers: ['enzyme-to-json/serializer']
    ```

    - Replace the contents of `jest.setup.js`

    ```js
    // Uncomment if using mobx
    // import 'mobx-react/batchingForReactDom';

    import Enzyme from "enzyme";
    import Adapter from "enzyme-adapter-react-16";
    // Uncomment if using mobx
    // import { configure as MobxConfigure } from 'mobx';
    import React from "react";

    MobxConfigure({ enforceActions: "observed" });
    Enzyme.configure({ adapter: new Adapter() });

    global.React = React;
    ```

## Loading built files

Below are some PHP functions that automatically includes generated files by parsing the `webpack-assets.json` that webpack outputs (it contains has a list of `.js` and `.css` files generated). This can be helpful because `dev` produces less files than `prod` as it does not perform vendor chunking.

In `PageController.php`

```php
    public function init()
    {
        parent::init();

        Requirements::set_force_js_to_bottom(true);
        $this->loadBuiltReqs();
    }

    /**
     * Get the webpack-assets.json, returns false if not present
     *
     * @return array|false
     */
    public function getWebpackAssets()
    {
        return glob(THEMES_PATH . '/base/dist/webpack-assets.json');
    }

    /**
     * Loads a requirement according to it's type
     *
     * @return void
     */
    private function loadRequirement($type, $fileName)
    {
        if (gettype($fileName) === 'array') {
            $bundle = array_filter($fileName, function ($file) {
                return strpos($file, '.bundle');
            });
            $fileName = array_pop($bundle);
        }
        $fileName = ltrim($fileName, '/');
        $fileName = str_replace('_resources/', '', $fileName);
        if ($type === 'js') {
            Requirements::javascript($fileName);
        } elseif ($type === 'css') {
            Requirements::css($fileName);
        }
    }

    /**
     * Loads the list of built requirements from webpack 'webpack-assets.json'
     *
     * @return void
     */
    public function loadBuiltReqs()
    {
        $assetsFile = $this->getWebpackAssets();

        if (!$assetsFile) {
            return;
        }

        $assets = json_decode(file_get_contents($assetsFile[0]), true);

        // Skip loading these assets since they're loaded through other means
        $skipAssets = [
            '', 'editor', 'polyfills', 'components'
        ];

        foreach ($skipAssets as $asset) {
            if (array_key_exists($asset, $assets)) {
                unset($assets[$asset]);
            }
        }

        // Load vendor first
        if (array_key_exists('vendor', $assets)) {
            foreach ($assets['vendor'] as $type => $fileName) {
                $this->loadRequirement($type, $fileName);
            }
            unset($assets['vendor']);
        }
        foreach ($assets as $reqs) {
            foreach ($reqs as $type => $fileName) {
                $this->loadRequirement($type, $fileName);
            }
        }
    }

    /**
     * Returns the favicon.ico url if webpack assets are built
     *
     * @return string|false
     */
    public function getFaviconICO()
    {
        return $this->getWebpackAssets()
            ? ModuleResourceLoader::singleton()->resolveResource(THEMES_PATH . '/base/dist/static/favicons/favicon.ico')
            : false;
    }

    /**
     * Returns the favicon.svg url if webpack assets are built
     *
     * @return string|false
     */
    public function getFaviconSVG()
    {
        return $this->getWebpackAssets()
            ? ModuleResourceLoader::singleton()->resolveResource(THEMES_PATH . '/base/dist/static/favicons/favicon.svg')
            : false;
    }
```
