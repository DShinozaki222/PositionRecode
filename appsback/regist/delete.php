<?php
require '../utilities/sql-helper.php';

function deleteStore($target) {
    $query = 'DELETE FROM Store WHERE id = :id';
    $bindArray = [':id' => (int) $target];
    $sql = new SqlHelper();
    $result = $sql->execute($query, $bindArray);
    return $result;
} 

header('Content-Type: application/json; charset=UTF-8; Access-Control-Allow-Origin: *');
$response = ['result' => false];

try {
    if (!$_GET['id']) {
        throw new Exception('Not Exsit Delete Data');
    }

    $deleteResult = deleteStore($_GET['id']);
    if ($deleteResult['result']) {
        $response['result'] = $deleteResult['result'];
    }
} catch(Exception $e) {
    echo ($e->getMessage());
}
echo json_encode($response, JSON_PRETTY_PRINT);
?>