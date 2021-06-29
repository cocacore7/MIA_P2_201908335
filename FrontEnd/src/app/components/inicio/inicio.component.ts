import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../services/Usuario/usuario.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {

  usu = ''
  pwd = ''

  datos= []
  constructor(private usuarioService: UsuarioService) { }

  ngOnInit(): void {
    this.cargar_usrs()
  }


  login_usr() {
    let data = {
      usu: this.usu,
      pass: this.pwd
    }
    this.usuarioService.login(data).subscribe((res: any) => {
      if (res.status === 400) {
        console.error(res.data)
        return
      }
      console.log(res.data)
      console.log(res.datos)
      this.cargar_usrs()
      this.usu = ''
      this.pwd = ''
    }, (err: any) => {
      console.error(err)
    })
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
