# MIA_P2_201908335
### Arquitectura Implementada
Se implemento una estructura para front end por medio de desarrollo de angular, back end por medio de node js y base de datos con oracle.
La aplicacion de cliente angular se comunica por medio del puerto localhost:4200 hacia la aplicacion de servidor node js en el puerto localhost:5000, y por ultimo el servidor se comunica a la base de datos oracle.
ANGULAR <-> NODEJS <-> ORACLE

### Entidad Relacion
##### ER:
[Link](https://github.com/cocacore7/MIA_P2_201908335/blob/main/ER_201908335.png)

### Descripcion Tablas:
###### TABLA USUARIO:
Maneja todos los usuarios ingresados dentro de la base de datos, obteniendo como llave unica el nombre del usuario.

###### TABLA SOLICITUD
Se manejan las solicitudes de amistad para todos los usuarios, obteniendo las solicitudes de cada usuario por medio de su procedure que se explica mas adelante, obteniendo como llave principal un id de publicacion de tipo entero, con relacion a la tabla usuario de un usuario para muchas solicitudes, por medio de una llave foranea hacia la llave principal de la tabla usuario.

###### TABLA PUBLICACION
Se manejan las publicaciones para todos los usuarios, obteniendo las publicaciones de cada usuario y sus amigos por medio de su procedure que se explica mas adelante, obteniendo como llave principal un id de publicacion de tipo entero, con relacion a la tabla usuario de un usuario para muchas publicaciones, por medio de una llave foranea hacia la llave principal de la tabla usuario.

###### TABLA AMIGO
Se manejan los amigos para todos los usuarios, obteniendo los amigos de cada usuario por medio de su procedure que se explica mas adelante, obteniendo como llave principal un id de amigo de tipo entero, con relacion a la tabla usuario de un usuario para muchos amigos, por medio de una llave foranea hacia la llave principal de la tabla usuario.

###### TABLA CHAT
Se manejan los chats para todos los usuarios, obteniendo los chats de cada usuario y sus amigos por medio de su procedure que se explica mas adelante, obteniendo como llave principal un id de chat de tipo entero, con relacion a la tabla usuario de un usuario para muchos chats, por medio de una llave foranea hacia la llave principal de la tabla usuario.

###### TABLA MENSAJE
Se manejan los mensajes para todos los chats para cada usuario, obteniendo los mensajes de cada chat por medio de su procedure que se explica mas adelante, obteniendo como llave principal un id de mensaje de tipo entero, con relacion a la tabla chat de un usuario para muchos mensajes, por medio de una llave foranea hacia la llave principal de la tabla chat.

### ENDPOINTS FRONTEND
