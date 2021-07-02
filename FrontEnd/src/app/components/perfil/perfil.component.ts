import { Component, OnInit } from '@angular/core';
import { PublicacionService } from '../../services/Perfil/publicacion.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {
  contenido = ''
  imagen = ''
  tags = ''
  tag_rec = ''
  datos= []

  constructor(private PublicacionService: PublicacionService) { }

  ngOnInit(): void {
    this.cargar_public
  }

  crear_public() {
    var date = new Date();
    let fecha = date.getDate()+"/"+(date.getMonth()+1)+"/"+date.getFullYear()
    let usr = ""
    let identificador_public;
    let data = {
      cont: this.contenido,
      fot: this.imagen,
      fech_c: fecha,
      usr_act: usr
    }
    this.PublicacionService.crear_publicacion(data).subscribe((res: any) => {
      if (res.status === 400) {
        console.error(res.data)
        return
      }
      identificador_public = res.data[0]
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
    let usr = ""
    let data = {
      usr_act: usr
    }
    this.PublicacionService.cargar_publicacion(data).subscribe((res: any) => {
      if (res.status === 400) {
        console.error(res.data)
        return
      }
      this.datos = res.data
      this.contenido = ''
      this.imagen = ''
      this.tags = ''
      this.tag_rec = ''
    }, (err: any) => {
      console.error(err)
    })
  }

  cargar_public_tag() {
    let usr = ""
    let data = {
      usr_act: usr,
      tag_pu: this.tag_rec
    }
    this.PublicacionService.cargar_publicacion_tag(data).subscribe((res: any) => {
      if (res.status === 400) {
        console.error(res.data)
        return
      }
      this.datos = res.data
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

}
