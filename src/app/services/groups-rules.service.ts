import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { GroupRule } from '../model/group-rule';

@Injectable({
  providedIn: 'root'
})
export class GroupsRulesService {
  //urlGroupsRules="http://45.76.121.27:8080/groupsrules"
  //urlGroupsRules="http://144.202.71.141:8080/groupsrules"
  //urlGroupsRules="https://firewall.servcenter.net/wael/groupsrules"
  urlGroupsRules="http://localhost:8080/groupsrules"

  user:any
  key:any
  basic:any

  constructor(private http:HttpClient) { }

  getAllGroupsRules(){
    this.user=localStorage.getItem('user')
    this.key = btoa("user:"+JSON.parse(this.user).key_value)
    this.basic ={"Authorization": "Basic "+this.key};
    return this.http.get<any>(this.urlGroupsRules,{headers:this.basic})
  }
  getOneGroupRule(rule_id:any,group_id:any){
    this.user=localStorage.getItem('user')
    this.key = btoa("user:"+JSON.parse(this.user).key_value)
    this.basic ={"Authorization": "Basic "+this.key};
    return this.http.get<any>(this.urlGroupsRules+"/"+rule_id+"/"+group_id,{headers:this.basic})
  }
  getGroupRuleByGroupId(group_id:any){
    this.user=localStorage.getItem('user')
    this.key = btoa("user:"+JSON.parse(this.user).key_value)
    this.basic ={"Authorization": "Basic "+this.key};
    return this.http.get<any>(this.urlGroupsRules+"/group_id/"+group_id,{headers:this.basic})
  }
  saveGroupRules(groupsRules:GroupRule){
    this.user=localStorage.getItem('user')
    this.key = btoa("user:"+JSON.parse(this.user).key_value)
    this.basic ={"Authorization": "Basic "+this.key};
    return this.http.post(this.urlGroupsRules,groupsRules,{headers:this.basic})
  }
  getAllGroupRulesByRuleId(code:any){
    this.user=localStorage.getItem('user')
    this.key = btoa("user:"+JSON.parse(this.user).key_value)
    this.basic ={"Authorization": "Basic "+this.key};
    return this.http.get<any>(this.urlGroupsRules+"/rule/"+code,{headers:this.basic})
  }
  getAllGroupRulesByGroupId(code:any){
    this.user=localStorage.getItem('user')
    this.key = btoa("user:"+JSON.parse(this.user).key_value)
    this.basic ={"Authorization": "Basic "+this.key};
    return this.http.get<any>(this.urlGroupsRules+"/group/"+code,{headers:this.basic})
  }
  updateGroupsRules(groupRule:GroupRule,id:any){
    this.user=localStorage.getItem('user')
    this.key = btoa("user:"+JSON.parse(this.user).key_value)
    this.basic ={"Authorization": "Basic "+this.key};
    return this.http.put<any>(this.urlGroupsRules+"/"+id,groupRule,{headers:this.basic})
  }
  deleteGroupsRules(id:any){
    this.user=localStorage.getItem('user')
    this.key = btoa("user:"+JSON.parse(this.user).key_value)
    this.basic ={"Authorization": "Basic "+this.key};
    return this.http.delete(this.urlGroupsRules+"/"+id,{headers:this.basic})
  }
}
