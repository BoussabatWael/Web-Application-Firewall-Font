import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { UsersPermissions } from '../model/users-permissions';

@Injectable({
  providedIn: 'root'
})
export class UsersPermissionsService {
  //urlUserPermission="http://45.76.121.27:8080/userspermissions"
  //urlUserPermission="http://144.202.71.141:8080/userspermissions"
  //urlUserPermission="https://firewall.servcenter.net/wael/userspermissions"
  urlUserPermission="http://localhost:8080/userspermissions"

  user:any
  key:any
  basic:any

  constructor(private http:HttpClient) { }

  getAllUsersPermissions(){
    this.user=localStorage.getItem('user')
    this.key = btoa("user:"+JSON.parse(this.user).key_value)
    this.basic ={"Authorization": "Basic "+this.key};
    return this.http.get<any>(this.urlUserPermission,{headers:this.basic})
  }
  getUserPermissionsById(code:any){
    this.user=localStorage.getItem('user')
    this.key = btoa("user:"+JSON.parse(this.user).key_value)
    this.basic ={"Authorization": "Basic "+this.key};
    return this.http.get<any>(this.urlUserPermission+"/"+code,{headers:this.basic})
  }
  getUserPermissionsByUserId(id:any){
    this.user=localStorage.getItem('user')
    this.key = btoa("user:"+JSON.parse(this.user).key_value)
    this.basic ={"Authorization": "Basic "+this.key};
    return this.http.get<any>(this.urlUserPermission+"/user/"+id,{headers:this.basic})
  }
  saveUserPermissions(userPermission:UsersPermissions){
    this.user=localStorage.getItem('user')
    this.key = btoa("user:"+JSON.parse(this.user).key_value)
    this.basic ={"Authorization": "Basic "+this.key};
    return this.http.post(this.urlUserPermission,userPermission,{headers:this.basic})
  }
  updateUserPermissions(userPermission:UsersPermissions,id:any){
    this.user=localStorage.getItem('user')
    this.key = btoa("user:"+JSON.parse(this.user).key_value)
    this.basic ={"Authorization": "Basic "+this.key};
    return this.http.put<any>(this.urlUserPermission+"/"+id,userPermission,{headers:this.basic})
  }
  deleteUserPermissions(id:any){
    this.user=localStorage.getItem('user')
    this.key = btoa("user:"+JSON.parse(this.user).key_value)
    this.basic ={"Authorization": "Basic "+this.key};
    return this.http.delete(this.urlUserPermission+"/"+id,{headers:this.basic})
  }
}
