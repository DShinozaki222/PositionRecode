# PositionRecoder
### 目次
 - アプリの概要
 - アプリ作成の背景
 - アプリの構成
 - 開発環境(ツール)
 - ディレクトリの説明
 - 開発時のセットアップ
 - ビルド時のコマンド

### アプリの概要
 - お気に入りのお店や場所を記録する
 - 行ったお店の評価や感想を書き留める
 - 自分だけの食べログ的なアプリ

### アプリ作成の背景
 - ふとお腹が空いたときに、行きたいお店が思いつかないことがある
 - たまたま見つけたお店をあとから行こうと思っても忘れてしまう
 - 食べログの評価が高いところに行っても、口に合わないことがあり、記録しておきたい
 - お店のリストを作って自己満足に浸りたい

### アプリの構成
本アプリはWEBアプリとなっている。  
デプロイ先はレンタルサーバやクラウド（サーバレスも対応）を想定。  
以下、フレームワークや開発言語などを記載する。
##### 構成要素
 - フロントエンド
 - バックエンド
##### フロントエンド
 - Angular
 - V.16
##### バックエンド
 - PHP 7.4.8(フレームワークは不使用) 

### 開発環境(ツール)
 - Ubuntu 22.04
 - Docker(Docker Compose)
 - Apache 
 - MySQL V.8
 - Nodejs V.16.17.0
 - Git

### ディレクトリの説明
 - appsback  
   バックエンドのPHPのソース
 - config
   MySQL、PHPの設定ファイル
 - position-recode
   Angularのプロジェクト
 - sql
   テーブル作成のSQLファイル

### 開発時のセットアップ
 1. コンテナの準備
    以下のコマンドを実行する。  
    ``` docker-compose up -d ```  
 2. htmlディレクトを作成
    Javascript、PHPが実行するhtmlディレクトリをリポジトリ内に作成  
    ※htmlディレクトリはリポジトリに含めないこと  
 4. MySQLにデータベースを作成  
    データベース名は任意（PositionRecoderなど)
 5. sqlディレクトリ内のsqlファイルを実行しテーブル作成
 6. appsback > utilities > sql-helper.phpを編集  
    MySQLに接続する属性のdbname、host、username、passwordを変更する
 7. node-moduleのインストール  
    position-recodeディレクトリに移動し、以下のコマンドを実行する  
    ``` npm install ```

### ビルド時のコマンド
 - Angularのビルドコマンド  
   開発環境へのデプロイするときのビルド  
   ``` ng build -c development --base-href=/apps/ ```  
   本番環境へのデプロイするときのビルド  
   ``` ng build -c production --base-href=/apps/ ```  
