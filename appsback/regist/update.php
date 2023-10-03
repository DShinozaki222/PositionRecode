<?php
require '../utilities/sql-helper.php';

function update(int $id, string $storeName, int $favorite, float $evaluation, float $latitude, float $longitude, string $country, string $countryCode, string $county, string $neighbourhood, string $postcode, string $province, string $town, string $city, string $note)
{
    $query = 'UPDATE Store SET StoreName = :storename, Latitude = :lat, Longitude = :lng, Favorite = :favorite, Evaluation = :evaluation, Country = :country, CountryCode = :countryCode, County = :county, Neighbourhood = :neighbourhood, Postcode = :postcode, Province = :province, Town = :town, City = :city, Note = :note, UpdateAt = :updateAt WHERE id = :id;';
    $now = new DateTime();
    $bindArray = [
        ':id' => (int) $id,
        ':storename' => $storeName,
        ':lat' => (float) $latitude,
        ':lng' => $longitude,
        ':favorite' => (int) $favorite,
        ':evaluation' => (float) $evaluation,
        ':country' => $country,
        ':countryCode' => $countryCode,
        ':county' => $county,
        ':neighbourhood' => $neighbourhood,
        ':postcode' => $postcode,
        ':province' => $province,
        ':town' => $town,
        ':city' => $city,
        ':note' => $note,
        ':updateAt' => $now->format('Y-m-d H:i:s')
    ];
    $sql = new SqlHelper();
    // var_dump($bindArray);
    $result = $sql->execute($query, $bindArray);
    // var_dump($result);
    return $result;
}

function select(int $id)
{
    $query = 'SELECT id, StoreName, User, Latitude, Longitude, Favorite, Evaluation, Country, CountryCode, County, Neighbourhood, Postcode, Province, Town, City, Note, RegistDate, UpdateAt FROM Store WHERE id = :id;';
    $bindArray = [':id' => $id];
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
    'registAt' => ''
];

try {
    $parameter = array();
    parse_str(file_get_contents('php://input'), $parameter);
    if (Count($parameter) == 0) {
        throw new Exception('Not Exsit Put Data');
    }
    $put = json_decode($parameter['update'], true);
    $storeName = "";
    $county = "";
    $city = "";
    $town = "";
    $neighbourhood = "";
    $note = "";
    $countryCode = "";
    if ($put['storeName']) {
        $storeName = $put['storeName'];
    }
    if ($put['county']) {
        $county = $put['county'];
    }
    if ($put['city']) {
        $city = $put['city'];
    }
    if ($put['town']) {
        $town = $put['town'];
    }
    if ($put['neighbourhood']) {
        $neighbourhood = $put['neighbourhood'];
    }
    if ($put['note']) {
        $note = $put['note'];
    }
    if ($put['countryCode']) {
        $countryCode = $put['countryCode'];
    }

    $updateResult = update(
        $put['id'],
        $storeName,
        $put['favorite'],
        $put['evaluation'],
        $put['lat'], 
        $put['lng'], 
        $put['country'],
        $countryCode,
        $county,
        $neighbourhood,
        $put['postcode'],
        $put['province'],
        $town,
        $city,
        $note,
    );

    if ($updateResult['result']) {
        $selectResult = select($put['id']);
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