import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UsersServers } from '../model/users-servers';

@Injectable({
  providedIn: 'root'
})
export class UsersServersService {
  //urlUsersServers="http://45.76.121.27:8080/usersservers"
  //urlUsersServers="http://144.202.71.141:8080/usersservers"
  //urlUsersServers="https://firewall.servcenter.net/wael/usersservers"
  urlUsersServers="http://localhost:8080/usersservers"

  user:any
  key:any
  basic:any

  constructor(private http:HttpClient) { }

  getUsersServersByUserID(user_id:any){
    this.user=localStorage.getItem('user')
    this.key = btoa("user:"+JSON.parse(this.user).key_value)
    this.basic ={"Authorization": "Basic "+this.key};
    return this.http.get<any>(this.urlUsersServers+"/"+user_id,{headers:this.basic})
  }
  saveUserServer(userServer:UsersServers){
    this.user=localStorage.getItem('user')
    this.key = btoa("user:"+JSON.parse(this.user).key_value)
    this.basic ={"Authorization": "Basic "+this.key};
    return this.http.post(this.urlUsersServers,userServer,{headers:this.basic})
  }
  updateUserServer(userServer:UsersServers,id:any){
    this.user=localStorage.getItem('user')
    this.key = btoa("user:"+JSON.parse(this.user).key_value)
    this.basic ={"Authorization": "Basic "+this.key};
    return this.http.put<any>(this.urlUsersServers+"/"+id,userServer,{headers:this.basic})
  }
  getUserServerById(id:any){
    this.user=localStorage.getItem('user')
    this.key = btoa("user:"+JSON.parse(this.user).key_value)
    this.basic ={"Authorization": "Basic "+this.key};
    return this.http.get<any>(this.urlUsersServers+"/id/"+id,{headers:this.basic})
  }
  getUserServerByUserServerId(user_id:any,server_id:any){
    this.user=localStorage.getItem('user')
    this.key = btoa("user:"+JSON.parse(this.user).key_value)
    this.basic ={"Authorization": "Basic "+this.key};
    return this.http.get<any>(this.urlUsersServers+"/user/"+user_id+"/server/"+server_id,{headers:this.basic})
  }
}
