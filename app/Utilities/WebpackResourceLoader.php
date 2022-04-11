<?php

namespace App\Utilities;

use SilverStripe\Core\Extension;
use SilverStripe\VendorPlugin\Util;
use SilverStripe\View\Requirements;
use SilverStripe\View\ThemeResourceLoader;

class WebpackResourceLoader extends Extension
{
    /**
     * Theme folder name with webpack based theme to load assets from
     *
     * @var string
     */
    private static $theme = 'takina';

    public function onAfterInit()
    {
        Requirements::set_force_js_to_bottom(true);
        self::loadBuiltReqs();
    }

    /**
     * Get the webpack-assets.json, returns false if not present
     *
     * @return array|false
     */
    public static function getWebpackAssets()
    {
        return glob(THEMES_PATH . '/' . self::$theme . '/dist/webpack-assets.json');
    }

    /**
     * Loads a requirement according to it's type
     *
     * @return void
     */
    private static function loadRequirement($type, $fileName)
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
    public static function loadBuiltReqs()
    {
        $assetsFile = self::getWebpackAssets();

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
                self::loadRequirement($type, $fileName);
            }
            unset($assets['vendor']);
        }
        foreach ($assets as $reqs) {
            foreach ($reqs as $type => $fileName) {
                self::loadRequirement($type, $fileName);
            }
        }
    }

    /**
     * Returns the favicon.ico url if webpack assets are built
     *
     * @return string|null
     */
    public function getFavicon($type = 'ico')
    {
        if (!self::getWebpackAssets()) {
            return false;
        }
        $favicon = ThemeResourceLoader::inst()
            ->findThemedResource("/dist/static/favicons/favicon.$type");

        return Util::joinPaths('/', RESOURCES_DIR, $favicon);
    }
}
