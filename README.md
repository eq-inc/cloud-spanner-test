# Test of Cloud Spanner
Cloud Spanner を Node.js から操作するテストを行った際のソースコードです。


## 使い方
### 1. サービスアカウントキーを取得と設定
Cloud Spanner の API にアクセスするにはサービスアカウントキーが必要です。

[Cloud Spanner Client Libraries](https://cloud.google.com/spanner/docs/reference/libraries?hl=ja) のページなどを参考に、サービスアカウントキーを取得してください。

また「**GOOGLE_APPLICATION_CREDENTIALS**」という環境変数に、取得した JSON ファイルへのパスを設定します。

---

### 2. インスタンスと、データベースの作成
[Google Cloud Console](https://console.cloud.google.com/?hl=ja) のサイトにアクセスし Cloud Spanner のインスタンスと、データベースを作成します。

データベースを作成する際は「データベーススキーマの定義」の項目で「テキストとして編集」を ON にして「./schema/schema.ddl」の内容を入力してください。

---

### 3. 設定ファイルの変更
「./config/default.ts」を開いて「_project_id_」、「_instance_id_」、「_database_id_」の各項目を、環境に合わせて設定してください。

---

### 4. テストデータの投入
データベースにテスト用のデータを投入します。
この「README.md」ファイルがあるディレクトリで、次のコマンドを実行してください。

```bash
npm run init
```

---

### 5. テストの実行
この「README.md」ファイルがあるディレクトリで、次のコマンドでテストを実行します。

```bash
npm test
```

---

### 6. Cloud Spanner インスタンスの削除
一通りテストを行ったら [Google Cloud Console](https://console.cloud.google.com/?hl=ja) から Cloud Spanner のインスタンスを削除しておきましょう。

Cloud Spanner には、日本リージョンでは 2018 年 07 月の時点ではインスタンスだけで 1.17 USD / Node / hour の料金が発生します。

必要が無くなったインスタンスは、早めに削除することをおすすめします。
もし、インスタンスを消し忘れて高額な請求がきたとしても、一切の責任を負いません。

