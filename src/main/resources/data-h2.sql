CREATE TABLE IF NOT EXISTS RANGE ( 
   id IDENTITY NOT NULL PRIMARY KEY , 
   tokenid VARCHAR(30) NOT NULL, 
   fromTime TIMESTAMP ,
   toTime TIMESTAMP
);
COMMIT;