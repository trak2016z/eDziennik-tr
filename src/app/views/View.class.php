<?php

class View {

    //Za³adowanie widoku (szablonu HTML)
    public function display($templateName) {
        include(PROJECT_DIRECTORY."src".DIRECTORY_SEPARATOR ."app".DIRECTORY_SEPARATOR ."templates".DIRECTORY_SEPARATOR .$templateName.".php");
    }

}
?>