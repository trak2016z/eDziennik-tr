<?php
session_start();
require_once("config.php");
require_once("loader.php");
require_once("header.php");

$router = new Router($_SERVER['REQUEST_URI']);
$router->checkUrl();
$controller = $router->checkParameters();

require_once("footer.php");
?>