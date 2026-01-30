<?php
// Save data to JSON file
// Enable CORS if needed
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');

// Check if it's a POST request
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'error' => 'Only POST requests allowed']);
    exit;
}

// Get the posted data
$input = file_get_contents('php://input');
$data = json_decode($input, true);

// Validate data
if (!$data || !isset($data['teams']) || !isset($data['matches'])) {
    http_response_code(400);
    echo json_encode(['success' => false, 'error' => 'Invalid data format']);
    exit;
}

// Add timestamp
$data['lastUpdated'] = time() * 1000; // milliseconds for JavaScript

// Convert to formatted JSON
$jsonString = json_encode($data, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE);

// Save to data.json
$result = file_put_contents('data.json', $jsonString);

if ($result !== false) {
    echo json_encode([
        'success' => true,
        'message' => 'Data saved successfully',
        'timestamp' => $data['lastUpdated']
    ]);
} else {
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'error' => 'Failed to write to data.json. Check file permissions.'
    ]);
}
?>
