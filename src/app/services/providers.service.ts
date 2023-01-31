import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Provider } from '../model/provider';

@Injectable({
  providedIn: 'root'
})
export class ProvidersService {
  //urlProvider="http://45.76.121.27:8080/providers"
  //urlProvider="http://144.202.71.141:8080/providers"
  //urlProvider="https://firewall.servcenter.net/wael/providers"
  urlProvider="http://localhost:8080/providers"

  user:any
  key:any
  basic:any

  constructor(private http:HttpClient) { }

  getAllProviders(account_id:any){
    this.user=localStorage.getItem('user')
    this.key = btoa("user:"+JSON.parse(this.user).key_value)
    this.basic ={"Authorization": "Basic "+this.key};
    return this.http.get<any>(this.urlProvider+"/account/"+account_id,{headers:this.basic})
  }
  addProvider(provider:Provider){
    this.user=localStorage.getItem('user')
    this.key = btoa("user:"+JSON.parse(this.user).key_value)
    this.basic ={"Authorization": "Basic "+this.key};
    return this.http.post(this.urlProvider,provider,{headers:this.basic})
  }
}
