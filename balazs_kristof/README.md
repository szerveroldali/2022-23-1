# Balázs Kristóf gyakorlatai
Esti 3. és 4. csoport, csütörtök 19:30-21:00

## Laravel - Blog

A Laravel gyakorlatok alatt az alábbi leírás szerinti blogot fogjuk elkészíteni.

### Leírás

A projekt egy alapvető blogot valósít meg, amelybe a felhasználók regisztrálhatnak, majd kategóriákat, később a kategóriákhoz bejegyzéseket hozhatnak létre. A bejegyzések megtekinthetők, kategória szerint rendezhetők, kereshetők. A bejegyzésekhez lehetőség van hozzászólni, amennyiben ezt a bejegyzés beállításai lehetővé teszik.

### Modellek

- __User__
  - id
  - name (string)
  - email (string)
  - email_verified_at (timestamp)
  - password (string)
  - is_admin (boolean)
  - remember_token
  - timestamps

- __Category__
  - id
  - name (string)
  - style (enum: primary, secondary, success, danger, warning, info, light, dark)
  - timestamps

- __Post__
  - id
  - user_id (először elég egy string)
  - title (string)
  - text (text)
  - attachment_hash_name (string)
  - attachment_original_name (string)
  - comments_enabled (boolean, default true)
  - published (boolean, default true)
  - timestamps

- __Comment__
  - id
  - user_id
  - post_id
  - text
  - timestamps

### Relációk
- User 1 --> N Post
- Post N <-> N Category
- Post 1 --> N Comment
- User 1 --> N Comment