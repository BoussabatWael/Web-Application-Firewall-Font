import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Server } from 'src/app/model/server';
import { environment } from 'src/environments/environment';
import { Rule } from '../model/rule';

@Injectable({
  providedIn: 'root'
})
export class ServersService {
  //urlServer="http://45.76.121.27:8080/servers"
  //urlServer="http://144.202.71.141:8080/servers"
  //urlServer="https://firewall.servcenter.net/wael/servers"
  urlServer="http://localhost:8080/servers"

  user:any
  key:any
  basic:any

  constructor(private http:HttpClient) { }

  getAllServers(){
    this.user=localStorage.getItem('user')
    this.key = btoa("user:"+JSON.parse(this.user).key_value)
    this.basic ={"Authorization": "Basic "+this.key};
    return this.http.get<any>(this.urlServer,{headers:this.basic})
  }
  getServersNumber(account_id:any){
    this.user=localStorage.getItem('user')
    this.key = btoa("user:"+JSON.parse(this.user).key_value)
    this.basic ={"Authorization": "Basic "+this.key};
    return this.http.get<any>(this.urlServer+"/"+account_id+"/all",{headers:this.basic})
  }
  getRulesByServer(account_id:any){
    this.user=localStorage.getItem('user')
    this.key = btoa("user:"+JSON.parse(this.user).key_value)
    this.basic ={"Authorization": "Basic "+this.key};
    return this.http.get<any>(this.urlServer+"/rules/"+account_id,{headers:this.basic})
  }
  getServers(code:any){
    this.user=localStorage.getItem('user')
    this.key = btoa("user:"+JSON.parse(this.user).key_value)
    this.basic ={"Authorization": "Basic "+this.key};
    return this.http.get<any>(this.urlServer+"/account/"+code,{headers:this.basic})
  }
  getUserServers(user_id:any,account_id:any){
    this.user=localStorage.getItem('user')
    this.key = btoa("user:"+JSON.parse(this.user).key_value)
    this.basic ={"Authorization": "Basic "+this.key};
    return this.http.get<any>(this.urlServer+"/user/"+user_id+"/"+account_id,{headers:this.basic})
  }
  saveServer(server:Server){
    this.user=localStorage.getItem('user')
    this.key = btoa("user:"+JSON.parse(this.user).key_value)
    this.basic ={"Authorization": "Basic "+this.key};
    return this.http.post(this.urlServer,server,{headers:this.basic})
  }
  getServerById(code:any){
    this.user=localStorage.getItem('user')
    this.key = btoa("user:"+JSON.parse(this.user).key_value)
    this.basic ={"Authorization": "Basic "+this.key};
    return this.http.get<any>(this.urlServer+"/"+code,{headers:this.basic})
  }
  getServerList(r_id:any,acc_id:any){
    this.user=localStorage.getItem('user')
    this.key = btoa("user:"+JSON.parse(this.user).key_value)
    this.basic ={"Authorization": "Basic "+this.key};
    return this.http.get<any>(this.urlServer+"/rule/"+r_id+"/"+acc_id,{headers:this.basic})
  }
  findServerListOfPolicy(policy_id:any,acc_id:any){
    this.user=localStorage.getItem('user')
    this.key = btoa("user:"+JSON.parse(this.user).key_value)
    this.basic ={"Authorization": "Basic "+this.key};
    return this.http.get<any>(this.urlServer+"/policy/"+policy_id+"/"+acc_id,{headers:this.basic})
  }
  updateServer(server:Server,id:any){
    this.user=localStorage.getItem('user')
    this.key = btoa("user:"+JSON.parse(this.user).key_value)
    this.basic ={"Authorization": "Basic "+this.key};
    return this.http.put<any>(this.urlServer+"/"+id,server,{headers:this.basic})
  }
  deleteServer(id:any){
    this.user=localStorage.getItem('user')
    this.key = btoa("user:"+JSON.parse(this.user).key_value)
    this.basic ={"Authorization": "Basic "+this.key};
    return this.http.delete(this.urlServer+"/"+id,{headers:this.basic})
  }
}
