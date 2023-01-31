import { AppComponent } from './../../app.component';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/model/user';
import { UsersPermissionsService } from 'src/app/services/users-permissions.service';
import { UsersService } from 'src/app/services/users.service';
import Swal from 'sweetalert2';
import * as CryptoJS from 'crypto-js';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public loginForm!: FormGroup
  user : User = new User()
  usersList:User[]=[]
  routeURL!: string;
  submitted = false;
userPermission:any
usrPer:any
  constructor(private fb: FormBuilder,private router: Router,
    private usersPermissionsService:UsersPermissionsService,private usersService:UsersService,private AppComponent:AppComponent) {
    this.routeURL = this.router.url;

    this.loginForm = this.fb.group(
      {
        username: ['', Validators.required],
        password: ['', Validators.required],
      }
    )
   }

  ngOnInit(): void {
    if (localStorage.getItem("user") === null) {
      this.router.navigateByUrl('')
    }else{
      this.router.navigateByUrl('dashboard')
    }
}
  get form(){
    return this.loginForm.controls
  }
  encrypt(text: any) {
    let key ='AAAAAAAAAAAAAAAA'//key used in Python
    let k = CryptoJS.enc.Utf8.parse(key);
    let iv = CryptoJS.enc.Utf8.parse('BBBBBBBBBBBBBBBB')
    let encrypted = CryptoJS.AES.encrypt(text, k, { iv: iv, mode: CryptoJS.mode.CBC});
    let enc =encrypted.toString();
    return enc;
   }
   decrypt(text:any) {
    let iv = CryptoJS.enc.Utf8.parse('BBBBBBBBBBBBBBBB');
    let key ='AAAAAAAAAAAAAAAA'//key used in Python
    let k = CryptoJS.enc.Utf8.parse(key);
    let decrypted =  CryptoJS.AES.decrypt(text, k, { iv: iv, mode: CryptoJS.mode.CBC});
    let dec = decrypted.toString(CryptoJS.enc.Utf8);
    return dec;
   }
  login(username:any,password:any){
    if (this.loginForm.invalid || this.loginForm.value.length == 0) {
      this.submitted = true;
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Fill all information!'
      })
      return;

    }
    let data = this.loginForm.value
    this.user.username = data.username
    this.usersService.getUser(this.user.username).subscribe(
      result=>{
        this.user = result
        if(result){
          if(this.decrypt(result.password) == data.password){
            this.user.password = result.password

            localStorage.setItem("user",JSON.stringify(result))

            this.AppComponent.setToken(this.user.key_value)

            this.usersPermissionsService.getUserPermissionsByUserId(result.id).subscribe(
                  result=>{
                    this.userPermission = result
                    this.usrPer = JSON.parse(this.userPermission.code);

                    localStorage.setItem("permissions",JSON.stringify(this.usrPer))

                    this.router.navigateByUrl('dashboard');

                  },
                  error=>{

                   }
                )
          }
          else{
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'Error credentials !'
            })
          }
        }else{
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'User does not exists !'
          })
        }

      },error=>{
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Something went wrong !'
        })
      }
    )
  }
}
