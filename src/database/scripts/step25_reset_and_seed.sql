DELETE FROM service_orders;
DELETE FROM user_roles;
DELETE FROM users;
DELETE FROM roles;
DELETE FROM sectors;

DBCC CHECKIDENT ('service_orders', RESEED, 0);
DBCC CHECKIDENT ('users', RESEED, 0);
DBCC CHECKIDENT ('roles', RESEED, 0);
DBCC CHECKIDENT ('sectors', RESEED, 0);