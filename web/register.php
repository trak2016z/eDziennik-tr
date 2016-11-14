<?php
require_once("config.php");
require_once("loader.php");
$databaseHandle = Database::getInstance();
$data = array('name' => Data::getData('name'), 'surname' => Data::getData('surname'), 'login' => Data::getData('login'), 'password' => Data::getData('password'));
//echo json_encode($_POST);
echo json_encode($databaseHandle->insertData('teacher', $data));
?>

