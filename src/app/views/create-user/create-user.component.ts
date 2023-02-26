import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from './../../services/user.service';
import { User } from './../../models/user.model';
import { Component } from '@angular/core';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css']
})

export class CreateUserComponent {
  id:any;
  user: User = {
    nome: "",
    login: "",
    email: ""
  };
  erro =false
  aux:string = '';
  correct = "";

  constructor(
    private service: UserService,
    private router: Router,
    private activateRoute: ActivatedRoute,

    ){}

  ngOnInit():void{
    this.activateRoute.params.subscribe(params=>{
      if(params['id']){
        this.id = params['id'];
        this.service.getUserById(this.id).subscribe(user=>{
          user.dataNascimento = this.convert(user.dataNascimento)
          this.user = user;
        })
      }
    })
  }


  convert(date: string|undefined): string {
    if(date == undefined)
      return `${new Date().getTime}`;
    else
      this.aux = date
      this.correct = Number(this.aux[1]) >= 10 ? this.aux[1] : "0"+this.aux[1]
      if(Number(this.aux[0])>Number(this.aux[2]))
        return `${this.aux[0]}-${this.correct}-${this.aux[2]}`;
      else
        return `${this.aux[2]}-${this.correct}-${this.aux[1]}`;
  }

  save(){
    if(this.user.id != 0 &&this.user.id != undefined){
      console.log(this.user)
      this.service.updateUser(this.user);
    }else{
      this.service.createUser(this.user).subscribe({
        complete: ()=>{
          this.router.navigate([''])
        },
        error: ()=>{
          this.erro = true
        }
      })
    }
  }
}
