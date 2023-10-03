<?php
require '../utilities/sql-helper.php';

function select(string $mail) {
    $query = 'SELECT id, storeName, Latitude, Longitude, Favorite, Evaluation, Country, CountryCode, County, Neighbourhood, Postcode, Province, Town, City, Note, RegistDate FROM Store WHERE User = :mail';
    $bindArray = [':mail' => $mail];
    $sql = new SqlHelper();
    $result = $sql->fetchAll($query, $bindArray);
    $stores = [];
    if (!$result['result']) {
        return $stores;
    }

    foreach ($result['fetches'] as $fetch) {
        $store = [
            'id' => $fetch['id'], 
            'storeName' => $fetch['storeName'], 
            'latitude' => $fetch['Latitude'], 
            'longitude' => $fetch['Longitude'],
            'favorite' => $fetch['Favorite'],
            'evaluation' => $fetch['Evaluation'],
            'country' => $fetch['Country'],
            'countryCode' => $fetch['CountryCode'],
            'county' => $fetch['County'],
            'neighbourhood' => $fetch['Neighbourhood'],
            'postcode' => $fetch['Postcode'],
            'province' => $fetch['Province'],
            'town' => $fetch['Town'],
            'city' => $fetch['City'],
            'note' => $fetch['Note'],
            'registAt' => $fetch['RegistDate']
        ];
        $stores[] = $store;
    }
    return $stores;
}

header('Content-Type: application/json; charset=UTF-8; Access-Control-Allow-Origin: *');
$stores = [];
try {
    if (!$_POST['user']) {
        throw new Exception('Not Exsit Post Data');
    }
    $post = json_decode($_POST['user'], true);
    $stores = select($post['mail']);
} catch (Exception $e) {
    echo $e->getMessage();
}
echo json_encode($stores, JSON_PRETTY_PRINT);
?>