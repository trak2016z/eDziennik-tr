<?php

$doc_root = $_SERVER['DOCUMENT_ROOT'];
if(file_exists("{$doc_root}./Repositories/eDziennik/web/config.php")) {
    require_once("{$doc_root}./Repositories/eDziennik/web/config.php");
}

class Database
{

    //Zmienna przechowuj?ca uchwyt do po??czenia z baz? danych
    private static $_conn = null;
    private $_pdo;

    //Konstruktor ustanawiaj?cy po??czenie z baz? danych
    public function __construct()
    {
        try {
            $this->_pdo = new PDO(DSN, USER, PASSWORD);
            $this->_pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        } catch (PDOException $e) {
          //  LogFile::AddLog("B??d po??czenia z baz?!: " . $e->getMessage(), __LINE__, __FILE__);
            die();
        }
    }

    //Metoda do pobierania uchwytu do bazy danych
    static public function getInstance()
    {
        try {
            if (!isset(self::$_conn)) {
                self::$_conn = new Database();
            }
            return self::$_conn;
        } catch (PDOException $e) {
            //  LogFile::AddLog("B??d: " . $e->getMessage(), __LINE__, __FILE__);
            return false;
        }
    }


    //Metoda do pobierania danych z bazy
    public function selectData($sql)
    {
        $result = $this->_pdo->query($sql);
        $resArray = Array();
        while ($row = $result->fetch(PDO::FETCH_ASSOC)) {
            $resArray[] = $row;
        }
        if (count($resArray) > 0) {
            return $resArray;
        } else {
            // LogFile::AddLog("B??d: Zapytanie zwróci?o pusty wynik", __LINE__, __FILE__);
            return false;
        }
    }

    //Metoda do wstawiania danych do bazy
    public function insertData($table, $data)
    {
        $ins = "INSERT INTO `{$table}` ";
        $ins .= "(";
        foreach ($data as $key => $val) {
            $ins .= $key . ",";
        }
        $ins = rtrim($ins, ',');
        $ins .= ") ";
        $ins .= "VALUES ";
        $ins .= "(";
        foreach ($data as $val) {
            $ins .= "'" . $val . "',";
        }
        $ins = rtrim($ins, ',');
        $ins .= ")";
        $finallQuery = $this->_pdo->query($ins);
        if ($finallQuery) {
            return true;
        } else {
            // LogFile::AddLog("B??d: Wstawienie nowego elementu do bazy danych zako?czy?o si? niepowodzeniem.", __LINE__, __FILE__);
            return false;
        }
    }

    //Metoda do wstawiania danych do bazy
    public function insertMultipleData($table, $columnsNames, $data)
    {
        $ins = "INSERT INTO `{$table}` ";
        $ins .= "(";
        foreach ($columnsNames as $name) {
            $ins .= $name . ", ";
        }

        $ins = rtrim($ins, ', ');
        $ins .= ") ";
        $ins .= "VALUES ";
        foreach ($data as $key => $val) {
            $ins .= "(";
            foreach ((array)$val as $k => $v) {
                $ins .= "'" . $v . "',";
            }
            $ins = rtrim($ins, ',');
            $ins .= "), ";
        }
        $ins = rtrim($ins, ', ');
        $finallQuery = $this->_pdo->query($ins);
        if ($finallQuery) {
            return true;
        } else {
          //  LogFile::AddLog("B??d: Wstawienie elementów do bazy danych zako?czy?o si? niepowodzeniem.", __LINE__, __FILE__);
            return false;
        }
    }

    //Metoda do aktualizacji danych
    public function updateData($table, $set, $where = Array(), $oper = "")
    {
        $upd = "UPDATE `{$table}` SET ";
        foreach ($set as $key => $val) {
            $upd .= $key . "='" . $val . "',";
        }
        $upd = rtrim($upd, ',');
        if (count($where) > 0) {
            $upd .= " WHERE ";
            foreach ($where as $key => $val) {
                $upd .= $key . "='" . $val . "' " . $oper . " ";
            }
            $upd = substr($upd, 0, strlen($upd) - (strlen($oper) + 2));
        }
        $finallQuery = $this->_pdo->query($upd);
        if ($finallQuery) {
            return true;
        } else {
           // LogFile::AddLog("B??d: Zapytanie bazodanowe UPDATE nie wykona?o si? poprawnie.", __LINE__, __FILE__);
            return false;
        }
    }

    //Metoda do usuwania danych, przyjmuj?ca jako parametr jednowymiarow? tablic?
    public function delete($table, $where = Array(), $oper = "")
    {
        $del = "DELETE FROM `{$table}` ";
        if (count($where) > 0) {
            $del .= "WHERE ";

            foreach ($where as $key => $val) {
                $del .= $key . " = '" . $val . "' " . $oper . " ";
            }
            $del = substr($del, 0, strlen($del) - (strlen($oper) + 2));
        }
        $finallQuery = $this->_pdo->query($del);
        if ($finallQuery) {
            return true;
        } else {
           // LogFile::AddLog("B??d: Usuni?cie elementu bazy danych by?o niemo?liwe do zrealizowania.", __LINE__, __FILE__);
            return false;
        }
    }

    //Metoda do usuwania danych, przyjmuj?ca jako parametr wielowymiarow? tablic?
    public function deleteData($table, $where = Array(), $oper = "")
    {
        $del = "DELETE FROM `{$table}` ";
        if (count($where) > 0) {
            $del .= "WHERE ";

            foreach ($where as $key => $val) {
                foreach ($val as $k => $v) {
                    $del .= $k . " = '" . $v . "' " . $oper . " ";
                }
            }
            $del = substr($del, 0, strlen($del) - (strlen($oper) + 2));
        }
        $finallQuery = $this->_pdo->query($del);
        if ($finallQuery) {
            return true;
        } else {
          //  LogFile::AddLog("B??d: Usuni?cie elementu bazy danych by?o niemo?liwe do zrealizowania.", __LINE__, __FILE__);
            return false;
        }
    }
}

?>