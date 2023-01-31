import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { UsersLogs } from '../model/users-logs';

@Injectable({
  providedIn: 'root'
})
export class UsersLogsService {
  //urlUsersLogs="http://45.76.121.27:8080/userslogs"
  //urlUsersLogs="http://144.202.71.141:8080/userslogs"
  //urlUsersLogs="https://firewall.servcenter.net/wael/userslogs"
  urlUsersLogs="http://localhost:8080/userslogs"

  user:any
  key:any
  basic:any

  constructor(private http:HttpClient) { }

  getAllUsersLogs(){
    this.user=localStorage.getItem('user')
    this.key = btoa("user:"+JSON.parse(this.user).key_value)
    this.basic ={"Authorization": "Basic "+this.key};
    return this.http.get<any>(this.urlUsersLogs,{headers:this.basic})
  }
  getUserLogsById(code:any){
    this.user=localStorage.getItem('user')
    this.key = btoa("user:"+JSON.parse(this.user).key_value)
    this.basic ={"Authorization": "Basic "+this.key};
    return this.http.get<any>(this.urlUsersLogs+"/"+code,{headers:this.basic})
  }
  getUserLogsByUserId(user_id:any){
    this.user=localStorage.getItem('user')
    this.key = btoa("user:"+JSON.parse(this.user).key_value)
    this.basic ={"Authorization": "Basic "+this.key};
    return this.http.get<any>(this.urlUsersLogs+"/user/"+user_id,{headers:this.basic})
  }
  getLastUserLogsByUserId(user_id:any){
    this.user=localStorage.getItem('user')
    this.key = btoa("user:"+JSON.parse(this.user).key_value)
    this.basic ={"Authorization": "Basic "+this.key};
    return this.http.get<any>(this.urlUsersLogs+"/last/user/"+user_id,{headers:this.basic})
  }
  getUsersLogs(source:any,user_id:any){
    //this.token=localStorage.getItem('token')
    this.user=localStorage.getItem('user')
    this.key = btoa("user:"+JSON.parse(this.user).key_value)
    this.basic ={"Authorization": "Basic "+this.key};
    return this.http.get<any>(this.urlUsersLogs+"/"+source+"/"+user_id,{headers:this.basic})
  }
  getUsersLogs1(source:any,user_id:any){
    this.user=localStorage.getItem('user')
    this.key = btoa("user:"+JSON.parse(this.user).key_value)
    this.basic ={"Authorization": "Basic "+this.key};
    return this.http.get<any>(this.urlUsersLogs+"/1/"+source+"/"+user_id,{headers:this.basic})
  }
  getServersUsersLogs(server_id:any){
    this.user=localStorage.getItem('user')
    this.key = btoa("user:"+JSON.parse(this.user).key_value)
    this.basic ={"Authorization": "Basic "+this.key};
    return this.http.get<any>(this.urlUsersLogs+"/server_id/"+server_id,{headers:this.basic})
  }
  getRulesUsersLogs(rule_id:any){
    this.user=localStorage.getItem('user')
    this.key = btoa("user:"+JSON.parse(this.user).key_value)
    this.basic ={"Authorization": "Basic "+this.key};
    return this.http.get<any>(this.urlUsersLogs+"/rule_id/"+rule_id,{headers:this.basic})
  }
  getGroupsUsersLogs(group_id:any){
    this.user=localStorage.getItem('user')
    this.key = btoa("user:"+JSON.parse(this.user).key_value)
    this.basic ={"Authorization": "Basic "+this.key};
    return this.http.get<any>(this.urlUsersLogs+"/group_id/"+group_id,{headers:this.basic})
  }
  getPoliciesUsersLogs(policy_id:any){
    this.user=localStorage.getItem('user')
    this.key = btoa("user:"+JSON.parse(this.user).key_value)
    this.basic ={"Authorization": "Basic "+this.key};
    return this.http.get<any>(this.urlUsersLogs+"/policy_id/"+policy_id,{headers:this.basic})
  }
  getUserLogs(user_id:any){
    this.user=localStorage.getItem('user')
    this.key = btoa("user:"+JSON.parse(this.user).key_value)
    this.basic ={"Authorization": "Basic "+this.key};
    return this.http.get<any>(this.urlUsersLogs+"/usr/"+user_id,{headers:this.basic})
  }
  saveUserLogs(userLogs:UsersLogs){
    this.user=localStorage.getItem('user')
    this.key = btoa("user:"+JSON.parse(this.user).key_value)
    this.basic ={"Authorization": "Basic "+this.key};
    return this.http.post(this.urlUsersLogs,userLogs,{headers:this.basic})
  }
  updateUserLogs(userLogs:UsersLogs,id:any){
    this.user=localStorage.getItem('user')
    this.key = btoa("user:"+JSON.parse(this.user).key_value)
    this.basic ={"Authorization": "Basic "+this.key};
    return this.http.put<any>(this.urlUsersLogs+"/"+id,userLogs,{headers:this.basic})
  }
  deleteUserLogs(id:any){
    this.user=localStorage.getItem('user')
    this.key = btoa("user:"+JSON.parse(this.user).key_value)
    this.basic ={"Authorization": "Basic "+this.key};
    return this.http.delete(this.urlUsersLogs+"/"+id,{headers:this.basic})
  }
}
