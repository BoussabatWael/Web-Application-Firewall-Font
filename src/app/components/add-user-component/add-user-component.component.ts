import { Component, ElementRef, OnInit, Renderer2 } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Account } from 'src/app/model/account';
import { User } from 'src/app/model/user';
import { UsersLogs } from 'src/app/model/users-logs';
import { UsersPermissions } from 'src/app/model/users-permissions';
import { AccountsService } from 'src/app/services/accounts.service';
import { UsersLogsService } from 'src/app/services/users-logs.service';
import { UsersPermissionsService } from 'src/app/services/users-permissions.service';
import { UsersService } from 'src/app/services/users.service';
import Swal from 'sweetalert2';
import * as CryptoJS from 'crypto-js';

@Component({
  selector: 'app-add-user-component',
  templateUrl: './add-user-component.component.html',
  styleUrls: ['./add-user-component.component.css']
})
export class AddUserComponentComponent implements OnInit {
  user:any
  d:any
  acc:any
  account:any
  generatedKey=""
  public userForm!:FormGroup
  AccountsList:Account[]=[]
  userPermissions: UsersPermissions = new UsersPermissions()
  userLogs:UsersLogs = new UsersLogs()
  submitted = false;
  records:any
  usersList:User[] = []
  browserName = '';
  browserVersion = '';
  constructor(private fb:FormBuilder,private accountsService:AccountsService,private userService:UsersService,
    private usersPermissionsService:UsersPermissionsService,private usersLogsService:UsersLogsService,
    private route:Router,private renderer: Renderer2, private el: ElementRef) {
    this.userForm=this.fb.group(
      {
      username:['',Validators.required],
      role:['',Validators.required],
      status:[''],
      language:[''],
      timezone:[''],
      password:['',Validators.required],
      ip_address:[''],
      photo:[''],
      account: this.fb.group({
        id: ['']
      })
    }
    )
   }
   getAllAccounts(){
    this.accountsService.getAllAccounts().subscribe(
      result=>{
        this.AccountsList=result

      },
      error=>{
      }
    )
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
  ngOnInit(): void {

    if (localStorage.getItem("user") === null) {
      this.route.navigateByUrl('')
    }
    this.user = localStorage.getItem('user');
    this.d = JSON.parse(this.user)
    this.acc = this.d['account']
    this.account = JSON.stringify(this.acc)

    this.getAllAccounts()

    const parent = this.renderer.parentNode(this.el.nativeElement);

    if (parent.getElementsByTagName('LABEL').length && !parent.getElementsByClassName('required-asterisk').length) {
      parent.getElementsByTagName('LABEL')[0].innerHTML += '<span class="required-asterisk">*</span>';
    }

    this.browserName = this.detectBrowserName();
    this.browserVersion = this.detectBrowserVersion();

  }
 detectBrowserName() {
    const agent = window.navigator.userAgent.toLowerCase()
    switch (true) {
      case agent.indexOf('edge') > -1:
        return 'edge';
      case agent.indexOf('opr') > -1 && !!(<any>window).opr:
        return 'opera';
      case agent.indexOf('chrome') > -1 && !!(<any>window).chrome:
        return 'chrome';
      case agent.indexOf('trident') > -1:
        return 'ie';
      case agent.indexOf('firefox') > -1:
        return 'firefox';
      case agent.indexOf('safari') > -1:
        return 'safari';
      default:
        return 'other';
    }
  }

  detectBrowserVersion(){
      var userAgent = navigator.userAgent, tem,
      matchTest = userAgent.match(/(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i) || [];

      if(/trident/i.test(matchTest[1])){
          tem =  /\brv[ :]+(\d+)/g.exec(userAgent) || [];
          return 'IE '+(tem[1] || '');
      }
      if(matchTest[1]=== 'Chrome'){
          tem = userAgent.match(/\b(OPR|Edge)\/(\d+)/);
          if(tem!= null) return tem.slice(1).join(' ').replace('OPR', 'Opera');
      }
      matchTest= matchTest[2]? [matchTest[1], matchTest[2]]: [navigator.appName, navigator.appVersion, '-?'];
      if((tem= userAgent.match(/version\/(\d+)/i))!= null) matchTest.splice(1, 1, tem[1]);
      return matchTest.join(' ');
  }
  get form() {
    return this.userForm.controls;
  }
  file:any; imgUrl:any
    selectImge(event:any){
    this.file=event.target.files[0];
    let fr=new FileReader();
    fr.readAsDataURL(this.file)
    fr.onload=(event)=>this.imgUrl=fr.result}

  addUser(){
    this.userForm.patchValue({account:this.acc})
    let data=this.userForm.value
    let username = data.username

     if (this.userForm.invalid || this.userForm.value.length == 0) {
      this.submitted = true;

      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Fill all information!'
      })
      return;
    }
    this.userService.getUserByUsername(username).subscribe(
      result=>{
        this.usersList = result
        if(this.usersList !== null){
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Choose another username please !'
          })
        }else{
          data.status = 1
          data.start_date = new Date()
          data.browser = this.browserName
          let fd = new FormData();
          fd.append("users", JSON.stringify(data));
          fd.append("file", this.file);

          if(this.file){
            this.userService.saveUser1(fd).subscribe(
              result=>{
                this.records = result
                this.userPermissions.status=1
                this.userPermissions.users = result
                if(this.userPermissions.users.role == 2){
                  this.userPermissions.code=JSON.stringify({"users":["create","view","edit","delete"],"servers":["create","view","edit","delete"],"rules":["view","create","edit","delete"],"groups":["view","create","edit","delete"],"policies":["view","create","edit","delete"]});
                }
                else if(this.userPermissions.users.role == 3){
                  this.userPermissions.code=JSON.stringify({"users":["create","view"],"servers":["create","view"],"rules":["view","create"],"groups":["view","create"],"policies":["view","create"]});
                }
                else if(this.userPermissions.users.role == 4){
                  this.userPermissions.code=JSON.stringify({"users":["create","view"],"servers":["create","view"],"rules":["view","create"],"groups":["view","create"],"policies":["view","create"]});
                }
                this.usersPermissionsService.saveUserPermissions(this.userPermissions).subscribe(
                  result=>{
                    this.CreateLogs("create",new Date(),1,this.userPermissions.users?.id!,this.d,1)
                  },
                  error=>{
                    confirm("Please check your informations again")
                  }
                )

                const Toast = Swal.mixin({
                  toast: true,
                  position: 'top-right',
                  showConfirmButton: false,
                  timer: 3500,
                  timerProgressBar: true,
                  didOpen: (toast) => {
                    toast.addEventListener('mouseenter', Swal.stopTimer)
                    toast.addEventListener('mouseleave', Swal.resumeTimer)
                  }
                })

                Toast.fire({
                  icon: 'success',
                  title: 'User Added successfully'
                })
                this.userPermissions.users.photo = this.records.photo
                this.route.navigateByUrl('/settings')
              },
              error=>{
                Swal.fire({
                  icon: 'error',
                  title: 'Oops...',
                  text: 'Something went wrong!'
                })
              }
            )
          }
          else{
            this.userService.saveUser(data).subscribe(
              result=>{
                this.userPermissions.status=1
                this.userPermissions.users = result
                if(this.userPermissions.users.role == 2){
                  this.userPermissions.code=JSON.stringify({"users":["create","view","edit","delete"],"servers":["create","view","edit","delete"],"rules":["view","create","edit","delete"],"groups":["view","create","edit","delete"],"policies":["view","create","edit","delete"]});
                }
                else if(this.userPermissions.users.role == 3){
                  this.userPermissions.code=JSON.stringify({"users":["create","view"],"servers":["create","view"],"rules":["view","create"],"groups":["view","create"],"policies":["view","create"]});
                }
                else if(this.userPermissions.users.role == 4){
                  this.userPermissions.code=JSON.stringify({"users":["create","view"],"servers":["create","view"],"rules":["view","create"],"groups":["view","create"],"policies":["view","create"]});
                }
                this.usersPermissionsService.saveUserPermissions(this.userPermissions).subscribe(
                  result=>{

                  this.CreateLogs("create",new Date(),1,this.userPermissions.users?.id!,this.d,1)

                  },
                  error=>{
                    confirm("Please check your informations again")
                  }
                )

                const Toast = Swal.mixin({
                  toast: true,
                  position: 'top-right',
                  showConfirmButton: false,
                  timer: 3500,
                  timerProgressBar: true,
                  didOpen: (toast) => {
                    toast.addEventListener('mouseenter', Swal.stopTimer)
                    toast.addEventListener('mouseleave', Swal.resumeTimer)
                  }
                })

                Toast.fire({
                  icon: 'success',
                  title: 'User Added successfully'
                })
                this.route.navigateByUrl('/settings')
              },
              error=>{
                Swal.fire({
                  icon: 'error',
                  title: 'Oops...',
                  text: 'Something went wrong!'
                })
              }
            )
          }
        }
      },error=>{

      }
    )


  }

  CreateLogs(action:String,action_date:Date,element:number,element_id:number,users:User,source:number){
    this.userLogs.action = action
    this.userLogs.action_date = action_date
    //Accounts=0, Users=1, Servers=2, rules=3,groups=4,policies=5
    this.userLogs.element = element
    this.userLogs.element_id = element_id
    this.userLogs.users = users
    // /account = 0, /users=1, /servers=2, /rules=3, /groups=4, /policies=5
    this.userLogs.source = source

    this.usersLogsService.saveUserLogs(this.userLogs).subscribe(
    result=>{

    },
    error=>{
    confirm("Please check your informations again")
          }
        )
   }
  ValidateIPaddress(ipaddress:any)
{
 if (/^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/.test(this.userForm.get('ip_address')?.value))
  {
    return (true)
  }
  Swal.fire({
    icon: 'error',
    title: 'Oops...',
    text: 'You have entered an invalid IP address!'
  })
return (false)
}
}
