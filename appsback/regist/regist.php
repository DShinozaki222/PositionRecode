<?php
require '../utilities/sql-helper.php';

function regist(string $mail, string $storeName, int $favorite, float $evaluation, float $latitude, float $longitude, string $country, string $countryCode, string $county, string $neighbourhood, string $postcode, string $province, string $town, string $city, string $note) {
    $query = 'INSERT INTO Store (StoreName, User, Latitude, Longitude, Favorite, Evaluation, Country, CountryCode, County, Neighbourhood, Postcode, Province, Town, City, Note, RegistDate) VALUES (:storename, :mail, :lat, :lng, :favorite, :evaluation, :country, :countryCode, :county, :neighbourhood, :postcode, :province, :town, :city, :note, :registAt);';
    $now = new DateTime();
    $bindArray = [
        ':storename' => $storeName,
        ':mail' => $mail, 
        ':lat' => $latitude, 
        ':lng' => $longitude,
        ':favorite' => $favorite,
        ':evaluation' => $evaluation,
        ':country' => $country,
        ':countryCode' => $countryCode,
        ':county' => $county,
        ':neighbourhood' => $neighbourhood,
        ':postcode' => $postcode,
        ':province' => $province,
        ':town' => $town,
        ':city' => $city,
        ':note' => $note,
        ':registAt' =>  $now->format('Y-m-d H:i:s')];
    $sql = new SqlHelper();
    // var_dump($bindArray);
    $result = $sql->execute($query, $bindArray);
    // var_dump($result);
    return $result;
}

function select(string $mail) {
    $query = 'SELECT id, StoreName, User, Latitude, Longitude, Favorite, Evaluation, Country, CountryCode, County, Neighbourhood, Postcode, Province, Town, City, Note, RegistDate FROM Store WHERE User = :mail ORDER BY RegistDate DESC;';
    $bindArray = [':mail' => $mail];
    $sql = new SqlHelper();
    $result = $sql->fetchAll($query, $bindArray);
    // var_dump($result);
    return $result['fetches'][0];
}

header('Content-Type: application/json; charset=UTF-8; Access-Control-Allow-Origin: *');
$response = [
    'id' => 0, 
    'storeName' => '', 
    'latitude' => 0, 
    'longitude' => 0, 
    'favorite' => 0, 
    'evaluation' => 0, 
    'country' => '',
    'countryCode' => '',
    'county' => '',
    'neighbourhood' => '',
    'postcode' => '',
    'province' => '',
    'town' => '',
    'city' => '',
    'note' => '',
    'registAt' => ''];
try {
    if (!$_POST['regist']) {
        throw new Exception('Not Exsit Post Data');
    }
    $post = json_decode($_POST['regist'], true);
    $storeName = "";
    $county = "";
    $city = "";
    $town = "";
    $neighbourhood = "";
    $note = "";
    $countryCode = "";
    if ($post['storeName']) {
        $storeName = $post['storeName'];
    }
    if ($post['county']) {
        $county = $post['county'];
    }
    if ($post['city']) {
        $city = $post['city'];
    }
    if ($post['town']) {
        $town = $post['town'];
    }
    if ($post['neighbourhood']) {
        $neighbourhood = $post['neighbourhood'];
    }
    if ($post['note']) {
        $note = $post['note'];
    }
    if ($post['countryCode']) {
        $countryCode = $post['countryCode'];
    }

    $registResult = regist(
        $post['mail'],
        $storeName,
        $post['favorite'],
        $post['evaluation'],
        $post['lat'], 
        $post['lng'], 
        $post['country'],
        $countryCode,
        $county,
        $neighbourhood,
        $post['postcode'],
        $post['province'],
        $town,
        $city,
        $note,
    );
    
    if ($registResult['result']) {
        $selectResult = select($post['mail']);
        $response = [
            'id' => $selectResult['id'], 
            'storeName' => $selectResult['StoreName'], 
            'latitude' => $selectResult['Latitude'], 
            'longitude' => $selectResult['Longitude'], 
            'favorite' => $selectResult['Favorite'], 
            'evaluation' => $selectResult['Evaluation'], 
            'country' => $selectResult['Country'],
            'countryCode' => $selectResult['CountryCode'],
            'county' => $selectResult['County'],
            'neighbourhood' => $selectResult['Neighbourhood'],
            'postcode' => $selectResult['Postcode'],
            'province' => $selectResult['Province'],
            'town' => $selectResult['Town'],
            'city' => $selectResult['City'],
            'note' => $selectResult['Note'],
            'registAt' => $selectResult['RegistDate']
        ];
    }    
} catch (Exception $e) {
    echo ($e->getMessage());
}
echo json_encode($response, JSON_PRETTY_PRINT);
?>