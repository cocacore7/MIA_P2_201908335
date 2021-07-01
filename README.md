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

###### TABLA TAG
Se manejan los tags de las publicaciones para todos los usuarios, obteniendo los tags de cada publicacion por medio de su procedure que se explica mas adelante, obteniendo como llave principal un id de tag de tipo entero, con relacion a la tabla publicacion de un usuario para muchos tags, por medio de una llave foranea hacia la llave principal de la tabla publicacion.

###### TABLA AMIGO
Se manejan los amigos para todos los usuarios, obteniendo los amigos de cada usuario por medio de su procedure que se explica mas adelante, obteniendo como llave principal un id de amigo de tipo entero, con relacion a la tabla usuario de un usuario para muchos amigos, por medio de una llave foranea hacia la llave principal de la tabla usuario.

###### TABLA CHAT
Se manejan los chats para todos los usuarios, obteniendo los chats de cada usuario y sus amigos por medio de su procedure que se explica mas adelante, obteniendo como llave principal un id de chat de tipo entero, con relacion a la tabla usuario de un usuario para muchos chats, por medio de una llave foranea hacia la llave principal de la tabla usuario.

###### TABLA MENSAJE
Se manejan los mensajes para todos los chats para cada usuario, obteniendo los mensajes de cada chat por medio de su procedure que se explica mas adelante, obteniendo como llave principal un id de mensaje de tipo entero, con relacion a la tabla chat de un usuario para muchos mensajes, por medio de una llave foranea hacia la llave principal de la tabla chat.

### ENDPOINTS FRONTEND
###### localhost:4200
Este endpoint muestra el componente de la pagina principal de la aplicacion, para poder elegir la opcion de ingresar sesion o registrarse.

###### localhost:4200/login
Este endpoint muestra el componente del inicio de sesion de la aplicacion, para poder elegir ingresar sesion con su usuario y mostrar el perfil del usuario.

###### localhost:4200/registro
Este endpoint muestra el componente del registro de la aplicacion, para poder registrar un usuario dentro de la aplicacion.

###### localhost:4200/perfil
Este endpoint muestra el componente del perfil de la aplicacion, para poder mostrar el perfil del usuario con sus amigos, chats, solicitudes de amistad, personas que aun no son amigos, filtros de publicaciones, publicaciones y opcion para cerrar sesion.

### ENDPOINTS BACKEND
###### localhost:5000/usuario/login
Este endpoint manda una peticion a la base de datos con su consulta respectiva al procedure de login que se explica mas adelante, recibiendo parametros json desde el frontend y mandando los datos a la base de datos para realizar la peticion solicitada, retornando los valores de la consulta realizada a la base de datos.

###### localhost:5000/usuario/registrar
Este endpoint manda una peticion a la base de datos con su consulta respectiva al procedure de registro que se explica mas adelante, recibiendo parametros json desde el frontend y mandando los datos a la base de datos para realizar la peticion solicitada, retornando los valores de la consulta realizada a la base de datos.

###### localhost:5000/usuario/crear/solicitud
Este endpoint manda una peticion a la base de datos con su consulta respectiva al procedure de crear solicitud de amistad que se explica mas adelante, recibiendo parametros json desde el frontend y mandando los datos a la base de datos para realizar la peticion solicitada, retornando los valores de la consulta realizada a la base de datos.

###### localhost:5000/usuario/elim/solicitud
Este endpoint manda una peticion a la base de datos con su consulta respectiva al procedure de eliminar solicitud de amistad que se explica mas adelante, recibiendo parametros json desde el frontend y mandando los datos a la base de datos para realizar la peticion solicitada, retornando los valores de la consulta realizada a la base de datos.

###### localhost:5000/usuario/acept/solicitud
Este endpoint manda una peticion a la base de datos con su consulta respectiva al procedure de aceptar solicitud de amistad que se explica mas adelante, recibiendo parametros json desde el frontend y mandando los datos a la base de datos para realizar la peticion solicitada, retornando los valores de la consulta realizada a la base de datos.

###### localhost:5000/usuario/crear/publicacion
Este endpoint manda una peticion a la base de datos con su consulta respectiva al procedure de crear una publicacion que se explica mas adelante, recibiendo parametros json desde el frontend y mandando los datos a la base de datos para realizar la peticion solicitada, retornando los valores de la consulta realizada a la base de datos.

###### localhost:5000/usuario/crear/publicacion/tag
Este endpoint manda una peticion a la base de datos con su consulta respectiva al procedure de crear un tag que se explica mas adelante, recibiendo parametros json desde el frontend y mandando los datos a la base de datos para realizar la peticion solicitada, retornando los valores de la consulta realizada a la base de datos.

###### localhost:5000/usuario/cargar/publicacion
Este endpoint manda una peticion a la base de datos con su consulta respectiva al procedure de cargar publicaciones que se explica mas adelante, recibiendo parametros json desde el frontend y mandando los datos a la base de datos para realizar la peticion solicitada, retornando los valores de la consulta realizada a la base de datos.

###### localhost:5000/usuario/cargar/publicacion/tag
Este endpoint manda una peticion a la base de datos con su consulta respectiva al procedure de cargar tags que se explica mas adelante, recibiendo parametros json desde el frontend y mandando los datos a la base de datos para realizar la peticion solicitada, retornando los valores de la consulta realizada a la base de datos.

###### localhost:5000/usuario/cargar/amigo
Este endpoint manda una peticion a la base de datos con su consulta respectiva al procedure de cargar amigos que se explica mas adelante, recibiendo parametros json desde el frontend y mandando los datos a la base de datos para realizar la peticion solicitada, retornando los valores de la consulta realizada a la base de datos.

###### localhost:5000/usuario/cargar/chat
Este endpoint manda una peticion a la base de datos con su consulta respectiva al procedure de cargar chats que se explica mas adelante, recibiendo parametros json desde el frontend y mandando los datos a la base de datos para realizar la peticion solicitada, retornando los valores de la consulta realizada a la base de datos.

###### localhost:5000/usuario/cargar/usrs
Este endpoint manda una peticion a la base de datos con su consulta respectiva al procedure de cargar usuario que se explica mas adelante, recibiendo parametros json desde el frontend y mandando los datos a la base de datos para realizar la peticion solicitada, retornando los valores de la consulta realizada a la base de datos.

###### localhost:5000/usuario/cargar/solicitudes
Este endpoint manda una peticion a la base de datos con su consulta respectiva al procedure de carga de solicitudes de amistad que se explica mas adelante, recibiendo parametros json desde el frontend y mandando los datos a la base de datos para realizar la peticion solicitada, retornando los valores de la consulta realizada a la base de datos.

### PROCEDURES BASE DE DATOS ORACLE
###### ingresar_usr
El procedure recibe como parametros el usuario a registrar, el nombre completo del usuario, la contraseña escogida, la foto si es que subio una ya que es un campo opcional dentro de la tabla de usuarios y la fecha de creacion del usuario proporcionada por el servidor, y devolviendo un valor entero para manejarlo como estado si se realiza correctamente o no la consulta.

###### login
El procedure recibe como parametros el usuario a ingresar buscar, y la contraseña escogida por el usuario, y devolviendo un valor cursor con los valores del usuario encontrado escogidos.

###### crear_solicitud
El procedure recibe como parametros la fecha de creacion de la solicitud proporcionada por el servidor, el estado de la solicitud, el usuario solicitado y el usuario que realizo la solicitud, y devolviendo un valor entero para manejarlo como estado si se realiza correctamente o no la consulta.

###### elim_solicitud
El procedure recibe como parametros el usuario actaul en perfil y el usuario que se a rechazado, devolviendo un valor entero para manejarlo como estado si se realiza correctamente o no la consulta.

###### acep_solicitud
El procedure recibe como parametros la fecha de creacion del usuario proporcionada por el servidor, el usuario actual en sesion y el usuario que se acepta en la solicitud, y devolviendo un valor entero para manejarlo como estado si se realiza correctamente o no la consulta.

###### crear_publicacion
El procedure recibe como parametros el contenido de la publicacion, la ruta de la imagen de la publicacion, la fecha de creacion del usuario proporcionada por el servidor y el usuario actual en sesion, devolviendo un valor cursor con el numero de identificador que se acaba de ingresar.

###### ingresar_tag
El procedure recibe como parametros el identificador de la publicacion realizada, devolviendo un valor entero como estado para verificar la consulta realizada.

###### cargar_publicacion
El procedure recibe como parametros el usuario actual en sesion, devolviendo un valor cursor con las publicaciones obtenidas de la consulta.

###### cargar_publicacion_tag
El procedure recibe como parametros el usuario actual en sesion, y el tag a buscar, devolviendo un valor cursor con las publicaciones obtenidas de la consulta.

###### cargar_tags
El procedure recibe como parametros el identificador de la publicacion realizada, devolviendo un valor cursor con los tags obtenidos de la consulta.

###### cargar_amigo
El procedure recibe como parametros el usuario actual en sesion, devolviendo un valor cursor con los amigos obtenidas de la consulta.

###### cargar_chat
El procedure recibe como parametros el usuario actual en sesion, devolviendo un valor cursor con los chats obtenidas de la consulta.

###### cargar_Usuarios
El procedure devuelve un valor cursor con los usuarios obtenidas de la consulta.

###### cargar_Solicitudes
El procedure devuelve un valor cursor con las solicitudes obtenidas de la consulta.

### VERSION DE ORACLE
[Link](https://github.com/cocacore7/MIA_P2_201908335/blob/main/Version_Oracle_201908335.PNG)
