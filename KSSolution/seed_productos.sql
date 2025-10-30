    -- Script para insertar datos de productos de prueba
    -- Ejecutar después de aplicar las migraciones de Entity Framework

    USE KCSolution;
    GO

    -- Insertar productos de prueba
    INSERT INTO Productos (Descripcion) VALUES
    ('Aceite de Oliva Extra Virgen 500ml'),
    ('Quinoa Orgánica 1kg'),
    ('Miel de Abeja Pura 250g'),
    ('Almendras Naturales 200g'),
    ('Avena Integral 500g'),
    ('Chía Orgánica 250g'),
    ('Cacao en Polvo Natural 200g'),
    ('Pasta Integral de Trigo 500g'),
    ('Arroz Integral 1kg'),
    ('Lentejas Rojas 500g'),
    ('Nueces Peladas 150g'),
    ('Semillas de Girasol 300g'),
    ('Té Verde Orgánico 20 bolsitas'),
    ('Vinagre de Manzana 500ml'),
    ('Sal Marina Fina 500g'),
    ('Azúcar de Coco 300g'),
    ('Harina de Almendras 200g'),
    ('Aceite de Coco 400ml'),
    ('Granola Casera 350g'),
    ('Mantequilla de Maní Natural 250g');

    PRINT 'Productos insertados exitosamente.';
    GO

    -- Verificar la inserción
    SELECT COUNT(*) as 'Total Productos' FROM Productos;
    SELECT * FROM Productos ORDER BY Descripcion;
    GO