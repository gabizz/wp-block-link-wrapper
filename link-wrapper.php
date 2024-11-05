<?php
/*
Plugin Name: Link Wrapper
Description: Wrap any Gutenberg block with a link.
Version: 1.0
Author: Gabriel Maftei
*/

function link_wrapper_enqueue_scripts() {
    $asset_file = plugin_dir_path(__FILE__) . 'build/link-wrapper.asset.php';
    if (!file_exists($asset_file)) {
        return;
    }

    $asset = require($asset_file);
    
    wp_enqueue_script(
        'link-wrapper',
        plugin_dir_url(__FILE__) . 'build/link-wrapper.js',
        array_merge($asset['dependencies'], ['wp-blocks', 'wp-element', 'wp-editor', 'wp-components']),
        $asset['version']
    );

    wp_enqueue_style(
        'link-wrapper-editor',
        plugin_dir_url(__FILE__) . 'build/link-wrapper.css',
        array(),
        $asset['version']
    );
}
add_action('enqueue_block_editor_assets', 'link_wrapper_enqueue_scripts');

function add_custom_block_category($categories) {
    return array_merge(
        $categories,
        [
            [
                'slug' => 'gabriel-maftei',
                'title' => 'Gabriel Maftei',
            ],
        ]
    );
}
add_filter('block_categories_all', 'add_custom_block_category', 10, 2);