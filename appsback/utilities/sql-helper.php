<?php
class SqlHelper {

    private string $dsn = 'mysql:dbname=go-fag_position-recoder;host=mysql57.go-fag.sakura.ne.jp;charset=utf8';
    private string $username = 'go-fag';
    private string $password = 'dell0212';

    function __construct() {}

    public function execute(string $query, array $bindArray) {
        $resultArray = ['result' => false, 'message' => ''];
        try {
            $pdo = new PDO($this->dsn, $this->username, $this->password);
            $stmt = $pdo->prepare($query);
            $result = $stmt->execute($bindArray);
            if (!$result) {
                throw new Exception('SQL Execute Failure');
            }
            $resultArray['result'] = $result;

        } catch(Exception $e) {
            $resultArray['message'] = $e->getMessage();
        } 
        return $resultArray;
    }
    public function fetchAll(string $query, array $bindArray) {
        $resultArray = ['result' => false, 'message' => '', 'fetches' => []];
        try {
            $pdo = new PDO($this->dsn, $this->username, $this->password);
            $stmt = $pdo->prepare($query);
            $result = $stmt->execute($bindArray);
            if (!$result) {
                throw new Exception('SQL Execute Failure');
            }

            $resultArray['fetches'] = $stmt->fetchAll(PDO::FETCH_ASSOC);
            $resultArray['result'] = $result;
        } catch (Exception $e) {
            $resultArray['message'] = $e->getMessage();
        }
        return $resultArray;
    }
}
?>
