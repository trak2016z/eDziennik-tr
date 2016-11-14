<?php

require_once("config.php");
require_once("loader.php");
$login = $_POST['login'];
$password = $_POST['password'];
$databaseHandle = Database::getInstance();
$result = $databaseHandle->selectData("SELECT * FROM `teacher` WHERE login = '{$login}' AND password = '{$password}'");
if(count($result) == 1) {
   //spr, czy admin, jezeli nie spr czy aktywny
    if($result[0]['type'] == 1) {
        echo json_encode($result);
    }

}
else if(count($result) == 0) {
    $result = $databaseHandle->selectData("SELECT * FROM `student` WHERE login = '{$login}' AND password = '{$password}'");
    //jezeli jest taki uczen
    if (count($result) == 1)
        echo json_encode($result);
    //spr czy pierwsze logowanie
    else
        echo json_encode("Niepoprawne dane logowania");
}

?>