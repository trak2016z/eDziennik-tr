<?php

    class BasicController {

         protected $view;

         public function getView($templateName) {
            $this->view->display($templateName);
         }
    }
?>