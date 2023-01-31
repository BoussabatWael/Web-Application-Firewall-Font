import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Rule } from '../model/rule';
import { RulesInstances } from '../model/rules-instances';
import { Server } from '../model/server';

@Injectable({
  providedIn: 'root'
})
export class RulesInstancesService {
  //urlRuleInstances="http://45.76.121.27:8080/rulesinstances"
  //urlRuleInstances="http://144.202.71.141:8080/rulesinstances"
  //urlRuleInstances="https://firewall.servcenter.net/wael/rulesinstances"
  urlRuleInstances="http://localhost:8080/rulesinstances"

  user:any
  key:any
  basic:any

  constructor(private http:HttpClient) { }

  getAllRulesInstances(){
    this.user=localStorage.getItem('user')
    this.key = btoa("user:"+JSON.parse(this.user).key_value)
    this.basic ={"Authorization": "Basic "+this.key};
    return this.http.get<any>(this.urlRuleInstances,{headers:this.basic})
  }

  saveRuleInstances(rulesInstances:RulesInstances){
    this.user=localStorage.getItem('user')
    this.key = btoa("user:"+JSON.parse(this.user).key_value)
    this.basic ={"Authorization": "Basic "+this.key};
    return this.http.post(this.urlRuleInstances,rulesInstances,{headers:this.basic})
  }
  getRulesInstancesList(rule_id:any,server_id:any){
    this.user=localStorage.getItem('user')
    this.key = btoa("user:"+JSON.parse(this.user).key_value)
    this.basic ={"Authorization": "Basic "+this.key};
    return this.http.get<any>(this.urlRuleInstances+"/"+rule_id+"/"+server_id,{headers:this.basic})
  }
  getRuleInstanceByRuleId(rule_id:any){
    //this.token=localStorage.getItem('token')
    this.user=localStorage.getItem('user')
    this.key = btoa("user:"+JSON.parse(this.user).key_value)
    this.basic ={"Authorization": "Basic "+this.key};
    return this.http.get<any>(this.urlRuleInstances+"/rule_id/"+rule_id,{headers:this.basic})
  }
  getRuleInstancesByServerId(id:any){
    this.user=localStorage.getItem('user')
    this.key = btoa("user:"+JSON.parse(this.user).key_value)
    this.basic ={"Authorization": "Basic "+this.key};
    return this.http.get<any>(this.urlRuleInstances+"/server/"+id,{headers:this.basic})
  }
  getRulesInstancesByRuleId(id:any){
    this.user=localStorage.getItem('user')
    this.key = btoa("user:"+JSON.parse(this.user).key_value)
    this.basic ={"Authorization": "Basic "+this.key};
    return this.http.get<any>(this.urlRuleInstances+"/rule/"+id,{headers:this.basic})
  }
  getRulesInstancesNumberByServerId(server_id:any){
    this.user=localStorage.getItem('user')
    this.key = btoa("user:"+JSON.parse(this.user).key_value)
    this.basic ={"Authorization": "Basic "+this.key};
    return this.http.get<any>(this.urlRuleInstances+"/"+server_id,{headers:this.basic})
  }
  updateRulesInstances(ruleInstance:RulesInstances,id:any){
    this.user=localStorage.getItem('user')
    this.key = btoa("user:"+JSON.parse(this.user).key_value)
    this.basic ={"Authorization": "Basic "+this.key};
    return this.http.put<any>(this.urlRuleInstances+"/"+id,ruleInstance,{headers:this.basic})
  }
  deleteRuleInstances(id:any){
    this.user=localStorage.getItem('user')
    this.key = btoa("user:"+JSON.parse(this.user).key_value)
    this.basic ={"Authorization": "Basic "+this.key};
    return this.http.delete(this.urlRuleInstances+"/"+id,{headers:this.basic})
  }
}
