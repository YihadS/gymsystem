<?php
require 'connect.php';
header("Access-Control-Allow-Origin: http://localhost:3000");
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header("Access-Control-Allow-Headers: Content-Type, Authorization");
 
$postdata = file_get_contents("php://input");
if(isset($postdata) && !empty($postdata)){
    $request = json_decode($postdata);

    $name = $request->name;
    $password = $request->password;

    $sql = "SELECT * FROM trabajadores WHERE user='$name' AND password='$password'";
    $result = mysqli_query($db, $sql);
    
    if ($result && mysqli_num_rows($result) > 0) {
        // Si el usuario existe
        http_response_code(201);
        $user = mysqli_fetch_assoc($result);
        echo json_encode($user);
        exit();
    } else {
        // Si el usuario no existe
        http_response_code(422);
        $response_message = 'El usuario o la contraseña es incorrecta';
        echo json_encode($response_message);
        exit();
    }
    
}
?> 