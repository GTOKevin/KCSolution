-- Script para crear la base de datos KCSolution
-- Ejecutar este script en SQL Server Management Studio o similar

USE master;
GO

-- Crear la base de datos si no existe
IF NOT EXISTS (SELECT name FROM sys.databases WHERE name = 'KCSolution')
BEGIN
    CREATE DATABASE KCSolution;
    PRINT 'Base de datos KCSolution creada exitosamente.';
END
ELSE
BEGIN
    PRINT 'La base de datos KCSolution ya existe.';
END
GO

USE KCSolution;
GO

PRINT 'Base de datos KCSolution lista para usar.';
GO