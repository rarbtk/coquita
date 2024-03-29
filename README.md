# PROYECTO X

Este es el proyecto integrador del grupo 4 para Digital House "PANADERIA COQUITA"

# Comenzar el proyecto

<pre>
npm start
</pre>

# Descripcion del proyecto

Se realizara un e-commerce para un emprendimiento de reposteria para eventos. El objetivo es crear en primera instancia un e-commerce tradicional mostrando los productos. En segunda instancia se quiere desarrollar la posibilidad de que el user vaya armando su propia torta con las opciones que se le vayan proponiendo para dar un resultado final con un presupuesto y la cantidad de dias que es necesario para elaborar dicho producto.

## Particpantes

<pre>
- Luis Batalla
- Eduardo Mijares
- Ricardo Rodriguez
- Daniel Leguizamon
</pre>

### Herramientas

<pre>
- [Tablero de Trello](https://trello.com/b/xWeVaC6J/proyeto-x)
</pre>

### DONE/TO-DO

# DONE

<pre>
Fix x Lucho
Se agregó sequelize
script de carga inicial + creacion de DB 
  - /database/init/1_create_db.sql (corresponde a la creacion de la DB)
  - /database/init/2_init_db.sql (corresponde a la carga inicial de los datos)
Agregue el modelo de datos dentro del proyecto en la carpeta database/arquitectura-db/modelo-de-datos.mwb
Se agrego el registro de usuarios y registra en la DB
Una vez que se registra te deja en sesion + cookie y de deja logueado redireccionando al Login
Alta de productos -> agregar Combo que lea las categorias de la DB(Ejemplo la categoria ID 1 "Tortas", 2 - Eventos/Catering......) 
- Login usa el JSON, agregar que utilice la DB
- Edicion de Producto debe obtener de la DB la categoria ID y dejarla seleccionada dependiendo la categoria
- se agrega vista error para en caso de fallas renderizar a esa vista(ej: update de un producto que fue eliminado, redirige a esa vista)
</pre>

# TO-DO

<pre>
- Los listados se deben realizar con un limit para limitar por pagina
- Validar en register "Password" y "confirm Password" que sean iguales(Front JS)
- Agregar modelo de datos dentro de sequelize para:
  - Carts
  - Cart Items
- Conocé nuestras promociones -> No lleva a ningun lado esas imagenes 
- Footer ->  El home y contacto no funcionan
- HOME -> Buscador de tematica  -> No busca
- HOME -> "Cumpleaños - Eventos - Pequeños gustos - Las de siempre" No llevan a ningun lado.
- PRODUCTOS -> Si en la URL le pasa un producto ID que no existe ej "http://localhost:3000/
product/88" debería decir "PRODUCTO NO ENCONTRADO", hoy dice product is not defined 
- PRODUCTOS -> Detalle de producto -> "Podes Agregar" de que que tabla y con que criterio populamos esta parte?
</pre>

## APIS

Externas

<ul>
  <li>payments</li>
  <li>gravatar</li>
</ul>

### Email template mjml

<pre>
Se utiliza mjml para la creación de email templates
</pre>

Documentacion

<pre>
https://documentation.mjml.io/#mjml-guides
</pre>

Instalacion

<pre>
npm install mjml

mjml input.mjml -o output.html

</pre>

## ENV EXAMPLE

PORT = 3000
MYSQL_USER =
MYSQL_PASSWORD =
MYSQL_DATABASE =
API_GRAVATAR = ""
EMAIL = "panaderia.coquita@gmail.com" ### -> Coquita email sender
EMAIL_PASSWORD = "PASSWORD_HERE"
MP_ACCESS_TOKEN = ""

## RUN WITH DOCKER

run mysql DB

<pre>
docker-compose up -d db
</pre>

run all project

<pre>
docker-compose up -d
</pre>
