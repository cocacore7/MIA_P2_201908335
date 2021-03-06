/*------------------------------------DDL-----------------------------------*/
CREATE TABLE USUARIO(
    USR VARCHAR2(100) NOT NULL PRIMARY KEY,
    NOMBRE_C VARCHAR2(100) NOT NULL,
    PWD VARCHAR2(100) NOT NULL,
    FOTO VARCHAR2(100),
    BOT VARCHAR2(1) NOT NULL,
    FECHA_C DATE NOT NULL
);

CREATE TABLE SOLICITUD(
    ID_SOLICITUD INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    FECHA_CREACION DATE NOT NULL,
    ESTADO VARCHAR2(100) NOT NULL,
    USR_SOL VARCHAR2(100) NOT NULL,
    FOTO VARCHAR2(100) NOT NULL,
    USR VARCHAR2(100) NOT NULL,
    CONSTRAINT FK_USR_SOLICITUD FOREIGN KEY (USR) REFERENCES USUARIO (USR)
);

CREATE TABLE PUBLICACION(
    ID_PUBLICACION INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    CONTENIDO VARCHAR2(500) NOT NULL,
    IMAGEN VARCHAR2(100),
    FECHA DATE NOT NULL,
    USR VARCHAR2(100) NOT NULL,
    CONSTRAINT FK_USR_PUBLICACION FOREIGN KEY (USR) REFERENCES USUARIO (USR)
);

CREATE TABLE TAG_p(
    ID_TAG INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    CONT_TAG VARCHAR2(100) NOT NULL,
    ID_PUBLICACION INT NOT NULL,
    CONSTRAINT FK_ID_PUBLICACION_TAG FOREIGN KEY (ID_PUBLICACION) REFERENCES PUBLICACION (ID_PUBLICACION)
);

CREATE TABLE AMIGO(
    ID_AMIGO INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    USR_AMIGO VARCHAR2(100) NOT NULL,
    FOTO_AMIGO VARCHAR2(100),
    USR VARCHAR2(100) NOT NULL,
    CONSTRAINT FK_USR_AMIGO FOREIGN KEY (USR) REFERENCES USUARIO (USR)
);

CREATE TABLE CHAT(
    ID_CHAT INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    FECHA_CREACION DATE,
    USR_AMIGO VARCHAR2(100) NOT NULL,
    FOTO VARCHAR2(100) NOT NULL,
    USR VARCHAR2(100) NOT NULL,
    CONSTRAINT FK_USR_CHAT FOREIGN KEY (USR) REFERENCES USUARIO (USR)
);

CREATE TABLE MENSAJE(
    ID_MENSAJE INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    TEXT VARCHAR2(500) NOT NULL,
    FOTOGRAFIA VARCHAR2(100),
    FECHA DATE NOT NULL,
    USR_ENV VARCHAR2(100) NOT NULL,
    USR_REC VARCHAR2(100) NOT NULL,
    ID_CHAT INT NOT NULL,
    CONSTRAINT FK_ID_CHAT_MENSAJE FOREIGN KEY (ID_CHAT) REFERENCES CHAT (ID_CHAT)
);