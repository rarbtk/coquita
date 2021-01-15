
/* PROFILES*/
insert into profiles
  (id,name)
values(1, "admin");
insert into profiles
  (id,name)
values(2, "customer");

/* USERS*/

insert into users
  (firstName,lastName,profile_id,email,password,image,createdAt,updatedAt)
values("Lucho", "Batalla", 1, "admin@coquita.com", "$2b$10$YignpRmWDpm2TUp2X8VYXO6U.oxJVFlQPEYSMOMK2XEmc8pYfWmPG", "perfil.png","2021-01-08 03:22:43", "2021-01-08 03:22:43");
insert into users
  (firstName,lastName,profile_id,email,password,image,createdAt,updatedAt)
values(" ", " " , 2, "customer@coquita.com", "$2b$10$ph4nzghqutMI4./r8BtUJupJSBRSaJQNVn/V/p2oCE/2azL7Opq5m", "default-avatar-male.png", "2021-01-08 03:22:43", "2021-01-08 03:22:43");
/* CATEGORIES */
insert into categories
  (id,name)
values(1, "Tortas");
insert into categories
  (id,name)
values(2, "Promociones");
insert into categories
  (id,name)
values(3, "Cumpleaños");
insert into categories
  (id,name)
values(4, "Eventos");
insert into categories
  (id,name)
values(5, "Pequeños");
insert into categories
  (id,name)
values(6, "Las de siempre");

/* PRODUCTS*/
insert into products
  (name, price,category_id,detail,image,createdAt,updatedAt)
values("Torta Avengers", 800, 3, "Chocotorta premium 15 Personas", "torta-avengers.png", "2021-01-08 03:22:43", "2021-01-08 03:22:43");
insert into products
  (name, price,category_id,detail,image,createdAt,updatedAt)
values("Cajita dia del amigo 1,Incluye letter cupcake, 4 brownies y 4 cupcakes", 1500, 2, "Cajita dia del amigo", "promo1.png", "2021-01-08 03:22:43", "2021-01-08 03:22:43");
insert into products
  (name, price,category_id,detail,image,createdAt,updatedAt)
values("Cajita dia del amigo 2,Incluye letter cupcake, 4 brownies y 4 cupcakes", 1900, 2, "Cajita dia del amigo", "promo2.png", "2021-01-08 03:22:43", "2021-01-08 03:22:43");
insert into products
  (name, price,category_id,detail,image,createdAt,updatedAt)
values("Torta 3 Osos", 1900, 3, "Torta de cumpleaños", "torta-3-osos.png", "2021-01-08 03:22:43", "2021-01-08 03:22:43");
insert into products
  (name, price,category_id,detail,image,createdAt,updatedAt)
values("Torta Baby Yoda", 1900, 3, "Torta de cumpleaños", "torta-babyyoda.png", "2021-01-08 03:22:43", "2021-01-08 03:22:43");
insert into products
  (name, price,category_id,detail,image,createdAt,updatedAt)
values("Torta Bob Esponja", 1900, 3, "Torta de cumpleaños", "torta-bobesponja.png", "2021-01-08 03:22:43", "2021-01-08 03:22:43");
insert into products
  (name, price,category_id,detail,image,createdAt,updatedAt)
values("Set Día del padre", 1900, 4, "Caja de desayuno", "dia-padre.png", "2021-01-08 03:22:43", "2021-01-08 03:22:43");
insert into products
  (name, price,category_id,detail,image,createdAt,updatedAt)
values("Set Día del niño", 1900, 4, "Caja de desayuno", "dia-ninio.png", "2021-01-08 03:22:43", "2021-01-08 03:22:43");
insert into products
  (name, price,category_id,detail,image,createdAt,updatedAt)
values("Caja de macarrones", 1900, 5, "Caja de desayuno", "macarrones.png", "2021-01-08 03:22:43", "2021-01-08 03:22:43");
insert into products
  (name, price,category_id,detail,image,createdAt,updatedAt)
values("Torta de ricota", 1900, 6, "Caja de desayuno", "torta.png", "2021-01-08 03:22:43", "2021-01-08 03:22:43");
insert into products
  (name, price,category_id,detail,image,createdAt,updatedAt)
values("Torta Baby shark", 599, 1, "Baby shark premium 10 Personas", "torta-baby-shark.png", "2021-01-08 03:22:43", "2021-01-08 03:22:43");