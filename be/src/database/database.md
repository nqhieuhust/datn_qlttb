ALTER TABLE users
ADD status tinyint Default -1;

ALTER TABLE devices
ADD status tinyint Default -1;


ALTER TABLE devices
ADD department_id int Default 0;