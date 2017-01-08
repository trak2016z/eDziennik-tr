<?php

class Validation {

    private static $patterns = [
        'nameSurname' => '/^[A-Z¯¥ÊÆÑŒ£Ó][a-zŸ¿¹êœæñó³]{1,19}$/',
        'login' => '/^[A-Za-z][A-Za-z0-9_]{7,31}$/',
        'password' => '/^([A-Za-z0-9#@*!&$_]){8,32}$/',
       // 'groupName' => '/^[A-Z¯¥ÊÆÑŒ£Óa-zŸ¿¹êœæñó³0-9_\s]{1,20}$/',
        'groupName' => '/^[0-9_\pL\s]{1,20}$/u',
       // 'subjectName' => '/^[A-Z¯¥ÊÆÑŒ£Ó][a-zŸ¿¹êœæñó³0-9_\s]{1,19}$/',
        'subjectName' => '/^[0-9_\pL\s]{1,20}$/u',
        //'noteCategoryName' => '/^[A-Z¯¥ÊÆÑŒ£Óa-zŸ¿¹êœæñó³0-9_\s]{1,20}$/'
        'noteCategoryName' => '/^[0-9_\pL\s]{1,20}$/u',
        'note' => '/^[1-6]$/'
    ];

    public static function checkPatternCompatibility($patternName, $value) {
        return preg_match(self::$patterns[$patternName], $value);
    }

    public static function checkPasswordEquality($value1, $value2) {
        return ($value1 == $value2);
    }

    public static function isId($value) {
        return is_numeric($value);
    }
}

?>