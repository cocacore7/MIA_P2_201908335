import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../services/Usuario/usuario.service';
import { RegistroService } from '../../services/Usuario/registro.service';
const reader = new FileReader();
@Component({
  selector: 'app-pagina-p',
  templateUrl: './pagina-p.component.html',
  styleUrls: ['./pagina-p.component.css']
})
export class PaginaPComponent implements OnInit {
  usu2 = ''
  pwd2 = ''
  usu = ''
  nom = ''
  pwd = ''
  pwdc = ''
  fot = ''
  datos= []

  constructor(private registroService: RegistroService,private usuarioService: UsuarioService) { }

  ngOnInit(): void {
    this.cargar_usrs()
  }

  handleUpload(event:any) {
    const file = event.target.files[0];
    reader.readAsDataURL(file);
  }

  login_usr() {
    let data = {
      usu: this.usu2,
      pass: this.pwd2
    }
    this.usuarioService.login(data).subscribe((res: any) => {
      if (res.status === 400) {
        console.error(res.data)
        return
      }
      this.cargar_usrs()
      this.usu2 = ''
      this.pwd2 = ''
    }, (err: any) => {
      console.error(err)
    })
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
      this.registroService.registrar(data).subscribe((res: any) => {
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
      this.datos = res.data
      this.usu = ''
      this.pwd = ''
    }, (err: any) => {
      console.error(err)
    })
  }

}
