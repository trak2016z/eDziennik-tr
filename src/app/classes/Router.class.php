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
        if(LoginController::checkAuthentication($controllerName)&&LoginController::checkAuthorization($controllerName)) {
            $controllerName = ucwords($controllerName) . "Controller";
            if (file_exists(PROJECT_DIRECTORY . "src" . DIRECTORY_SEPARATOR . "app" . DIRECTORY_SEPARATOR . "controllers" . DIRECTORY_SEPARATOR . $controllerName . ".class.php")) {
                return new $controllerName();
            } else {
                header("HTTP/1.0 404 Not Found");
                echo "404";
            }
        }
        else
            echo "Zaloguj siê";
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

/*  //Wybór kontrolera na podstawie zmiennej w adresie URL
  public function chooseController() {

      //$groupId = Data::getData("groupId");
      $this->checkParameters();

      if($bookmark) {
          $controllerType = ($bookmark == 'students')?"groupStudents":"groupSubjects";
          if($id) {
              return $this->createController(($controllerType == "groupStudents")?"studentNotes":"groupNotes");
          }
          return $this->createController($controllerType);
      }
      else if($controller)
          return $this->createController($controller);
  }*/
?>
