<?php
//Actions
add_action('after_setup_theme', 'setup_theme');
add_action('wp_enqueue_scripts', 'load_theme_assets');

//Functions
function setup_theme() {
  //Create sidebars, menus, add image sizes and etc. here
}

function load_theme_assets() {
    // Enqueue scripts
    wp_register_script('app', get_stylesheet_directory_uri() . '/public/js/app.js', array('jquery'), true, true);
    wp_enqueue_script('app');
 
    // Enqueue stylesheets
    wp_register_style('app', get_stylesheet_directory_uri() . '/public/css/app.css', array());
    wp_enqueue_style('app');
}