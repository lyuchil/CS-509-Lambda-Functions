-- --------------------------------

DROP TABLE TheCS.SiteManager;

CREATE TABLE TheCS.SiteManager (
    SMUsername VARCHAR(50) NOT NULL PRIMARY KEY,
    SMPassword VARCHAR(100) NOT NULL,
    SMBalance DOUBLE DEFAULT 0.0
);

INSERT INTO TheCS.SiteManager (SMUsername, SMPassword)
VALUES ('SiteManager', 'SiteManagerPassword');

-- --------------------------------

DROP TABLE TheCS.Store;

CREATE TABLE TheCS.Store (
    StoreID CHAR(36) NOT NULL PRIMARY KEY,
    STName VARCHAR(50) NOT NULL UNIQUE,
    STLatitude DOUBLE NOT NULL,
    STLongitude DOUBLE NOT NULL,
    STUsername VARCHAR(50) NOT NULL UNIQUE,
    STPassword VARCHAR(100) NOT NULL,
    Balance DOUBLE DEFAULT 0.0,
    Profit DOUBLE DEFAULT 0.0,
    InventoryBalance DOUBLE DEFAULT 0.0
);

INSERT INTO TheCS.Store (StoreID, STName, STLatitude, STLongitude, STUsername, STPassword)
VALUES ('12345678-1234-1234-1234-123456789012', 'TheStore', 69.23421, -12.43212, 'TheStoreUsername', 'TheStorePassword');

INSERT INTO TheCS.Store (StoreID, STName, STLatitude, STLongitude, STUsername, STPassword)
VALUES ('12345678-1234-1234-1234-123456789013', 'TheStore2', 71.23421, -13.43212, 'TheStore2Username', 'TheStore2Password');

INSERT INTO TheCS.Store (StoreID, STName, STLatitude, STLongitude, STUsername, STPassword)
VALUES ('12345678-1234-1234-1234-123456789017', 'TheStore3', 71.23421, -13.43212, 'TheStore3Username', 'TheStore3Password');

INSERT INTO TheCS.Store (StoreID, STName, STLatitude, STLongitude, STUsername, STPassword)
VALUES ('12345678-1234-1234-1234-123456789018', 'TheStore4', 71.23421, -13.43212, 'TheStore4Username', 'TheStore4Password');

INSERT INTO TheCS.Store (StoreID, STName, STLatitude, STLongitude, STUsername, STPassword)
VALUES ('12345678-1234-1234-1234-123456789019', 'TheStore5', 71.23421, -13.43212, 'TheStore5Username', 'TheStore5Password');

-- --------------------------------

DROP TABLE TheCS.Computer;

SHOW TRIGGERS FROM TheCS;

CREATE TABLE TheCS.Computer (
    ComputerID CHAR(36) PRIMARY KEY,
    StoreID CHAR(36),
    CName VARCHAR(50) UNIQUE,
    CPrice DOUBLE,
    CMemory CHAR(36),
    CStorageSize CHAR(36),
    CProcessor INT(1),
    CProcessorGen INT(1),
    CGraphics INT(1),
    Purchased BOOLEAN DEFAULT 0,
    FOREIGN KEY (StoreID) REFERENCES TheCS.Store(StoreID) ON DELETE CASCADE
);

DROP TRIGGER UpdateInventoryBalance;
DROP TRIGGER UpdateTableTrigger;
DROP TRIGGER DeleteInventoryBalance ;
DROP TRIGGER CheckForDelete ;
DROP TRIGGER ActuallyDeleteComputer ;

SHOW TRIGGERS FROM TheCS;

CREATE TRIGGER UpdateInventoryBalance 
AFTER INSERT ON TheCS.Computer
FOR EACH ROW
UPDATE TheCS.Store
SET InventoryBalance = InventoryBalance + NEW.CPrice
WHERE StoreID = NEW.StoreID;


CREATE TRIGGER DeleteInventoryBalance 
BEFORE DELETE ON TheCS.Computer
FOR EACH ROW
UPDATE TheCS.Store
SET InventoryBalance = InventoryBalance - OLD.CPrice
WHERE StoreID = OLD.StoreID;

delimiter //
CREATE TRIGGER CheckForDelete
BEFORE DELETE ON TheCS.Computer
FOR EACH ROW
BEGIN
DECLARE Price DOUBLE;
SELECT CPrice INTO Price FROM TheCS.Computer WHERE ComputerID = OLD.ComputerID;
IF OLD.Purchased = 0 THEN 
	UPDATE TheCS.SiteManager
    SET SMBalance = SMBalance + 25;
ELSE 
	UPDATE TheCS.SiteManager, TheCS.Store
    SET Balance = Balance + Price * 0.95,
    SMBalance = SMBalance + Price * 0.05
    WHERE
    StoreID = OLD.StoreID;
END IF;
END //



CREATE TRIGGER UpdateTableTrigger
AFTER UPDATE ON TheCS.Computer
FOR EACH ROW 
UPDATE TheCS.Store
SET InventoryBalance = InventoryBalance - OLD.CPrice + NEW.CPrice
WHERE StoreID = New.StoreID;



INSERT INTO TheCS.Computer (ComputerID, StoreID, CName, CPrice, CMemory, CStorageSize, CProcessor, CProcessorGen, CGraphics)
VALUES ('87654321-4321-4321-4321-210987654321', '12345678-1234-1234-1234-123456789012', 'The Heinemanator 3000', 6900.00, 32, 2000, 4, 4, 1);

INSERT INTO TheCS.Computer (ComputerID, StoreID, CName, CPrice, CMemory, CStorageSize, CProcessor, CProcessorGen, CGraphics)
VALUES ('87654321-4321-4321-4321-210987654322', '12345678-1234-1234-1234-123456789013', 'The PC 1000', 2900.00, 32, 1000, 4, 4, 1);

DELETE Computer FROM TheCS.Computer WHERE ComputerID = "87654321-4321-4321-4321-210987654322";
DELETE Computer FROM TheCS.Computer WHERE ComputerID = "87654321-4321-4321-4321-210987654321";
-- --------------------------------

SELECT * FROM TheCS.Computer;
SELECT * FROM TheCS.Store;
SELECT * FROM TheCS.SiteManager;

UPDATE TheCS.Computer SET Purchased = 1 
WHERE ComputerID = "87654321-4321-4321-4321-210987654322";

DELETE FROM TheCS.Store WHERE StoreID = "a83f6ebe-bd70-4102-958c-51d4125e8761";