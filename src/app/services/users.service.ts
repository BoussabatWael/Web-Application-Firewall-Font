import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { User } from '../model/user';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  //urlUser="http://45.76.121.27:8080/users"
  //urlUser="http://144.202.71.141:8080/users"
  //urlUser="https://firewall.servcenter.net/wael/users"
  urlUser="http://localhost:8080/users"

  user:any
  key:any
  header:any
  header1:any

  constructor(private http:HttpClient) { }

  getAllUsers(){
    this.user=localStorage.getItem('user')
    this.key = btoa("user:"+JSON.parse(this.user).key_value)
    this.header1 ={"Authorization": "Basic "+this.key};
    return this.http.get<any>(this.urlUser,{headers:this.header1})
  }
  getUsersNumber(){
    this.user=localStorage.getItem('user')
    this.key = btoa("user:"+JSON.parse(this.user).key_value)
    this.header1 ={"Authorization": "Basic "+this.key};
    return this.http.get<any>(this.urlUser+"/all",{headers:this.header1})
  }
  getUserById(code:any){
    this.user=localStorage.getItem('user')
    this.key = btoa("user:"+JSON.parse(this.user).key_value)
    this.header1 ={"Authorization": "Basic "+this.key};
    return this.http.get<any>(this.urlUser+"/"+code,{headers:this.header1})
  }
  getUser(username:any){
    this.key = btoa("front:PrSytImJiuOyVLb9XZsMtNJEGxTWvP")
    this.header ={"Authorization": "Basic "+this.key};
    return this.http.get<any>(this.urlUser+"/username/"+username,{headers:this.header})
  }
  getUsers(account_id:any,user_id:any){
    this.user=localStorage.getItem('user')
    this.key = btoa("user:"+JSON.parse(this.user).key_value)
    this.header1 ={"Authorization": "Basic "+this.key};
    return this.http.get<any>(this.urlUser+"/account/"+account_id+"/user/"+user_id,{headers:this.header1})
  }
  getUserByUsername(username:any){
    this.user=localStorage.getItem('user')
    this.key = btoa("user:"+JSON.parse(this.user).key_value)
    this.header1 ={"Authorization": "Basic "+this.key};
    return this.http.get<any>(this.urlUser+"/name/"+username,{headers:this.header1})
  }
  getOneUser(username:any,password:any){
    this.user=localStorage.getItem('user')
    this.key = btoa("user:"+JSON.parse(this.user).key_value)
    this.header1 ={"Authorization": "Basic "+this.key};
    return this.http.get<any>(this.urlUser+"/"+username+"/"+password,{headers:this.header1})
  }
  saveUser(user:User){
    this.user=localStorage.getItem('user')
    this.key = btoa("user:"+JSON.parse(this.user).key_value)
    this.header1 ={"Authorization": "Basic "+this.key};
    return this.http.post(this.urlUser,user,{headers:this.header1})
  }
  saveUser1(fd:FormData){
    this.user=localStorage.getItem('user')
    this.key = btoa("user:"+JSON.parse(this.user).key_value)
    this.header1 ={"Authorization": "Basic "+this.key};
    return this.http.post(this.urlUser+"/add/",fd,{headers:this.header1})
  }
  updateUser(user:User,id:any){
    this.user=localStorage.getItem('user')
    this.key = btoa("user:"+JSON.parse(this.user).key_value)
    this.header1 ={"Authorization": "Basic "+this.key};
    return this.http.put<any>(this.urlUser+"/update/"+id,user,{headers:this.header1})
  }
  updateUser1(data:any,id:any){
    this.user=localStorage.getItem('user')
    this.key = btoa("user:"+JSON.parse(this.user).key_value)
    this.header1 ={"Authorization": "Basic "+this.key};
    return this.http.put<any>(this.urlUser+"/"+id,data,{headers:this.header1})
  }
  deleteUser(id:any){
    this.user=localStorage.getItem('user')
    this.key = btoa("user:"+JSON.parse(this.user).key_value)
    this.header1 ={"Authorization": "Basic "+this.key};
    return this.http.delete(this.urlUser+"/"+id,{headers:this.header1})
  }
}
