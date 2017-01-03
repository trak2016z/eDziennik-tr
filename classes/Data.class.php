<?php

class Data {

    //Pobranie danych z tablicy superglobalnej
    static public function getData($fieldName) {
        if(isset($_GET[$fieldName])&&!empty($_GET[$fieldName]))
            return $_GET[$fieldName];
        else if(isset($_POST[$fieldName])&&!empty($_POST[$fieldName]))
            return $_POST[$fieldName];
        return false;
    }
}
?>