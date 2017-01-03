<?php

class View {

    //Za³adowanie widoku (szablonu HTML)
    public function display($templateName) {
        include(PROJECT_DIRECTORY."templates".DIRECTORY_SEPARATOR .$templateName.".php");
    }

}
?>