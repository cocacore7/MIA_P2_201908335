import { Component, OnInit } from '@angular/core';
import { PublicacionService } from '../../services/Perfil/publicacion.service';
import { SolicitudesService } from '../../services/Perfil/solicitudes.service';
import { AmigosService } from '../../services/Perfil/amigos.service';
import { ChatsService } from '../../services/Perfil/chats.service';
import { UsuarioService } from '../../services/Usuario/usuario.service';
import {Router, ActivatedRoute, Params, RouterLink} from "@angular/router";
let reader = new FileReader();

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {
  contenido = ''
  imagen = 'http://localhost:5000/Imagenes_Publicaciones/imagen_2.jpg'
  tags = ''
  tag_rec = ''
  usr_solicitado = ''
  usr_rech=''
  usr_acept = ''
  usuario = ''
  nombre = ''
  foto = ''
  bot = ''
  datos= []
  datos2 = []

  constructor(private PublicacionService: PublicacionService,private SolicitudesService: SolicitudesService,
    private AmigosService: AmigosService,private ChatsService: ChatsService,private UsuarioService: UsuarioService,
    private _router: Router) { }

  ngOnInit(): void {
    if(this.UsuarioService.Usuario == ""){
      this._router.navigate(['/']);
    }
    this.cargar_public
  }

  handleUpload(event:any) {
    const file = event.target.files[0];
    reader.readAsDataURL(file);
  }

  crear_public() {
    var date = new Date();
    let fecha = date.getDate()+"/"+(date.getMonth()+1)+"/"+date.getFullYear()
    let usr = this.UsuarioService.Usuario[0]
    let data
    if(reader.result == null || reader.result == undefined){
      data = {
        cont: this.contenido,
        fot: "",
        fech_c: fecha,
        usr_act: usr
      }
    }else{
      data = {
        cont: this.contenido,
        fot: reader.result,
        fech_c: fecha,
        usr_act: usr
      }
    }
    reader = new FileReader();
    this.PublicacionService.crear_publicacion(data).subscribe((res: any) => {
      if (res.status === 400) {
        console.error(res.data)
        return
      }
      if(res.datos[0][0] != undefined && this.tags != ""){
        this.tags = this.tags.replace(" ","")
        let tags_ciclo = this.tags.split("#")
        for (let i = 0; i < tags_ciclo.length; i++) {
          let data2 = {
            cont: tags_ciclo[i],
            ident: res.datos[0][0]
          }
          
          this.PublicacionService.crear_tag(data2).subscribe((res: any) => {
            if (res.status === 400) {
              console.error(res.data)
              return
            }
            this.contenido = ''
            this.imagen = ''
            this.tags = ''
            this.tag_rec = ''
          }, (err: any) => {
            console.error(err)
          })
        }
      }
      this.cargar_public()
      this.contenido = ''
      this.imagen = ''
      this.tags = ''
      this.tag_rec = ''
    }, (err: any) => {
      console.error(err)
    })
  }

  cargar_public() {
    let usr = this.UsuarioService.Usuario[0]
    let data = {
      usr_act: usr
    }
    this.PublicacionService.cargar_publicacion(data).subscribe((res: any) => {
      if (res.status === 400) {
        console.error(res.data)
        return
      }
      for (let i = 0; i < res.datos.length; i++) {
        let tags_salida = ""
        if(res.datos[i][2] != null){
          let separar = res.datos[i][2].split("\\")
          res.datos[i][2] = separar[separar.length - 1]
        }
        let data2 = {
          ident: res.datos[i][4]
        }
        this.PublicacionService.cargar_tags(data2).subscribe((res2: any) => {
          if (res2.status === 400) {
            console.error(res2.data)
            return
          }
          if(res.datos.length > 0){
            for (let i = 0; i < res2.datos.length; i++) {
              tags_salida += "#"+res2.datos[i][1]
            }
            res.datos[i].push(tags_salida)
          }
        }, (err: any) => {
          console.error(err)
        })
      }
      this.datos = res.datos
      this.contenido = ''
      this.imagen = ''
      this.tags = ''
      this.tag_rec = ''

    }, (err: any) => {
      console.error(err)
    })
  }

  cargar_public_tag() {
    let usr = this.UsuarioService.Usuario[0]
    this.tag_rec = this.tag_rec.replace(" ","")
    this.tag_rec = this.tag_rec.replace("#","")
    let data = {
      usr_act: usr,
      tag_pu: this.tag_rec
    }
    this.PublicacionService.cargar_publicacion_tag(data).subscribe((res: any) => {
      if (res.status === 400) {
        console.error(res.data)
        return
      }
      for (let i = 0; i < res.datos.length; i++) {
        let tags_salida = ""
        if(res.datos[i][2] != null){
          let separar = res.datos[i][2].split("\\")
          res.datos[i][2] = separar[separar.length - 1]
        }
        let data2 = {
          ident: res.datos[i][0]
        }
        this.PublicacionService.cargar_tags(data2).subscribe((res2: any) => {
          if (res2.status === 400) {
            console.error(res2.data)
            return
          }
          if(res.datos.length > 0){
            for (let i = 0; i < res2.datos.length; i++) {
              tags_salida += "#"+res2.datos[i][1]
            }
            res.datos[i].push(tags_salida)
          }
        }, (err: any) => {
          console.error(err)
        })
      }
      this.datos2 = res.datos
      this.contenido = ''
      this.imagen = ''
      this.tags = ''
      this.tag_rec = ''
    }, (err: any) => {
      console.error(err)
    })
  }

  cargar_tags() {
    let identificador_public = ""
    let data = {
      ident: identificador_public
    }
    this.PublicacionService.cargar_tags(data).subscribe((res: any) => {
      if (res.status === 400) {
        console.error(res.data)
        return
      }
      this.cargar_public()
      this.contenido = ''
      this.imagen = ''
      this.tags = ''
      this.tag_rec = ''
    }, (err: any) => {
      console.error(err)
    })
  }

  crear_solicitud(usuario_sol:any) {
    var date = new Date();
    let fecha = date.getDate()+"/"+(date.getMonth()+1)+"/"+date.getFullYear()
    let usr = this.UsuarioService.Usuario[0]
    let f = this.UsuarioService.Usuario[2].split("\\")
    let data = {
      fech_c: fecha,
      estado: "pendiente",
      usr_sol: usuario_sol,
      foto_a: f[f.length -1],
      usr_pet: usr
    }
    this.SolicitudesService.crear_solicitud(data).subscribe((res: any) => {
      if (res.status === 400) {
        console.error(res.data)
        return
      }
    }, (err: any) => {
      console.error(err)
    })
  }

  elim_solicitud(usuario_rech:any) {
    let usr = this.UsuarioService.Usuario[0]
    console.log(usuario_rech)
    let data = {
      usr_act: usr,
      usr_rech: usuario_rech
    }
    this.SolicitudesService.elim_solicitud(data).subscribe((res: any) => {
      if (res.status === 400) {
        console.error(res.data)
        return
      }
      this.cargar_solicitudes()
    }, (err: any) => {
      console.error(err)
    })
  }

  acept_solicitud(usuario_acept:any) {
    var date = new Date();
    let fecha = date.getDate()+"/"+(date.getMonth()+1)+"/"+date.getFullYear()
    let usr = this.UsuarioService.Usuario[0]
    console.log(usuario_acept)
    let data = {
      fech_c: fecha,
      usr_act: usr,
      usr_acept: usuario_acept
    }
    this.SolicitudesService.acep_solicitud(data).subscribe((res: any) => {
      if (res.status === 400) {
        console.error(res.data)
        return
      }
      this.cargar_solicitudes()
    }, (err: any) => {
      console.error(err)
    })
  }

  cargar_solicitudes() {
    let usr = this.UsuarioService.Usuario[0]
    let data = {
      usr_soli: usr
    }
    this.SolicitudesService.cargar_solicitudes(data).subscribe((res: any) => {
      if (res.status === 400) {
        console.error(res.data)
        return
      }
      this.datos = res.datos
      this.contenido = ''
      this.imagen = ''
      this.tags = ''
      this.tag_rec = ''
    }, (err: any) => {
      console.error(err)
    })
  }
  
  cargar_amigo() {
    let usr = this.UsuarioService.Usuario[0]
    let data = {
      usr_act: usr
    }
    this.AmigosService.cargar_amigo(data).subscribe((res: any) => {
      if (res.status === 400) {
        console.error(res.data)
        return
      }
      for (let i = 0; i < res.datos.length; i++) {
        if(res.datos[i][2] != null){
          let separar = res.datos[i][2].split("\\")
          res.datos[i][2] = separar[separar.length - 1]
        }
      }
      this.datos = res.datos
    }, (err: any) => {
      console.error(err)
    })
  }

  cargar_chat() {
    let usr = this.UsuarioService.Usuario[0]
    let data = {
      usr_act: usr
    }
    this.ChatsService.cargar_chat(data).subscribe((res: any) => {
      if (res.status === 400) {
        console.error(res.data)
        return
      }
      for (let i = 0; i < res.datos.length; i++) {
        if(res.datos[i][3] != null){
          let separar = res.datos[i][3].split("\\")
          res.datos[i][3] = separar[separar.length - 1]
        }
      }
      this.datos = res.datos
    }, (err: any) => {
      console.error(err)
    })
  }

  cargar_noamigo() {
    let usr = this.UsuarioService.Usuario[0]
    let data = {
      usr_act: usr
    }
    this.AmigosService.cargar_noamigo(data).subscribe((res: any) => {
      if (res.status === 400) {
        console.error(res.data)
        return
      }
      for (let i = 0; i < res.datos.length; i++) {
        if(res.datos[i][1] != null){
          let separar = res.datos[i][1].split("\\")
          res.datos[i][1] = separar[separar.length - 1]
        }
      }
      this.datos = res.datos
    }, (err: any) => {
      console.error(err)
    })
  }

  cargar_perfil(){
    this.usuario = this.UsuarioService.Usuario[0]
    this.nombre = this.UsuarioService.Usuario[1]
    let f = this.UsuarioService.Usuario[2].split("\\")
    this.foto = f[f.length -1]
    this.bot = this.UsuarioService.Usuario[3]
  }

  cerrar_sesion(){
    this.UsuarioService.Usuario = ""
    this._router.navigate(['/']);
  }

}
