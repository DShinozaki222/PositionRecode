<?php
require '../utilities/sql-helper.php';

function userCheck(string $mail, string $password) {
    $query = 'SELECT MailAddress, UserName FROM User WHERE MailAddress = :mail and Password = :password';
    $bindArray = [':mail' => $mail, ':password' => sha1($password)];

    $sql = new SqlHelper();
    $fetchResult = $sql->fetchAll($query, $bindArray);

    $result = ['result' => false, 'username' => '', 'mail' => ''];
    // foreach($fetchResult['fetches'] as $f) {
    //     foreach($f as $i) {
    //         print($i);
    //     }
    // }
    // var_dump($fetchResult);
    if ($fetchResult['result'] && count($fetchResult['fetches'])) {
        $result['result'] = $fetchResult['result'];
        $result['mail'] = $fetchResult['fetches'][0]['MailAddress'];
        $result['username'] = $fetchResult['fetches'][0]['UserName'];
    }
    return $result;
}

header('Content-Type: application/json; charset=UTF-8; Access-Control-Allow-Origin: *');

$response = ['result' => false, 'username' => '', 'message' => '', 'mail' => ''];

try {
    if (!$_POST['user']) {
        throw new Exception('Not Exsit Post Data');
    }
    $post = json_decode($_POST['user'], true);
    $mail = $post['mail'];
    $password = $post['password'];

    $result = userCheck($mail, $password);
    $response['result'] = $result['result'];
    $response['username'] = $result['username'];
    $response['mail'] = $result['mail'];
} catch (Exception $e) {
    $response['message'] = $e->getMessage();
}
echo json_encode($response, JSON_PRETTY_PRINT);
?>