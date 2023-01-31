import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Policy } from '../model/policy';

@Injectable({
  providedIn: 'root'
})
export class PoliciesService {
  //urlPolicy="http://45.76.121.27:8080/policies"
  //urlPolicy="http://144.202.71.141:8080/policies"
  //urlPolicy="https://firewall.servcenter.net/wael/policies"
  urlPolicy="http://localhost:8080/policies"

  user:any
  key:any
  basic:any

  constructor(private http:HttpClient) { }

  getAllPolicies(){
    this.user=localStorage.getItem('user')
    this.key = btoa("user:"+JSON.parse(this.user).key_value)
    this.basic ={"Authorization": "Basic "+this.key};
    return this.http.get<any>(this.urlPolicy,{headers:this.basic})
  }
  getPoliciesNumber(account_id:any){
    this.user=localStorage.getItem('user')
    this.key = btoa("user:"+JSON.parse(this.user).key_value)
    this.basic ={"Authorization": "Basic "+this.key};
    return this.http.get<any>(this.urlPolicy+"/"+account_id+"/all",{headers:this.basic})
  }
  getPolicies(code:any){
    this.user=localStorage.getItem('user')
    this.key = btoa("user:"+JSON.parse(this.user).key_value)
    this.basic ={"Authorization": "Basic "+this.key};
    return this.http.get<any>(this.urlPolicy+"/account/"+code,{headers:this.basic})
  }
  savePolicy(policy:Policy){
    this.user=localStorage.getItem('user')
    this.key = btoa("user:"+JSON.parse(this.user).key_value)
    this.basic ={"Authorization": "Basic "+this.key};
    return this.http.post(this.urlPolicy,policy,{headers:this.basic})
  }
  getPolicyById(code:any){
    this.user=localStorage.getItem('user')
    this.key = btoa("user:"+JSON.parse(this.user).key_value)
    this.basic ={"Authorization": "Basic "+this.key};
    return this.http.get<any>(this.urlPolicy+"/"+code,{headers:this.basic})
  }
  updatePolicy(policy:Policy,id:any){
    this.user=localStorage.getItem('user')
    this.key = btoa("user:"+JSON.parse(this.user).key_value)
    this.basic ={"Authorization": "Basic "+this.key};
    return this.http.put<any>(this.urlPolicy+"/"+id,policy,{headers:this.basic})
  }
  deletePolicy(id:any){
    this.user=localStorage.getItem('user')
    this.key = btoa("user:"+JSON.parse(this.user).key_value)
    this.basic ={"Authorization": "Basic "+this.key};
    return this.http.delete(this.urlPolicy+"/"+id,{headers:this.basic})
  }
}
