import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Urlprotection } from '../model/urlprotection';

@Injectable({
  providedIn: 'root'
})
export class UrlprotectionService {
  //urlUrlProtection="http://45.76.121.27:8080/urlprotection"
  //urlUrlProtection="http://144.202.71.141:8080/urlprotection"
  //urlUrlProtection="https://firewall.servcenter.net/wael/urlprotection"
  urlUrlProtection="http://localhost:8080/urlprotection"

  user:any
  key:any
  basic:any

  constructor(private http:HttpClient) { }

  getAllUrlProtection(){
    this.user=localStorage.getItem('user')
    this.key = btoa("user:"+JSON.parse(this.user).key_value)
    this.basic ={"Authorization": "Basic "+this.key};
    return this.http.get<any>(this.urlUrlProtection,{headers:this.basic})
  }
  getAllUrlProtectionByserver(server_id:any){
    this.user=localStorage.getItem('user')
    this.key = btoa("user:"+JSON.parse(this.user).key_value)
    this.basic ={"Authorization": "Basic "+this.key};
    return this.http.get<any>(this.urlUrlProtection+"/server/"+server_id,{headers:this.basic})
  }
  getUrlProtectionById(code:any){
    this.user=localStorage.getItem('user')
    this.key = btoa("user:"+JSON.parse(this.user).key_value)
    this.basic ={"Authorization": "Basic "+this.key};
    return this.http.get<any>(this.urlUrlProtection+"/"+code,{headers:this.basic})
  }

  saveUrlProtection(urlProtection:Urlprotection){
    this.user=localStorage.getItem('user')
    this.key = btoa("user:"+JSON.parse(this.user).key_value)
    this.basic ={"Authorization": "Basic "+this.key};
    return this.http.post(this.urlUrlProtection,urlProtection,{headers:this.basic})
  }
  updateUrlProtection(urlProtection:Urlprotection,id:any){
    this.user=localStorage.getItem('user')
    this.key = btoa("user:"+JSON.parse(this.user).key_value)
    this.basic ={"Authorization": "Basic "+this.key};
    return this.http.put<any>(this.urlUrlProtection+"/"+id,urlProtection,{headers:this.basic})
  }
  deleteUrlProtection(id:any){
    this.user=localStorage.getItem('user')
    this.key = btoa("user:"+JSON.parse(this.user).key_value)
    this.basic ={"Authorization": "Basic "+this.key};
    return this.http.delete(this.urlUrlProtection+"/"+id,{headers:this.basic})
  }
}
