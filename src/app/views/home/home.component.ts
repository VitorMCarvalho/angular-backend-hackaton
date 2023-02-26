import { UserService } from './../../services/user.service';
import { User } from './../../models/user.model';
import { Component , OnInit} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent {

  users: User[] = [];
  loading: boolean = true;
  id:any;

  constructor(private route: ActivatedRoute,
             private router: Router,
             private service: UserService){}

  ngOnInit(): void{
    this.route.params.subscribe(params => {
      this.loading = false;
      if (params['id']) {
        this.id = params['id']
        this.service.getUserById(this.id).subscribe(user=>{
          this.users = [user]
        })
      }
      else {
        this.loading = false;
        this.service.getAll().subscribe(users =>{
          this.users = users
        })
      }
    })
  }

  deleteUser(id:number):void{
    this.service.deleteUser(id).subscribe(
      success => this.ngOnInit(),
      error => alert("cant exclude: " + error)
    )
  }

  editUser(id:number):void{
    this.router.navigate([`create/${id}`])
  }


}
