
/* PROFILES*/
insert into profiles
  (id,name)
values(1, "admin");
insert into profiles
  (id,name)
values(2, "customer");

/* USERS*/

insert into users
  (firstName,lastName,profile_id,email,password,image)
values("Lucho", "Batalla", 1, "admin@coquita.com", "$2b$10$ph4nzghqutMI4./r8BtUJupJSBRSaJQNVn/V/p2oCE/2azL7Opq5m", "default-avatar-male.png");
insert into users
  (firstName,lastName,profile_id,email,password,image)
values(" ", " " , 2, "customer@coquita.com", "$2b$10$ph4nzghqutMI4./r8BtUJupJSBRSaJQNVn/V/p2oCE/2azL7Opq5m", "default-avatar-male.png");
/* CATEGORIES */
insert into categories
  (id,name)
values(1, "Tortas");
insert into categories
  (id,name)
values(2, "Promociones");

/* PRODUCTS*/
insert into products
  (name, price,category_id,detail,image)
values("Torta Advengers", 800, 1, "Chocotorta premium 15 Personas", "torta-avengers.png");
insert into products
  (name, price,category_id,detail,image)
values("Cajita dia del amigo 1,Incluye letter cupcake, 4 brownies y 4 cupcakes", 1500, 2, "Cajita dia del amigo", "promo1.png");
insert into products
  (name, price,category_id,detail,image)
values("Cajita dia del amigo 2,Incluye letter cupcake, 4 brownies y 4 cupcakes", 1900, 2, "Cajita dia del amigo", "promo2.png");


insert into products
  (name, price,category_id,detail,image)
values("Torta Baby shark", 599, 1, "Baby shark premium 10 Personas", "torta-baby-shark.png");