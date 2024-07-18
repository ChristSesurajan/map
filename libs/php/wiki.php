<?php

ini_set('display_errors', 'On');
error_reporting(E_ALL);

$executionStartTime = microtime(true);

// Check if 'name' parameter is set
if (!isset($_REQUEST['name'])) {
    $output['status']['code'] = "400";
    $output['status']['name'] = "bad request";
    $output['status']['description'] = "Missing 'name' parameter";
    $output['status']['returnedIn'] = intval((microtime(true) - $executionStartTime) * 1000) . " ms";
    header('Content-Type: application/json; charset=UTF-8');
    echo json_encode($output);
    exit;
}

// URL for the API request
$url = 'http://api.geonames.org/wikipediaSearchJSON?q=' . $_REQUEST['name'] . '&maxRows=10&username=rimmon';

// Initialize cURL session
$ch = curl_init();

// Set cURL options
curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false); // Disable SSL verification (only for development)
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true); // Return the response as a string
curl_setopt($ch, CURLOPT_URL, $url); // Set the URL for the request

// Execute cURL session
$result = curl_exec($ch);

// Check for cURL execution errors
if ($result === false) {
    $output['status']['code'] = "500";
    $output['status']['name'] = "internal server error";
    $output['status']['description'] = curl_error($ch);
    $output['status']['returnedIn'] = intval((microtime(true) - $executionStartTime) * 1000) . " ms";
    curl_close($ch);
    header('Content-Type: application/json; charset=UTF-8');
    echo json_encode($output);
    exit;
}

// Close cURL session
curl_close($ch);

// Decode JSON response
$decode = json_decode($result, true);

// Check if JSON decoding was successful
if ($decode === null || json_last_error() !== JSON_ERROR_NONE) {
    $output['status']['code'] = "500";
    $output['status']['name'] = "internal server error";
    $output['status']['description'] = "Failed to decode JSON response";
    $output['status']['returnedIn'] = intval((microtime(true) - $executionStartTime) * 1000) . " ms";
    header('Content-Type: application/json; charset=UTF-8');
    echo json_encode($output);
    exit;
}

// Check for geonames key existence in decoded response
if (!isset($decode['geonames'])) {
    $output['status']['code'] = "500";
    $output['status']['name'] = "internal server error";
    $output['status']['description'] = "Missing 'geonames' data in response";
    $output['status']['returnedIn'] = intval((microtime(true) - $executionStartTime) * 1000) . " ms";
    header('Content-Type: application/json; charset=UTF-8');
    echo json_encode($output);
    exit;
}

// Prepare success response
$output['status']['code'] = "200";
$output['status']['name'] = "ok";
$output['status']['description'] = "success";
$output['status']['returnedIn'] = intval((microtime(true) - $executionStartTime) * 1000) . " ms";
$output['data'] = $decode['geonames'];

// Return JSON response
header('Content-Type: application/json; charset=UTF-8');
echo json_encode($output);

// Log cURL result (optional)
file_put_contents('curl_result.log', $result . PHP_EOL, FILE_APPEND);

?>
