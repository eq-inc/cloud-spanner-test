CREATE TABLE members (
    member_id STRING(36),
    email     STRING(255),
    password  STRING(64)
) PRIMARY KEY(member_id);

CREATE TABLE profiles (
    member_id STRING(36),
    name      STRING(64) NOT NULL,
    kana      STRING(64),
    age       INT64,
    birthday  STRING(5),
    units      Array<STRING(36)>,
) PRIMARY KEY(member_id), INTERLEAVE IN PARENT members ON DELETE CASCADE;

CREATE TABLE units (
    unit_id STRING(36),
    name STRING(64)
) PRIMARY KEY(unit_id);

