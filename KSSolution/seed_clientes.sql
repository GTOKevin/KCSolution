-- Script para insertar datos de clientes de prueba
-- Ejecutar después de aplicar las migraciones de Entity Framework

USE KCSolution;
GO

-- Insertar clientes de prueba
INSERT INTO Clientes (Nombre, Apellido, Dni) VALUES
('Juan', 'Pérez', '12345678'),
('María', 'González', '87654321'),
('Carlos', 'Rodríguez', '11223344'),
('Ana', 'López', '44332211'),
('Luis', 'Martínez', '55667788'),
('Carmen', 'Sánchez', '99887766'),
('Pedro', 'Ramírez', '66778899'),
('Laura', 'Torres', '33445566'),
('Miguel', 'Flores', '77889900'),
('Sofia', 'Herrera', '00998877');

PRINT 'Clientes insertados exitosamente.';
GO

-- Verificar la inserción
SELECT COUNT(*) as 'Total Clientes' FROM Clientes;
SELECT * FROM Clientes;
GO