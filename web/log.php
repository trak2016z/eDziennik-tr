<?php
session_start();
require_once("config.php");
require_once("loader.php");

$login = Data::getData('login');
$password = Data::getData('password');

$databaseHandle = Database::getInstance();
$result = $databaseHandle->selectData("SELECT * FROM `teacher` WHERE login = '{$login}' AND password = '{$password}'");
if(is_array($result)&&count($result) == 1) {
    if($result[0]['is_active'] == 1) {
        LoginController::logInUser($result[0]);
        //logInUser($result[0]['ID'], $result[0]['login'], "admin");
        echo json_encode($_SESSION);
    }
    else {
        echo json_encode("To konto nie jest aktywne");
    }
}
else if(!is_array($result)) {
    $result = $databaseHandle->selectData("SELECT * FROM `student` WHERE login = '{$login}' AND password = '{$password}'");
    //jezeli jest taki uczen
    if (is_array($result)&&count($result) == 1) {
        LoginController::logInUser($result[0]);
        //logInUser($result[0]['ID'], $result[0]['login'], "student");
        echo json_encode($_SESSION);
    }
    //spr czy pierwsze logowanie
    else
        echo json_encode("Niepoprawne dane logowania");
}

/*function logInUser($ID, $login, $type) {
    $_SESSION['ID'] = $ID;
    $_SESSION['login'] = $login;
    $_SESSION['type'] = $type;
}*/
?>