/*------------------------------------DML-----------------------------------*/
/*REGISTRAR USUARIO*/
CREATE OR REPLACE PROCEDURE ingresar_usr (usu in varchar2, nom in varchar2, pass in varchar2, fot in varchar2, fech in date, estado out number) 
as
prueba varchar2(100) := NULL;
cursor c1 is
     SELECT t.usr
     FROM USUARIO t
     WHERE t.usr = usu;
BEGIN
    open c1;
    fetch c1 into prueba;
    close c1;
    if prueba = usu then
        estado := '0';
    else
        insert into USUARIO(USR,NOMBRE_C,PWD,FOTO,BOT,FECHA_C) 
        values (usu,nom,pass,fot,'0',fech);
        estado := '1';
    end if;
END;
/*BUSCAR USUARIO*/
CREATE OR REPLACE PROCEDURE login (usu in varchar2, pass in varchar2, busqueda out SYS_REFCURSOR) 
as
BEGIN
    open busqueda for 
        select t.* from usuario t
        where t.usr=usu and t.pwd=pass;
END;
/*CARGAR Usuarios Existentes*/
CREATE OR REPLACE PROCEDURE cargar_Usuarios(busqueda out SYS_REFCURSOR)
as
begin
    open busqueda for 
        select USR,NOMBRE_C,FOTO,BOT,FECHA_C from usuario;
end;

/*PUBLICACIONES*/
CREATE OR REPLACE PROCEDURE crear_publicacion(cont in varchar2, fot in varchar2, fech_c in date, usr_act in varchar2, busqueda out SYS_REFCURSOR)
as
begin
    insert into PUBLICACION(CONTENIDO,IMAGEN,FECHA,USR) values(cont,fot,fech_c,usr_act);
    open busqueda for select max(id_publicacion) from publicacion;
end;
/*TAG PUBLICACION*/
CREATE OR REPLACE PROCEDURE ingresar_tag(cont in varchar2, ident number, estado out number)
as
begin
    insert into tag_p(CONT_TAG,ID_PUBLICACION) values(cont,ident);
    estado := '1';
end;
/*CARGAR PUBLICACIONES PARA PERFIL*/
CREATE OR REPLACE PROCEDURE cargar_publicacion(usr_act in varchar2, busqueda out SYS_REFCURSOR)
as
e_amigo varchar2(100);
cursor c1 is
     SELECT a.usr
     FROM amigo a
     WHERE a.usr = usr_act;
begin
    open c1;
    fetch c1 into e_amigo;
    close c1;
    if e_amigo = usr_act then
        open busqueda for 
            select DISTINCT t.usr,t.contenido,t.imagen,t.fecha from PUBLICACION t
            inner join amigo a on a.usr=usr_act
            where t.usr = a.usr_amigo or t.usr = usr_act;
    else
        open busqueda for 
            select t.usr,t.contenido,t.imagen,t.fecha from PUBLICACION t
            where t.usr = usr_act;
    end if;
end;
/*CARGAR PUBLICACIONES POR TAG*/
CREATE OR REPLACE PROCEDURE cargar_publicacion_tag(usr_act in varchar2, tag_pu in varchar2, busqueda out SYS_REFCURSOR)
as
e_amigo varchar2(100);
cursor c1 is
     SELECT a.usr
     FROM amigo a
     WHERE a.usr = usr_act;
begin
    open c1;
    fetch c1 into e_amigo;
    close c1;
    if e_amigo = usr_act then
        open busqueda for 
            select DISTINCT t.usr,t.contenido,t.imagen,t.fecha from PUBLICACION t
            inner join amigo a on a.usr=usr_act
            inner join TAG_p tp on tp.ID_PUBLICACION = t.ID_PUBLICACION
            where (t.usr = a.usr_amigo or t.usr = usr_act) and tp.CONT_TAG = tag_pu;
    else
        open busqueda for 
            select t.usr,t.contenido,t.imagen,t.fecha from PUBLICACION t
            inner join TAG_p tp on tp.ID_PUBLICACION = t.ID_PUBLICACION
            where t.usr = usr_act and tp.CONT_TAG = tag_pu;
    end if;
end;
/*CARGAR TAGS DE PUBLICACION*/
CREATE OR REPLACE PROCEDURE cargar_tags(ident in number, busqueda out SYS_REFCURSOR)
as
begin
    open busqueda for 
        select t.* from tag_p t
        where t.id_publicacion=ident;
end;

/*CREAR SOLICITUD DE AMISTAD*/
CREATE OR REPLACE PROCEDURE crear_solicitud(fech_c in date, estado in varchar2, usr_sol in varchar2, usr_pet in varchar2, est_cs out number)
as
usr1 varchar2(100) := NULL;
usr2 varchar2(100) := NULL;
posible number := 0;
cursor c1 is
     SELECT t.usr
     FROM USUARIO t
     WHERE t.usr = usr_pet;
cursor c2 is
     SELECT t.usr
     FROM USUARIO t
     WHERE t.usr = usr_sol;
begin
    open c1;
    fetch c1 into usr1;
    close c1;
    open c2;
    fetch c2 into usr2;
    close c2;
    if usr1 = usr_pet then
        if usr2 = usr_sol then
            insert into solicitud(FECHA_CREACION,ESTADO,USR_SOL,USR) values(fech_c,estado,usr_sol,usr_pet);
            est_cs := '1';
        else
            est_cs := '0';
        end if;
    else
        est_cs := '0';
    end if;
end;
/*ELIMINAR SOLICITUDES DE AMISTAD*/
CREATE OR REPLACE PROCEDURE elim_solicitud (usr_act in varchar2, usr_rech in varchar2, estado out number) 
as
usr1 varchar2(100) := NULL;
usr2 varchar2(100) := NULL;
cursor c1 is
     SELECT t.usr
     FROM USUARIO t
     WHERE t.usr = usr_act;
cursor c2 is
     SELECT t.usr
     FROM USUARIO t
     WHERE t.usr = usr_rech;
BEGIN
    open c1;
    fetch c1 into usr1;
    close c1;
    open c2;
    fetch c2 into usr2;
    close c2;
    if usr1 = usr_act then
        if usr2 = usr_rech then
            delete from solicitud where usr_sol = usr_act and usr=usr_rech;
            estado := '1';
        else
            estado := '0';
        end if;
    else
        estado := '0';
    end if;
END;
/*ACEPTAR SOLICITUD AMISTAD, CREAR AMIGO, CREAR CHAT*/
CREATE OR REPLACE PROCEDURE acep_solicitud (fech_c in date, usr_act in varchar2, usr_acept in varchar2, estado out number) 
as
usr1 varchar2(100) := NULL;
usr2 varchar2(100) := NULL;
usr_amigo varchar2(100) := NULL;
foto_amigo varchar2(100) := NULL;
foto_act varchar2(100) := NULL;
cursor c1 is
     SELECT t.usr
     FROM USUARIO t
     WHERE t.usr = usr_act;
cursor c2 is
     SELECT t.usr
     FROM USUARIO t
     WHERE t.usr = usr_acept;
cursor c3 is
     SELECT t.USR_AMIGO
     FROM AMIGO t
     WHERE t.USR_AMIGO = usr_acept and t.USR=usr_act;
cursor c4 is
     SELECT t.FOTO
     FROM USUARIO t
     WHERE t.usr = usr_acept;
cursor c5 is
     SELECT t.FOTO
     FROM USUARIO t
     WHERE t.usr = usr_act;
BEGIN
    open c1;
    fetch c1 into usr1;
    close c1;
    open c2;
    fetch c2 into usr2;
    close c2;
    open c3;
    fetch c3 into usr_amigo;
    close c3;
    open c4;
    fetch c4 into foto_amigo;
    close c4;
    open c5;
    fetch c5 into foto_act;
    close c5;
    if usr1 = usr_act then
        if usr2 = usr_acept then
            if usr_amigo = usr_acept then
                delete from solicitud where (usr_sol = usr_act or usr_sol = usr_acept) and (usr = usr_act or usr = usr_acept);
                estado := '2';
            else
                delete from solicitud where usr_sol = usr_act and usr=usr_acept;
                insert into amigo(USR_AMIGO,FOTO_AMIGO,USR) values (usr_acept,foto_amigo,usr_act);
                insert into amigo(USR_AMIGO,FOTO_AMIGO,USR) values (usr_act,foto_act,usr_acept);
                insert into chat(FECHA_CREACION,USR_AMIGO,USR) values (fech_c,usr_act,usr_acept);
                insert into chat(FECHA_CREACION,USR_AMIGO,USR) values (fech_c,usr_acept,usr_act);
                estado := '1';
            end if;
        else
            estado := '0';
        end if;
    else
        estado := '0';
    end if;
END;
/*CARGAR Solicitudes Existentes*/
CREATE OR REPLACE PROCEDURE cargar_Solicitudes(usr_soli in varchar2, busqueda out SYS_REFCURSOR)
as
begin
    open busqueda for 
        select FECHA_CREACION,ESTADO,usr,usr_sol from Solicitud s
        where s.usr_sol=usr_soli;
end;

/*CARGAR AMIGOS PARA PERFIL*/
CREATE OR REPLACE PROCEDURE cargar_amigo(usr_act in varchar2, busqueda out SYS_REFCURSOR)
as
begin
    open busqueda for 
        select t.* from AMIGO t
        where t.usr=usr_act;
end;

/*CARGAR CHATS PARA PERFIL*/
CREATE OR REPLACE PROCEDURE cargar_chat(usr_act in varchar2, busqueda out SYS_REFCURSOR)
as
begin
    open busqueda for 
        select t.* from CHAT t
        where t.usr=usr_act;
end;
