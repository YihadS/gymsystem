<?php
require 'connect.php';
header("Access-Control-Allow-Origin: http://localhost:3000");
header('Access-Control-Allow-Methods: GET, POST, DELETE, PUT, OPTIONS');
header("Access-Control-Allow-Headers: Content-Type, Authorization");
 
// Realizamos la consulta al BD
$sql = "SELECT * FROM planes ORDER BY Nombre asc";
$result = $db->query($sql);

// Devuelve el resultado en forma de arreglo
$data = array();
if ($result->num_rows > 0) {
  while($row = $result->fetch_assoc()) {
    $data[] = $row;
  }
}

// retornamos la información en forma JSON
header('Content-Type: application/json');
echo json_encode($data);

mysqli_close($db);
?>