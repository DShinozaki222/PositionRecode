<?php
require '../utilities/sql-helper.php';

function regist(string $mail, float $latitude, float $longitude, string $country, string $countryCode, string $county, string $neighbourhood, string $postcode, string $province, string $town, string $city) {
    $query = 'INSERT INTO Store (User, Latitude, Longitude, Country, CountryCode, County, Neighbourhood, Postcode, Province, Town, City, RegistDate) VALUES (:mail, :lat, :lng, :country, :countryCode, :county, :neighbourhood, :postcode, :province, :town, :city, :registAt);';
    $now = new DateTime();
    $bindArray = [
        ':mail' => $mail, 
        ':lat' => $latitude, 
        ':lng' => $longitude, 
        ':country' => $country,
        ':countryCode' => $countryCode,
        ':county' => $county,
        ':neighbourhood' => $neighbourhood,
        ':postcode' => $postcode,
        ':province' => $province,
        ':town' => $town,
        ':city' => $city,
        ':registAt' =>  $now->format('Y-m-d H:i:s')];
    $sql = new SqlHelper();
    // var_dump($bindArray);
    $result = $sql->execute($query, $bindArray);
    // var_dump($result);
    return $result;
}

function idSelect(string $mail) {
    $query = 'SELECT id, RegistDate FROM Store WHERE User = :mail ORDER BY RegistDate DESC;';
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
    if (!$_POST['location']) {
        throw new Exception('Not Exsit Post Data');
    }
    $post = json_decode($_POST['location'], true);
    $county = "";
    $city = "";
    $town = "";
    $neighbourhood = "";
    $countryCode = "";

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
    if ($post['countryCode']) {
        $countryCode = $post['countryCode'];
    }

    $registResult = regist(
        $post['mail'],
        $post['lat'], 
        $post['lng'], 
        $post['country'],
        $countryCode,
        $county,
        $neighbourhood,
        $post['postcode'],
        $post['province'],
        $town,
        $city
    );
    
    if ($registResult['result']) {
        $selectResult = idSelect($post['mail']);
        $response['id'] = $selectResult['id'];
        $response['registAt'] = $selectResult['RegistDate'];
    }    
} catch (Exception $e) {
    echo ($e->getMessage());
}
echo json_encode($response, JSON_PRETTY_PRINT);
?>