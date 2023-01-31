import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Account } from '../model/account';

@Injectable({
  providedIn: 'root'
})
export class AccountsService {
  //urlAccount="http://45.76.121.27:8080/accounts"
  //urlAccount="http://144.202.71.141:8080/accounts"
  //urlAccount="https://firewall.servcenter.net/wael/accounts"
  urlAccount="http://localhost:8080/accounts"

  user:any
  key:any
  basic:any

  constructor(private http:HttpClient) { }

  getAllAccounts(){
    this.user=localStorage.getItem('user')
    this.key = btoa("user:"+JSON.parse(this.user).key_value)
    this.basic ={"Authorization": "Basic "+this.key};
    return this.http.get<any>(this.urlAccount,{headers:this.basic})
  }
  getAccountById(code:any){
    this.user=localStorage.getItem('user')
    this.key = btoa("user:"+JSON.parse(this.user).key_value)
    this.basic ={"Authorization": "Basic "+this.key};
    return this.http.get<any>(this.urlAccount+"/"+code,{headers:this.basic})
  }
  updateAccount(account:Account,id:any){
    this.user=localStorage.getItem('user')
    this.key = btoa("user:"+JSON.parse(this.user).key_value)
    this.basic ={"Authorization": "Basic "+this.key};
    return this.http.put<any>(this.urlAccount+"/"+id,account,{headers:this.basic})
  }
  saveAccount(accounts:Account){
    this.user=localStorage.getItem('user')
    this.key = btoa("user:"+JSON.parse(this.user).key_value)
    this.basic ={"Authorization": "Basic "+this.key};
    return this.http.post(this.urlAccount,accounts,{headers:this.basic})
  }
}
