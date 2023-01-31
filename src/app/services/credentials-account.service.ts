import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CredentialsAccount } from '../model/credentials-account';

@Injectable({
  providedIn: 'root'
})
export class CredentialsAccountService {
 //urlCredentials="http://45.76.121.27:8080/credentialsaccounts"
 //urlCredentials="http://144.202.71.141:8080/credentialsaccounts"
 //urlCredentials="https://firewall.servcenter.net/wael/credentialsaccounts"
 urlCredentials="http://localhost:8080/credentialsaccounts"

  user:any
  key:any
  basic:any

 constructor(private http:HttpClient) { }

 getAllCredentials(){
    this.user=localStorage.getItem('user')
    this.key = btoa("user:"+JSON.parse(this.user).key_value)
    this.basic ={"Authorization": "Basic "+this.key};
  return this.http.get<any>(this.urlCredentials,{headers:this.basic})

 }
 getCredentialsById(id:any){
    this.user=localStorage.getItem('user')
    this.key = btoa("user:"+JSON.parse(this.user).key_value)
    this.basic ={"Authorization": "Basic "+this.key};
  return this.http.get<any>(this.urlCredentials+"/"+id,{headers:this.basic})
 }
 getCredentialsBySourceId(code:any){
    this.user=localStorage.getItem('user')
    this.key = btoa("user:"+JSON.parse(this.user).key_value)
    this.basic ={"Authorization": "Basic "+this.key};
  return this.http.get<any>(this.urlCredentials+"/source/"+code,{headers:this.basic})
 }
 deleteCredentials(id:any){
    this.user=localStorage.getItem('user')
    this.key = btoa("user:"+JSON.parse(this.user).key_value)
    this.basic ={"Authorization": "Basic "+this.key};
  return this.http.delete(this.urlCredentials+"/"+id,{headers:this.basic})
}
updateCredentials(credentials:CredentialsAccount,id:any){
    this.user=localStorage.getItem('user')
    this.key = btoa("user:"+JSON.parse(this.user).key_value)
    this.basic ={"Authorization": "Basic "+this.key};
  return this.http.put<any>(this.urlCredentials+"/"+id,credentials,{headers:this.basic})
}
saveCredentials(credentials:CredentialsAccount){
    this.user=localStorage.getItem('user')
    this.key = btoa("user:"+JSON.parse(this.user).key_value)
    this.basic ={"Authorization": "Basic "+this.key};
  return this.http.post(this.urlCredentials,credentials,{headers:this.basic})
}
}
