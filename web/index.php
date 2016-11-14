<?php

require_once("config.php");
require_once("loader.php");
require_once("header.php");


$router = new Router($_SERVER['REQUEST_URI']);
$router->checkUrl();
$view = new View();
//Pobranie zmiennej z adresu URL
$controller = Data::getData("controller");
if(isset($controller)&&(!empty($controller))) {
    //Wyœwietlenie odpowiedniego widoku
    switch($controller) {
        case 'register': $view->chooseView('register'); break;
        case 'login': $view->chooseView('login'); break;
        case 'teachers': $view->chooseView('teachers'); break;
        case 'subjects': $view->chooseView('subjects'); break;
        case 'groups':
            $id = Data::getData("id");
            if(isset($id)&&(!empty($id))) {
                $bookmark = Data::getData("bookmark");
                if(isset($bookmark)&&(!empty($bookmark))) {
                    switch($bookmark) {
                        case 'students': $view->chooseView('groupStudents'); break;
                        case 'subjects': $view->chooseView('groupSubjects'); break;
                    }
                }
                else
                    $view->chooseView('groupStudents');
            }
            else {
                $view->chooseView('groups');
            }
            break;
        case 'noteCategories': $view->chooseView('noteCategories'); break;
    }
}

//echo $_SERVER['REQUEST_URI']."<br />";

//$controller = $router->chooseController();
//$controller->getView();


require_once("footer.php");
?>