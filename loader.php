
<?php
function loadClasses($className) {
if(file_exists(PROJECT_DIRECTORY."classes".DIRECTORY_SEPARATOR .$className.".class.php"))
require_once(PROJECT_DIRECTORY."classes".DIRECTORY_SEPARATOR .$className.".class.php");
}

function loadModels($modelName) {
if(file_exists(PROJECT_DIRECTORY."models".DIRECTORY_SEPARATOR .$modelName.".class.php"))
require_once(PROJECT_DIRECTORY."models".DIRECTORY_SEPARATOR .$modelName.".class.php");
}

function loadControllers($controllerName) {
if(file_exists(PROJECT_DIRECTORY."controllers".DIRECTORY_SEPARATOR .$controllerName.".class.php"))
require_once(PROJECT_DIRECTORY."controllers".DIRECTORY_SEPARATOR .$controllerName.".class.php");
}

function loadView($viewName) {
if(file_exists(PROJECT_DIRECTORY."views".DIRECTORY_SEPARATOR .$viewName.".class.php"))
require_once(PROJECT_DIRECTORY."views".DIRECTORY_SEPARATOR .$viewName.".class.php");
}


spl_autoload_register('loadClasses');
spl_autoload_register('loadModels');
spl_autoload_register('loadControllers');
spl_autoload_register('loadView');
?>