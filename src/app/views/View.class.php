<?php

class View {

    //Załadowanie widoku (szablonu HTML)
    public function chooseView($templateName) {
        include(PROJECT_DIRECTORY."src".DIRECTORY_SEPARATOR ."app".DIRECTORY_SEPARATOR ."templates".DIRECTORY_SEPARATOR .$templateName.".html");
    }

}
?>