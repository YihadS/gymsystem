<?php
require 'connect.php';
header("Access-Control-Allow-Origin: http://localhost:3000");
header('Access-Control-Allow-Methods: GET, POST, DELETE, OPTIONS');
header("Access-Control-Allow-Headers: Content-Type, Authorization");
 
$id = $_REQUEST["id"];

//Consulta la BD para borrar un usuario
$sql = "DELETE FROM clientes WHERE id = $id";

if ($db->query($sql) === TRUE) {
  echo "Record deleted successfully";
} else {
  echo "Error deleting record: " . $db->error;
}

$db->close();
?>