<?php
require 'connect.php';
header("Access-Control-Allow-Origin: http://localhost:3000");
header('Access-Control-Allow-Methods: GET, POST, DELETE, PUT, OPTIONS');
header("Access-Control-Allow-Headers: Content-Type, Authorization");
  // Get the user ID from the query string
  $id = $_GET['id'];

  // Get the updated user data from the request body
  $data = json_decode(file_get_contents("php://input"), true);


  // Prepare and execute the update query
  $stmt = $db->prepare("UPDATE clientes SET Nombre = ?, Apellidos = ?, Carnet = ?, plan = ?, fecha_inicio = ?, fecha_vencimiento = ? WHERE id = ?");
  $stmt->bind_param("ssssssi", $data['nombre'], $data['apellidos'], $data['carnet'], $data['plan'], $data['fecha_inicio'], $data['fecha_vencimiento'], $id);
  $result = $stmt->execute();

  // Check for errors in the query execution
  if (!$result) {
    die("Error updating record: " . $db->error);
  }

  // Close the database connection
  $stmt->close();
  $db->close();
?>