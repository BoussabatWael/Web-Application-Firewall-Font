import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Group } from '../model/group';

@Injectable({
  providedIn: 'root'
})
export class GroupsService {
  //urlGroup="http://45.76.121.27:8080/groups"
  //urlGroup="http://144.202.71.141:8080/groups"
  //urlGroup="https://firewall.servcenter.net/wael/groups"
  urlGroup="http://localhost:8080/groups"

  user:any
  key:any
  basic:any

  constructor(private http:HttpClient) { }

  getAllGroups(){
    this.user=localStorage.getItem('user')
    this.key = btoa("user:"+JSON.parse(this.user).key_value)
    this.basic ={"Authorization": "Basic "+this.key};
    return this.http.get<any>(this.urlGroup,{headers:this.basic})

  }
  getGroups(code:any){
    this.user=localStorage.getItem('user')
    this.key = btoa("user:"+JSON.parse(this.user).key_value)
    this.basic ={"Authorization": "Basic "+this.key};
    return this.http.get<any>(this.urlGroup+"/account/"+code,{headers:this.basic})
  }
  saveGroup(group:Group){
    this.user=localStorage.getItem('user')
    this.key = btoa("user:"+JSON.parse(this.user).key_value)
    this.basic ={"Authorization": "Basic "+this.key};
    return this.http.post(this.urlGroup,group,{headers:this.basic})
  }
  getGroupById(code:any){
    this.user=localStorage.getItem('user')
    this.key = btoa("user:"+JSON.parse(this.user).key_value)
    this.basic ={"Authorization": "Basic "+this.key};
    return this.http.get<any>(this.urlGroup+"/"+code,{headers:this.basic})
  }
  getGroupsList(r_id:any,acc_id:any){
    this.user=localStorage.getItem('user')
    this.key = btoa("user:"+JSON.parse(this.user).key_value)
    this.basic ={"Authorization": "Basic "+this.key};
    return this.http.get<any>(this.urlGroup+"/rule/"+r_id+"/"+acc_id,{headers:this.basic})
  }
  updateGroup(group:Group,id:any){
    this.user=localStorage.getItem('user')
    this.key = btoa("user:"+JSON.parse(this.user).key_value)
    this.basic ={"Authorization": "Basic "+this.key};
    return this.http.put<any>(this.urlGroup+"/"+id,group,{headers:this.basic})
  }
  deleteGroup(id:any){
    this.user=localStorage.getItem('user')
    this.key = btoa("user:"+JSON.parse(this.user).key_value)
    this.basic ={"Authorization": "Basic "+this.key};
    return this.http.delete(this.urlGroup+"/"+id,{headers:this.basic})
  }
}
