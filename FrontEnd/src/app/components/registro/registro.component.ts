import { Component, OnInit } from '@angular/core';
import { RegistroService } from '../../services/Usuario/registro.service';
const reader = new FileReader();
@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})

export class RegistroComponent implements OnInit {

  usu = ''
  nom = ''
  pwd = ''
  pwdc = ''
  fot = ''

  handleUpload(event:any) {
    const file = event.target.files[0];
    reader.readAsDataURL(file);
  }

  datos= []
  constructor(private usuarioService: RegistroService) { }

  ngOnInit(): void {
    this.cargar_usrs()
  }

  registrar_usr() {
    if(this.pwd == this.pwdc){
      var date = new Date();
      let fecha = date.getDate()+"/"+(date.getMonth()+1)+"/"+date.getFullYear()
      let data = {
        usu: this.usu,
        nom: this.nom,
        pass: this.pwd,
        fot: reader.result,
        fech: fecha
      }
      this.usuarioService.registrar(data).subscribe((res: any) => {
        if (res.status === 400) {
          console.error(res.data)
          return
        }
        console.log(res.data)
        this.cargar_usrs()
        this.usu = ''
        this.nom = ''
        this.pwd = ''
        this.pwdc = ''
        this.fot = ''
      }, (err: any) => {
        console.error(err)
      })
    }else{
      console.log("La Contraseña Ingresada No Es Igual")
    }
  }

  cargar_usrs() {
    this.usuarioService.cargar_usrs().subscribe((res: any) => {
      if (res.status === 400) {
        console.error(res.data)
        return
      }
      console.log(res.data)
      this.datos = res.data
      this.usu = ''
      this.nom = ''
      this.pwd = ''
      this.pwdc = ''
      this.fot = ''
    }, (err: any) => {
      console.error(err)
    })
  }

  

}
