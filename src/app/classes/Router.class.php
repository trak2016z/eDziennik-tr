<?php

class Router {

    private $url;

    public function __construct($url) {
        $this->url = $url;
    }

    public function checkUrl() {
        return filter_var($this->url, FILTER_VALIDATE_URL);
    }

    public function chooseController() {
        $controller = Data::getData("controller");
        if(isset($controller)&&(!empty($controller)))
            return $this->createController($controller);
        else
            return $this->createController("login");
    }

    public function createController($controllerName) {
        $controllerName = ucwords($controllerName)."Controller";
        if(file_exists(PROJECT_DIRECTORY."src".DIRECTORY_SEPARATOR ."app".DIRECTORY_SEPARATOR ."controllers".DIRECTORY_SEPARATOR .$controllerName.".class.php")) {
            return new $controllerName();
        }
        else {
            header("HTTP/1.0 404 Not Found");
            echo "404";
        }
    }

}

?>
