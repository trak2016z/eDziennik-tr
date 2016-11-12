<?php
ob_start();
define('DSN', 'mysql:host=localhost;dbname=edziennik;charset=utf8');
define('USER', 'root');
define('PASSWORD', '');
define('DOC_ROOT', $_SERVER['DOCUMENT_ROOT']);    //C:/wamp/www/
define('PROJECT_DIRECTORY', DOC_ROOT."Repositories/eDziennik/");


?>