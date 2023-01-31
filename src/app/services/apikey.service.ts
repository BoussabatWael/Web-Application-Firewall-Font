import { ApiKeys } from './../model/api-keys';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApikeyService {
  //urlApiKey="http://45.76.121.27:8080/accounts"
  //urlApiKey="http://144.202.71.141:8080/accounts"
  //urlApiKey="https://firewall.servcenter.net/wael/apikeys"
  urlApiKey="http://localhost:8080/apikeys"

  user:any
  key:any
  basic:any

  constructor(private http:HttpClient) { }

  getAllApikeys(){
    this.user=localStorage.getItem('user')
    this.key = btoa("user:"+JSON.parse(this.user).key_value)
    this.basic ={"Authorization": "Basic "+this.key};
    return this.http.get<any>(this.urlApiKey,{headers:this.basic})
  }
  getApiKeyById(code:any){
    this.user=localStorage.getItem('user')
    this.key = btoa("user:"+JSON.parse(this.user).key_value)
    this.basic ={"Authorization": "Basic "+this.key};
    return this.http.get<any>(this.urlApiKey+"/"+code,{headers:this.basic})
  }
  getActiveApiKey(account_id:any){
    this.user=localStorage.getItem('user')
    this.key = btoa("user:"+JSON.parse(this.user).key_value)
    this.basic ={"Authorization": "Basic "+this.key};
    return this.http.get<any>(this.urlApiKey+"/account/"+account_id,{headers:this.basic})
  }
  updateApiKey(apikey:ApiKeys,id:any){
    this.user=localStorage.getItem('user')
    this.key = btoa("user:"+JSON.parse(this.user).key_value)
    this.basic ={"Authorization": "Basic "+this.key};
    return this.http.put<any>(this.urlApiKey+"/"+id,apikey,{headers:this.basic})
  }
  addApiKey(apikey:ApiKeys){
    this.user=localStorage.getItem('user')
    this.key = btoa("user:"+JSON.parse(this.user).key_value)
    this.basic ={"Authorization": "Basic "+this.key};
    return this.http.post(this.urlApiKey,apikey,{headers:this.basic})
  }
}
