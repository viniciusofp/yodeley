<?php


// Add Post Formats
add_theme_support( 'post-formats', array( 'aside', 'image', 'video', 'audio' ) );

// Featured Image Support
add_theme_support( 'post-thumbnails' );

// Prepare API

add_action( 'rest_api_init', 'slug_register_soundcloud' );
function slug_register_soundcloud() {
    register_rest_field( 'post',
        'soundcloud',
        array(
            'get_callback'    => 'slug_get_soundcloud',
            'update_callback' => null,
            'schema'          => null,
        )
    );
}
function slug_get_soundcloud( $object, $field_name, $request ) {
	if (get_post_meta( $object[ 'id' ], $field_name, true )) {
   		return get_post_meta( $object[ 'id' ], $field_name, true );
	} else {
		return false;
	}
}
add_action( 'rest_api_init', 'slug_register_youtube' );
function slug_register_youtube() {
    register_rest_field( 'post',
        'youtube',
        array(
            'get_callback'    => 'slug_get_youtube',
            'update_callback' => null,
            'schema'          => null,
        )
    );
}
function slug_get_youtube( $object, $field_name, $request ) {
	if (get_post_meta( $object[ 'id' ], $field_name, true )) {
   		return get_post_meta( $object[ 'id' ], $field_name, true );
	} else {
		return false;
	}
}

// Thumbnail
function rest_thumb( $data, $post, $request ) {
	$_data = $data->data;
	$thumbnail_id = get_post_thumbnail_id( $post->ID );
	$thumbnail = wp_get_attachment_image_src( $thumbnail_id, 'thumbnail' );
	$_data['featured_image'] = $thumbnail[0];
	
	$data->data = $_data;
	return $data;
}
add_filter( 'rest_prepare_post', 'rest_thumb', 10, 3 );

// Medium
function rest_medium( $data, $post, $request ) {
	$_data = $data->data;
	$thumbnail_id = get_post_thumbnail_id( $post->ID );
	$thumbnail = wp_get_attachment_image_src( $thumbnail_id, 'medium' );
	$_data['featured_image_medium'] = $thumbnail[0];
	
	$data->data = $_data;
	return $data;
}
add_filter( 'rest_prepare_post', 'rest_medium', 10, 3 );

// Large
function rest_large( $data, $post, $request ) {
	$_data = $data->data;
	$thumbnail_id = get_post_thumbnail_id( $post->ID );
	$thumbnail = wp_get_attachment_image_src( $thumbnail_id, 'large' );
	$_data['featured_image_large'] = $thumbnail[0];
	
	$data->data = $_data;
	return $data;
}
add_filter( 'rest_prepare_post', 'rest_large', 10, 3 );

// Full
function rest_full( $data, $post, $request ) {
	$_data = $data->data;
	$thumbnail_id = get_post_thumbnail_id( $post->ID );
	$thumbnail = wp_get_attachment_image_src( $thumbnail_id, 'full' );
	$_data['featured_image_full'] = $thumbnail[0];
	
	$data->data = $_data;
	return $data;
}
add_filter( 'rest_prepare_post', 'rest_full', 10, 3 );

?>
