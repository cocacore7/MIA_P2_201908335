import { Component, OnInit } from '@angular/core';
import { PublicacionService } from '../../services/Perfil/publicacion.service';
import { SolicitudesService } from '../../services/Perfil/solicitudes.service';
import { AmigosService } from '../../services/Perfil/amigos.service';
import { ChatsService } from '../../services/Perfil/chats.service';
import { UsuarioService } from '../../services/Usuario/usuario.service';
let reader = new FileReader();

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {
  contenido = ''
  imagen = 'http:\localhost:5000\Imagenes_Usuarios\imagen_mcrv208.jpg'
  tags = ''
  tag_rec = ''
  usr_solicitado = ''
  usr_rech=''
  usr_acept = ''
  datos= []
  datos2 = [1,2,3,4,5]

  constructor(private PublicacionService: PublicacionService,private SolicitudesService: SolicitudesService,
    private AmigosService: AmigosService,private ChatsService: ChatsService,private UsuarioService: UsuarioService) { }

  ngOnInit(): void {
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
    let identificador_public;
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
      identificador_public = res.datos[0]
      this.cargar_public()
      this.contenido = ''
      this.imagen = ''
      this.tags = ''
      this.tag_rec = ''
    }, (err: any) => {
      console.error(err)
    })
    
    if(identificador_public != undefined){
      let tags_ciclo = this.tags.split("#")
      for (let i = 0; i < tags_ciclo.length; i++) {
        let data2 = {
          cont: tags_ciclo[i],
          ident: identificador_public
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
    let data = {
      usr_act: usr,
      tag_pu: this.tag_rec
    }
    this.PublicacionService.cargar_publicacion_tag(data).subscribe((res: any) => {
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

  crear_solicitud() {
    var date = new Date();
    let fecha = date.getDate()+"/"+(date.getMonth()+1)+"/"+date.getFullYear()
    let usr = this.UsuarioService.Usuario[0]
    let data = {
      fech_c: fecha,
      estado: "pendiente",
      usr_sol: this.usr_solicitado,
      usr_pet: usr
    }
    this.SolicitudesService.crear_solicitud(data).subscribe((res: any) => {
      if (res.status === 400) {
        console.error(res.data)
        return
      }
      this.cargar_solicitudes()
    }, (err: any) => {
      console.error(err)
    })
  }

  elim_solicitud() {
    let usr = this.UsuarioService.Usuario[0]
    let data = {
      usr_act: usr,
      usr_rech: this.usr_rech
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

  acept_solicitud() {
    var date = new Date();
    let fecha = date.getDate()+"/"+(date.getMonth()+1)+"/"+date.getFullYear()
    let usr = this.UsuarioService.Usuario[0]
    let data = {
      fech_c: fecha,
      usr_act: usr,
      usr_acept: this.usr_acept
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
      this.datos = res.datos
    }, (err: any) => {
      console.error(err)
    })
  }

}
