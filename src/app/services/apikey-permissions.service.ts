import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiKeysPermissions } from '../model/api-keys-permissions';

@Injectable({
  providedIn: 'root'
})
export class ApikeyPermissionsService {
  //urlApiKeyPermissions="http://45.76.121.27:8080/accounts"
  //urlApiKeyPermissions="http://144.202.71.141:8080/accounts"
  //urlApiKeyPermissions="https://firewall.servcenter.net/wael/apikeypermissions"
  urlApiKeyPermissions="http://localhost:8080/apikeypermissions"

  user:any
  key:any
  basic:any

  constructor(private http:HttpClient) { }

  getAllApiKeyPermissions(){
    this.user=localStorage.getItem('user')
    this.key = btoa("user:"+JSON.parse(this.user).key_value)
    this.basic ={"Authorization": "Basic "+this.key};
    return this.http.get<any>(this.urlApiKeyPermissions,{headers:this.basic})
  }
  getApiKeyPermissionsById(code:any){
    this.user=localStorage.getItem('user')
    this.key = btoa("user:"+JSON.parse(this.user).key_value)
    this.basic ={"Authorization": "Basic "+this.key};
    return this.http.get<any>(this.urlApiKeyPermissions+"/"+code,{headers:this.basic})
  }
  updateApiKeyPermissions(apikeyPermissions:ApiKeysPermissions,id:any){
    this.user=localStorage.getItem('user')
    this.key = btoa("user:"+JSON.parse(this.user).key_value)
    this.basic ={"Authorization": "Basic "+this.key};
    return this.http.put<any>(this.urlApiKeyPermissions+"/"+id,apikeyPermissions,{headers:this.basic})
  }
  saveApiKeyPermissions(apikeyPermissions:ApiKeysPermissions){
    this.user=localStorage.getItem('user')
    this.key = btoa("user:"+JSON.parse(this.user).key_value)
    this.basic ={"Authorization": "Basic "+this.key};
    return this.http.post(this.urlApiKeyPermissions,apikeyPermissions,{headers:this.basic})
  }
  getApiKeyPermissionsList(apikey:any){
    this.user=localStorage.getItem('user')
    this.key = btoa("user:"+JSON.parse(this.user).key_value)
    this.basic ={"Authorization": "Basic "+this.key};
    return this.http.get<any>(this.urlApiKeyPermissions+"/apikey/"+apikey,{headers:this.basic})
  }
}
