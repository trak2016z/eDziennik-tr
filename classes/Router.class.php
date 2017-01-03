<?php

class Router {

    private $url;

    public function __construct($url) {
        $this->url = $url;
    }

    //Walidacja URL - a
    public function checkUrl() {
        return filter_var($this->url, FILTER_VALIDATE_URL);
    }

    //Utworzenie kontrolera
    public function createController($controllerName) {
        if(LoginController::checkAuthentication($controllerName)) {
            if(LoginController::checkAuthorization($controllerName)) {
                $controllerName = ucwords($controllerName) . "Controller";
                if (file_exists(PROJECT_DIRECTORY. "controllers" . DIRECTORY_SEPARATOR . $controllerName . ".class.php")) {
                    return new $controllerName();
                } else {
                    header("HTTP/1.0 404 Not Found");
                    echo "404";
                }
            }
            else
                echo "Nie masz uprawnień do wyświetlenia tej strony";
        }
        else
            echo "Zaloguj się";
    }

    public function checkBookmarkParameter($bookmarkValue) {
        $bookmarkType = ($bookmarkValue == 'students') ? "groupStudents" : "groupSubjects";
        return $this->checkIdParameter($bookmarkType);
    }

    public function checkParameters() {
        $controller = Data::getData("option");
        $bookmark = Data::getData("bookmark");
        if($bookmark)
            $this->checkBookmarkParameter($bookmark);
        else if($controller)
            return $this->createController($controller);
    }

    public function checkIdParameter($bookmarkType) {
        $id = Data::getData("id");
        if($id)
            return $this->createController(($bookmarkType == "groupStudents")?"studentNotes":"groupNotes");
        return $this->createController($bookmarkType);
    }
}

?>
