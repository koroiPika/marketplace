-- Crear base de datos
CREATE DATABASE marketplace;

-- Crear Tablas
CREATE TABLE usuarios   ( idusuario serial primary key NOT NULL,
                          nombre varchar(100),
                          correo varchar (255) NOT NULL,
                          contrasena varchar (100) NOT NULL,   
                          imagenuser varchar (255)
                        );

CREATE TABLE productos  ( idproducto serial primary key,
                          usuario_id integer NOT NULL,
						              FOREIGN KEY (usuario_id)
					  	            REFERENCES usuarios(idusuario),
                          titulo varchar(100),
                          imagen varchar (255),
                          descripcion varchar (255),
                          precio varchar(50)             
                        );

-- Insertar ejemplos en tablas
INSERT INTO usuarios values   ( DEFAULT,
                                'koroi',
                                'developer1@gmail.com',
                                'developer',
                                'https://www.pngmart.com/files/10/Female-User-Account-PNG-HD.png'
                              );

INSERT INTO usuarios values   ( DEFAULT,
                                'Nice',
                                'developer2@gmail.com',
                                'frontend',
                                'https://www.pngmart.com/files/10/Female-User-Account-PNG-Image.png'
                              );

INSERT INTO productos values  ( DEFAULT,
                                1,
                                'Batería electrónica Avatar SD301-2SH',
                                'https://audiomusica.vtexassets.com/arquivos/ids/156626/1109773_sd301.jpg?v=637781274933100000',
                                'La SD301-2SH es una batería electrónica de la alta gama de Avatar que se ve y se siente como una batería acústica real.',
                                '224.991'
                              );

INSERT INTO productos values  ( DEFAULT,
                                2,
                                'ESP LTD EC-256FM Guitarra Eléctrica, See Thru Purple Sunburst',
                                'https://http2.mlstatic.com/D_NQ_NP_920536-MLA43960197199_102020-O.webp',
                                'Una guitarra asequible y popular con muchas similitudes a algunas de las guitarras más apreciadas de la historia',
                                '499.900'                            
                              );


-- Consultas en tablas
SELECT * FROM usuarios;
SELECT * FROM productos;

