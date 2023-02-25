import { User } from './../models/user.model';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { environment } from 'src/environments/environment.development';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private readonly URL: string = environment.URL + "/user"

  constructor(private http: HttpClient){}

  getAll(): Observable<User[]>{
    return this.http.get<User[]>(this.URL);
  }

  getByBirthday(month:string): Observable<User[]>{
    return this.http.get<User[]>(this.URL + '/birthday', {
      params:{
        ...(month && {month: month})
      }
    })
  }

  getEmailDomains(): Observable<string[]>{
    return this.http.get<string[]>(this.URL + '/emails')
  }

  createUser(user: User){
    return this.http.post(this.URL, {user})
  }

  updateUser(user: User){
    return this.http.put(this.URL, {user})
  }

  deleteUser(userId: number){
    return this.http.delete(this.URL + `/${userId}`)
  }

  getUserById(userId: number): Observable<User>{
    return this.http.get<User>(this.URL + `/${userId}`)
  }
}
