<?php
session_start();
require_once("config.php");
require_once("loader.php");
require_once("header.php");


$router = new Router($_SERVER['REQUEST_URI']);
$router->checkUrl();
$controller = $router->checkParameters();
var_dump($controller);
if(isset($_SESSION))
    var_dump($_SESSION);
//Pobranie zmiennej z adresu URL

/*if(isset($controller)&&(!empty($controller))) {
    //Wyœwietlenie odpowiedniego widoku
    switch($controller) {
        case 'register': $view->chooseView('register'); break;
        case 'login':
                            $view->chooseView('login'); break;
        case 'teachers': $view->chooseView('teachers'); break;
        case 'subjects': $view->chooseView('subjects'); break;
        case 'groups':
            $id = Data::getData("id");
            $ids = Data::getData("ids");
            if(isset($id)&&(!empty($id))) {
                $bookmark = Data::getData("bookmark");
                if(isset($bookmark)&&(!empty($bookmark))) {
                    switch($bookmark) {
                        case 'students':
                            if(isset($ids)&&(!empty($ids)))
                                $view->chooseView('studentNotes');
                            else
                                $view->chooseView('groupStudents'); break;
                        case 'subjects':
                            if(isset($ids)&&(!empty($ids)))
                                $view->chooseView('groupNotes');
                            else
                                $view->chooseView('groupSubjects'); break;
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
    }*/
//}




require_once("footer.php");
?>