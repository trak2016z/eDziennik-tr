<?php
session_start();
require_once("config.php");
require_once("loader.php");
LoginController::logOutUser();
echo json_encode($_SESSION);
?>