import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { PoliciesInstances } from '../model/policies-instances';

@Injectable({
  providedIn: 'root'
})
export class PoliciesInstancesService {
  //urlPoliciesInstances="http://45.76.121.27:8080/policiesinstances"
  //urlPoliciesInstances="http://144.202.71.141:8080/policiesinstances"
  //urlPoliciesInstances="https://firewall.servcenter.net/wael/policiesinstances"
  urlPoliciesInstances="http://localhost:8080/policiesinstances"

  user:any
  key:any
  basic:any

  constructor(private http:HttpClient) { }

  getAllPoliciesInstances(){
    this.user=localStorage.getItem('user')
    this.key = btoa("user:"+JSON.parse(this.user).key_value)
    this.basic ={"Authorization": "Basic "+this.key};
    return this.http.get<any>(this.urlPoliciesInstances,{headers:this.basic})
  }
  getOnePolicyInstance(policy_id:any,server_id:any){
    this.user=localStorage.getItem('user')
    this.key = btoa("user:"+JSON.parse(this.user).key_value)
    this.basic ={"Authorization": "Basic "+this.key};
    return this.http.get<any>(this.urlPoliciesInstances+"/"+policy_id+"/"+server_id,{headers:this.basic})
  }
  savePolicyInstance(policyInstance:PoliciesInstances){
    this.user=localStorage.getItem('user')
    this.key = btoa("user:"+JSON.parse(this.user).key_value)
    this.basic ={"Authorization": "Basic "+this.key};
    return this.http.post(this.urlPoliciesInstances,policyInstance,{headers:this.basic})
  }

  getPolicyInstanceByPolicyId(id:any){
    this.user=localStorage.getItem('user')
    this.key = btoa("user:"+JSON.parse(this.user).key_value)
    this.basic ={"Authorization": "Basic "+this.key};
    return this.http.get<any>(this.urlPoliciesInstances+"/policy/"+id,{headers:this.basic})
  }

  updatePoliciesInstances(policyInstance:PoliciesInstances,id:any){
    this.user=localStorage.getItem('user')
    this.key = btoa("user:"+JSON.parse(this.user).key_value)
    this.basic ={"Authorization": "Basic "+this.key};
    return this.http.put<any>(this.urlPoliciesInstances+"/"+id,policyInstance,{headers:this.basic})
  }
  deletePolicyInstance(id:any){
    this.user=localStorage.getItem('user')
    this.key = btoa("user:"+JSON.parse(this.user).key_value)
    this.basic ={"Authorization": "Basic "+this.key};
    return this.http.delete(this.urlPoliciesInstances+"/"+id,{headers:this.basic})
  }
}
