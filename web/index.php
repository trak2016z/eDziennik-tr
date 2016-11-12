<?php

require_once("config.php");
require_once("loader.php");
require_once("header.php");


$router = new Router($_SERVER['REQUEST_URI']);
$router->checkUrl();

//echo $_SERVER['REQUEST_URI']."<br />";
$controller = $router->chooseController();

if($controller) {
    $controller->getView();
}

require_once("footer.php");
?>