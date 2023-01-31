import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UsersServersRules } from '../model/users-servers-rules';

@Injectable({
  providedIn: 'root'
})
export class UsersServersRulesService {
  //urlUsersServers="http://45.76.121.27:8080/usersserversrules"
  //urlUsersServers="http://144.202.71.141:8080/usersserversrules"
  //urlUsersServersRules="https://firewall.servcenter.net/wael/usersserversrules"
  urlUsersServersRules="http://localhost:8080/usersserversrules"

  user:any
  key:any
  basic:any

  constructor(private http:HttpClient) { }

  getUsersServersRules(server_id:any){
    this.user=localStorage.getItem('user')
    this.key = btoa("user:"+JSON.parse(this.user).key_value)
    this.basic ={"Authorization": "Basic "+this.key};
    return this.http.get<any>(this.urlUsersServersRules+"/"+server_id,{headers:this.basic})

  }
  getUserServerRule(server_id:any,rule_id:any){
    this.user=localStorage.getItem('user')
    this.key = btoa("user:"+JSON.parse(this.user).key_value)
    this.basic ={"Authorization": "Basic "+this.key};
    return this.http.get<any>(this.urlUsersServersRules+"/"+server_id+"/"+rule_id,{headers:this.basic})

  }
  getUserServerRuleByUserServID(user_server_id:any){
    this.user=localStorage.getItem('user')
    this.key = btoa("user:"+JSON.parse(this.user).key_value)
    this.basic ={"Authorization": "Basic "+this.key};
    return this.http.get<any>(this.urlUsersServersRules+"/usr_srv/"+user_server_id,{headers:this.basic})
  }
  saveUserServer(userServerRule:any){
    this.user=localStorage.getItem('user')
    this.key = btoa("user:"+JSON.parse(this.user).key_value)
    this.basic ={"Authorization": "Basic "+this.key};
    return this.http.post(this.urlUsersServersRules,userServerRule,{headers:this.basic})
  }
  updateUserServer(userServerRule:UsersServersRules,id:any){
    this.user=localStorage.getItem('user')
    this.key = btoa("user:"+JSON.parse(this.user).key_value)
    this.basic ={"Authorization": "Basic "+this.key};
    return this.http.put<any>(this.urlUsersServersRules+"/"+id,userServerRule,{headers:this.basic})
  }
}
