<?php

class View {

    //Załadowanie widoku (szablonu HTML)
    public function display($templateName) {
        include(PROJECT_DIRECTORY."templates".DIRECTORY_SEPARATOR .$templateName.".php");
    }

}
?>