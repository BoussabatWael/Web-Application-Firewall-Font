import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Note } from '../model/note';

@Injectable({
  providedIn: 'root'
})
export class NotesService {
  //urlNote="http://45.76.121.27:8080/notes"
  //urlNote="http://144.202.71.141:8080/notes"
  //urlNote="https://firewall.servcenter.net/wael/notes"
  urlNote="http://localhost:8080/notes"

  user:any
  key:any
  basic:any

  constructor(private http:HttpClient) { }

  getAllNotes(){
    this.user=localStorage.getItem('user')
    this.key = btoa("user:"+JSON.parse(this.user).key_value)
    this.basic ={"Authorization": "Basic "+this.key};
    return this.http.get<any>(this.urlNote,{headers:this.basic})
  }
  saveNote(note:Note){
    this.user=localStorage.getItem('user')
    this.key = btoa("user:"+JSON.parse(this.user).key_value)
    this.basic ={"Authorization": "Basic "+this.key};
    return this.http.post(this.urlNote,note,{headers:this.basic})
  }
}
