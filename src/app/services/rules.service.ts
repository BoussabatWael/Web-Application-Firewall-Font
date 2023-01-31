import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Rule } from '../model/rule';

@Injectable({
  providedIn: 'root'
})
export class RulesService {
  //urlRule="http://45.76.121.27:8080/rules"
  //urlRule="http://144.202.71.141:8080/rules"
  //urlRule="https://firewall.servcenter.net/wael/rules"
  urlRule="http://localhost:8080/rules"

  user:any
  key:any
  basic:any

  constructor(private http:HttpClient) { }

  getAllRules(){
    this.user=localStorage.getItem('user')
    this.key = btoa("user:"+JSON.parse(this.user).key_value)
    this.basic ={"Authorization": "Basic "+this.key};
    return this.http.get<any>(this.urlRule,{headers:this.basic})

  }
  getRulesNumber(account_id:any){
    this.user=localStorage.getItem('user')
    this.key = btoa("user:"+JSON.parse(this.user).key_value)
    this.basic ={"Authorization": "Basic "+this.key};
    return this.http.get<any>(this.urlRule+"/"+account_id+"/all",{headers:this.basic})
  }
  getRulesNumberByStatus(status:any,account:any){
    this.user=localStorage.getItem('user')
    this.key = btoa("user:"+JSON.parse(this.user).key_value)
    this.basic ={"Authorization": "Basic "+this.key};
    return this.http.get<any>(this.urlRule+"/status/"+status+"/account/"+account,{headers:this.basic})
  }
  getRules(code:any){
    this.user=localStorage.getItem('user')
    this.key = btoa("user:"+JSON.parse(this.user).key_value)
    this.basic ={"Authorization": "Basic "+this.key};
    return this.http.get<any>(this.urlRule+"/account/"+code,{headers:this.basic})
  }
  getRulesUsersSevers(server_id:any, account_id:any, user_id:any){
    this.user=localStorage.getItem('user')
    this.key = btoa("user:"+JSON.parse(this.user).key_value)
    this.basic ={"Authorization": "Basic "+this.key};
    return this.http.get<any>(this.urlRule+"/sid/"+server_id+"/accid/"+account_id+"/usr/"+user_id,{headers:this.basic})
  }
  getUsersServersRules(server_id:any,account_id:any,user_id:any){
    this.user=localStorage.getItem('user')
    this.key = btoa("user:"+JSON.parse(this.user).key_value)
    this.basic ={"Authorization": "Basic "+this.key};
    return this.http.get<any>(this.urlRule+"/server/"+server_id+"/account/"+account_id+"/user/"+user_id,{headers:this.basic})
  }
  saveRule(rule:Rule){
    this.user=localStorage.getItem('user')
    this.key = btoa("user:"+JSON.parse(this.user).key_value)
    this.basic ={"Authorization": "Basic "+this.key};
    return this.http.post(this.urlRule,rule,{headers:this.basic})
  }
  getRuleById(code:any){
    this.user=localStorage.getItem('user')
    this.key = btoa("user:"+JSON.parse(this.user).key_value)
    this.basic ={"Authorization": "Basic "+this.key};
    return this.http.get<any>(this.urlRule+"/"+code,{headers:this.basic})
  }
  updateRule(rule:Rule,id:any){
    this.user=localStorage.getItem('user')
    this.key = btoa("user:"+JSON.parse(this.user).key_value)
    this.basic ={"Authorization": "Basic "+this.key};
    return this.http.put<any>(this.urlRule+"/"+id,rule,{headers:this.basic})
  }
  deleteRule(id:any){
    this.user=localStorage.getItem('user')
    this.key = btoa("user:"+JSON.parse(this.user).key_value)
    this.basic ={"Authorization": "Basic "+this.key};
    return this.http.delete(this.urlRule+"/"+id,{headers:this.basic})
  }
  getRulesByMonth(account_id:any){
    this.user=localStorage.getItem('user')
    this.key = btoa("user:"+JSON.parse(this.user).key_value)
    this.basic ={"Authorization": "Basic "+this.key};
    return this.http.get<any>(this.urlRule+"/bymonth/"+account_id,{headers:this.basic})
  }
}
