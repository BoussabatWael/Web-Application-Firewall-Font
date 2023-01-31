import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Category } from '../model/category';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {
  //urlCategory="http://45.76.121.27:8080/categories"
  //urlCategory="http://144.202.71.141:8080/categories"
  //urlCategory="https://firewall.servcenter.net/wael/categories"
  urlCategory="http://localhost:8080/categories"

  user:any
  key:any
  basic:any

  constructor(private http:HttpClient) { }

  getAllCategories(account_id:any){
    this.user=localStorage.getItem('user')
    this.key = btoa("user:"+JSON.parse(this.user).key_value)
    this.basic ={"Authorization": "Basic "+this.key};
    return this.http.get<any>(this.urlCategory+"/account/"+account_id,{headers:this.basic})
  }

  addCategory(category:Category){
    this.user=localStorage.getItem('user')
    this.key = btoa("user:"+JSON.parse(this.user).key_value)
    this.basic ={"Authorization": "Basic "+this.key};
    return this.http.post(this.urlCategory,category,{headers:this.basic})
  }
}
