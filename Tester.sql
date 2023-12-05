SELECT * FROM TheCS.Store;
SELECT * FROM TheCS.Computer;
SELECT * FROM TheCS.SiteManager;

SELECT StoreID, STName, InventoryBalance FROM TheCS.Store;

SELECT SUM(InventoryBalance) AS InventoryTotal FROM TheCS.Store;
DELETE FROM TheCS.Store WHERE StoreID = '12345678-1234-1234-1234-123456789029';
SELECT CName, CPrice, CMemory, CStorageSize, CProcessor, CProcessorGen, CGraphics FROM TheCS.Computer AS C WHERE C.StoreID = '12345678-1234-1234-1234-123456789012';

SELECT StoreID FROM TheCS.Store WHERE STUsername = 'TheStoreUsername' AND STPassword = 'TheStorePassword';