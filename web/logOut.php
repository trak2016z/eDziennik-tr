<?php
session_start();
require_once("config.php");
require_once("loader.php");
LoginController::logOutUser();
//header("Location: ". PROJECT_DIRECTORY."web/login");
echo json_encode($_SESSION);
?>