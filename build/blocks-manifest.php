<?php
// This file is generated. Do not modify it manually.
return array(
	'wp-pokemon' => array(
		'$schema' => 'https://schemas.wp.org/trunk/block.json',
		'apiVersion' => 3,
		'name' => 'pokemon-type/wp-pokemon',
		'version' => '0.1.0',
		'title' => 'Pokemon Type',
		'category' => 'embed',
		'icon' => 'games',
		'description' => 'Pokemon Block Description',
		'example' => array(
			
		),
		'supports' => array(
			'html' => false
		),
		'attributes' => array(
			'selectedType' => array(
				'type' => 'string',
				'default' => ''
			),
			'pokemons' => array(
				'type' => 'array',
				'default' => array(
					
				)
			),
			'backgroundColor' => array(
				'type' => 'string',
				'default' => '#ffffff'
			),
			'textColor' => array(
				'type' => 'string',
				'default' => '#000000'
			),
			'fontSize' => array(
				'type' => 'number',
				'default' => 16
			),
			'itemBackground' => array(
				'type' => 'string',
				'default' => '#f5f5f5'
			),
			'itemTextColor' => array(
				'type' => 'string',
				'default' => '#333333'
			),
			'customClassName' => array(
				'type' => 'string',
				'default' => ''
			)
		),
		'textdomain' => 'wp-pokemon',
		'editorScript' => 'file:./index.js',
		'editorStyle' => 'file:./index.css',
		'style' => 'file:./style-index.css',
		'render' => 'file:./render.php',
		'viewScript' => 'file:./view.js'
	)
);
