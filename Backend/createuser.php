<?php
require 'connect.php';
header("Access-Control-Allow-Origin: http://localhost:3000");
header('Access-Control-Allow-Methods: GET, POST, DELETE, PUT, OPTIONS');
header("Access-Control-Allow-Headers: Content-Type, Authorization");
  // Get the user ID from the query string
  $id = $_GET['id'];

  // Get the updated user data from the request body
  $data = json_decode(file_get_contents("php://input"), true);


// Prepare and execute the insert query
$stmt = $db->prepare("INSERT INTO clientes (Nombre, Apellidos, Carnet, plan, fecha_inicio, fecha_vencimiento) VALUES (?, ?, ?, ?, ?, ?)");
$stmt->bind_param("ssssss", $data['nombre'], $data['apellidos'], $data['carnet'], $data['plan'], $data['fecha_inicio'], $data['fecha_vencimiento']);
$result = $stmt->execute();

// Check for errors in the query execution
if (!$result) {
  die("Error inserting record: " . $db->error);
}

// Close the database connection
$stmt->close();
$db->close();

?>