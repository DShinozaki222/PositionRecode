<?php
require '../utilities/sql-helper.php';

function userCheck(string $mail) {
    $query = 'SELECT MailAddress FROM User WHERE MailAddress = :mail;';
    $bindArray = [':mail' => $mail];

    $sql = new SqlHelper();
    $fetchResult = $sql->fetchAll($query, $bindArray);

    $result = ['result' => true, 'isExsit' => true];

    if (!$fetchResult['result']) {
        $result = ['result' => false, 'isExsit' => false];
        return $result;
    }
    // var_dump($fetchResult);
    if (count($fetchResult['fetches']) == 0) {
        $result['isExsit'] = false;
    }
    return $result;
}

function userRegist(string $name, string $mail, string $password) {
    $query = 'INSERT INTO User(MailAddress, UserName, Password, RegistDate) Values(:mail, :name, :password, :registAt)';
    $now = new DateTime();
    $bindArray = [':mail' => $mail, ':name' => $name, ':password' => sha1($password), 'registAt' => $now->format('Y-m-d H:i:s')];
    
    $sql = new SqlHelper();
    $result = $sql->execute($query, $bindArray);
    // var_dump($result);
    return $result;
}

header('Content-Type: application/json; charset=UTF-8; Access-Control-Allow-Origin: *');

$response = ['result' => false, 'username' => '', 'message' => '', 'mail' => ''];

try {
    if (!$_POST['regist']) {
        throw new Exception('Not Exsit Post Data');
    }
    $post = json_decode($_POST['regist'], true);
    $mail = $post['mail'];
    $password = $post['password'];
    $name = $post['name'];

    $checkResult = userCheck($mail);
    if (!$checkResult['result']) {
        throw new Exception('SELECT SQL Execute Failure');
    }
    if ($checkResult['isExsit']) {
        throw new Exception('Exsit User');
    } 

    $registResult = userRegist($name, $mail, $password);
    if (!$registResult['result']) {
        throw new Exception('INSERT SQL Execute Failure');
    }
    $response = ['result' => true, 'username' => $name, 'message' => '', 'mail' => $mail];
} catch(Exception $e) {
    $response['message'] = $e->getMessage();
}
echo json_encode($response, JSON_PRETTY_PRINT);
?>