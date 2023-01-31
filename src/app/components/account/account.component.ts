import { ApikeyPermissionsService } from './../../services/apikey-permissions.service';
import { ApiKeys } from './../../model/api-keys';
import { Component, ElementRef, OnInit, Renderer2, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { Account } from 'src/app/model/account';
import { User } from 'src/app/model/user';
import { UsersLogs } from 'src/app/model/users-logs';
import { AccountsService } from 'src/app/services/accounts.service';
import { UsersLogsService } from 'src/app/services/users-logs.service';
import { UsersService } from 'src/app/services/users.service';
import Swal from 'sweetalert2';
import * as CryptoJS from 'crypto-js';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ApikeyService } from 'src/app/services/apikey.service';
import { ApiKeysPermissions } from 'src/app/model/api-keys-permissions';


@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {
  public profileEditForm!: FormGroup
  public KeyFormAdd!: FormGroup
  AccountsList:Account[]=[]
  userLogsList:UsersLogs[]=[]
  apiKeysList:any
  userr : User = new User()
  apiKey : ApiKeys = new ApiKeys()
  apiKeyPermission : ApiKeysPermissions = new ApiKeysPermissions()
  userLogs:UsersLogs=new UsersLogs()
  user:any
  data:any
  acc:any
  account:any
  LastUserLogs:any
  hasChange : boolean = false;
  hasChange2 : boolean = false;
  submitted : boolean = false
  p:number=1
  p1:number=1
  searchText:any
  searchText1:any
  apikey:any
  apiPermission:any
  ApiPermissionsList:any
  ApiPermissionsList1:any
  elementType :{ [key: string]: any } = {
    0:"Accounts",
    1:"Users",
    2:"Servers",
    3:"Rules",
    4:"Groups",
    5:"Policies",
    6:"Rules instances",
    7:"Groups rules",
    8:"Policies instances",
    9:"SSH credentials",
    10:"User permissions",
    15:"User server rule",
    16:"User server",
    17:"API key",
    18:"API key permission",
    19:"Category",
    20:"Provider"
  } ;
  sourceType :{ [key: string]: any } = {
    0:"Accounts",
    1:"Users",
    2:"Servers",
    3:"Rules",
    4:"Groups",
    5:"Policies",
    6:"Rules Instances",
    7:"Groups Rules",
    8:"Policies Instances",
    9:"SSH Credentials",
    10:"User Permissions",
    11:"Desktop"
  }

  constructor(private fb: FormBuilder,private accountsService:AccountsService,private usersService:UsersService,
    private userLogsService:UsersLogsService,private usersLogsService:UsersLogsService, private router:Router,
    private SpinnerService: NgxSpinnerService, private modalService: NgbModal, private apikeyService:ApikeyService,
    private apikeyPermissionsService:ApikeyPermissionsService, private renderer: Renderer2, private el: ElementRef) {
      this.profileEditForm = this.fb.group(
        {
          username: ['',Validators.required],
          password:['',Validators.required]
        })
      this.KeyFormAdd = this.fb.group(
      {
        id: [''],
        key: ['', Validators.required],
        end_date: [''],
        start_date: [''],
        status: [''],
        account: this.fb.group({
          id: ['']
        })
      }
    )
      }

  ngOnInit(): void {

    if (localStorage.getItem("user") === null) {
      this.router.navigateByUrl('')
    }
    this.user = localStorage.getItem('user');
    this.data = JSON.parse(this.user)
    this.acc = this.data['account']
    this.account = JSON.stringify(this.acc)


    this.getUserLogs()
    this.getLastUserLogs()
    this.getApiKeyList()

    const parent = this.renderer.parentNode(this.el.nativeElement);

    if (parent.getElementsByTagName('LABEL').length && !parent.getElementsByClassName('required-asterisk').length) {
      parent.getElementsByTagName('LABEL')[0].innerHTML += '<span class="required-asterisk">*</span>';
    }

}

  getApiKeyList(){
  this.apikeyService.getActiveApiKey(this.data.account.id).subscribe(
  result=>{
  this.apiKeysList = result
  },error=>{
  }
  )
  }
getLastUserLogs(){
  this.usersLogsService.getLastUserLogsByUserId(this.data.id).subscribe(
    result=>{
      this.LastUserLogs = result.map( (elem:any) => {elem.element = this.elementType[elem.element];elem.source = this.sourceType[elem.source]; return elem})
    },
    error=>{

    }
  )
}
  get form() {
    return this.profileEditForm.controls;
  }
  get KeyAdd() {
    return this.KeyFormAdd.controls;
  }
  deleteKey(id:any){
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't to delete this key ?!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.apikeyService.getApiKeyById(id).subscribe(
          result => {
            let api_key = result
            api_key.status = 4
            api_key.end_date = new Date()
            this.apikeyService.updateApiKey(api_key, id).subscribe(
                  result => {
                    //usr = result
                    let row = document.getElementById(id);
                    if (row != null) {
                      row.remove()
                      this.apiKeysList = this.apiKeysList.filter((key: any) => key.id != id);
                      this.CreateLogs("delete",new Date(),17,id,this.data,0,'')
                    }
                  },
                  error => {
                  }
            )
          },
          error => {
          }
        )
        Swal.fire('Deleted!',
          'Key has been deleted.',
          'success'
        )
      }
    })
  }
  addKey(){
  if (this.KeyFormAdd.invalid || this.KeyFormAdd.value.length == 0) {
      this.submitted = true;
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Fill all information!'
      })
      return;
    }

      this.apiKey.key_value = this.KeyFormAdd.value.key
      this.apiKey.status = 1
      this.apiKey.account = this.data.account
      this.apiKey.start_date = new Date()
      this.apikeyService.addApiKey(this.apiKey).subscribe(
      result=>{
        this.apiKey = result
        this.CreateLogs("create",new Date(),17,this.apiKey.id,this.data,0,'')
        this.getApiKeyList()
        this.apiKeyPermission.api_key = this.apiKey
        this.apiKeyPermission.status = 1
        this.apiKeyPermission.start_date = new Date()
        this.apiKeyPermission.end_date = undefined
        this.apiKeyPermission.permission = JSON.stringify({"users":[],"servers":[],"rules":[],"groups":[],"policies":[]});
        this.apikeyPermissionsService.saveApiKeyPermissions(this.apiKeyPermission).subscribe(
        result=>{
            this.apiKeyPermission = result
            this.CreateLogs("create",new Date(),18,this.apiKeyPermission.id,this.data,0,'')
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
            title: 'Key Added Succefully'
          })
          this.onSubmit()
        },error=>{

        }
        )

      },error=>{
        Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Something went wrong !'
      })
      }
      )
  }
  generateKey(){
    let generatedKey = "";
    let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for (let i = 0; i < 30; i++){
      generatedKey += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    this.KeyFormAdd.patchValue({'key':generatedKey})
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

  updateUser(id:any){
    let username = this.profileEditForm.getRawValue().username
    let password = this.profileEditForm.getRawValue().password
    this.userr.id = this.data.id
    this.userr.username = username
    this.userr.password = password
    this.userr.browser = this.data.browser
    this.userr.last_auth = this.data.last_auth
    this.userr.ip_address = this.data.ip_address
    this.userr.language = this.data.language
    this.userr.photo = this.data.photo
    this.userr.role = this.data.role
    this.userr.status = this.data.status
    this.userr.timezone = this.data.timezone
    this.userr.account = this.data.account
   if (this.profileEditForm.invalid || this.profileEditForm.value.length == 0) {
    this.submitted = true;

    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Fill all information!'
    })
    return;
  }
  this.hasChange = (this.userr.username != this.data.username || this.userr.password != this.data.password || this.userr.browser != this.data.browser || this.userr.last_auth != this.data.last_auth
    || this.userr.ip_address != this.data.ip_address || this.userr.language != this.data.language || this.userr.photo != this.data.photo || this.userr.role != this.data.role
    || this.userr.status != this.data.status || this.userr.timezone != this.data.timezone || this.userr.account != this.data.account)

    if(this.hasChange == true){
      if(this.userr.password != this.data.password){
      this.userr.password = this.encrypt(password)
      this.usersService.updateUser(this.userr,this.data.id).subscribe(
        result=>{
          this.CreateLogs("edit",new Date(),1,id,this.data,0,'')
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
            title: 'Informations are updated Succefully!'
          })
          localStorage.setItem('user',JSON.stringify(this.userr));
          this.data.username = this.userr.username
          this.data.password = this.userr.password
          window.location.reload();
        },
        error=>{
         Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Something went wrong !'
        })
        }
      )
}
      this.usersService.updateUser(this.userr,this.data.id).subscribe(
        result=>{
          this.CreateLogs("edit",new Date(),1,id,this.data,0,'')
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
            title: 'Informations are updated succefully!'
          })
          localStorage.setItem('user',JSON.stringify(this.userr));
          this.data.username = this.userr.username
          window.location.reload();
        },
        error=>{
         Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Something went wrong!'
        })
        }
      )
    }else{
      Swal.fire('Nothing was changed')
    }


    //this.ngOnInit
}
  Onchange(event: Event, action: any) {
    let target = (<HTMLInputElement>event.target);
    let permission = target.closest('tr')?.dataset['permission'];
    if (target.closest('tr') != null && permission != undefined && permission != null) {
      if (target.checked) {
        this.ApiPermissionsList[permission].push(action);
      } else {
        const index = this.ApiPermissionsList[permission].indexOf(action)
        if (index > -1) {
          this.ApiPermissionsList[permission].splice(index, 1)
        }
      }
    }
  }
  getDiff() {
    let test: { [key: string]: any[] } = {}
    for (let key in this.ApiPermissionsList) {
      if (JSON.stringify(this.ApiPermissionsList[key]) === JSON.stringify(this.ApiPermissionsList1[key])) { continue; } else {
        test[key] = this.ApiPermissionsList[key];
      }
    }
    return test;
  }
  save(apikey:any){
  this.apikeyPermissionsService.getApiKeyPermissionsList(apikey.id).subscribe(
      result => {
        let api_key_permissions = result
        let permissions = JSON.parse(api_key_permissions.permission)
        this.ApiPermissionsList1 = permissions
        this.hasChange2 = JSON.stringify(this.ApiPermissionsList) != JSON.stringify(this.ApiPermissionsList1)
        if (this.hasChange2 == true) {
          this.apiKeyPermission.id = api_key_permissions.id;
          this.apiKeyPermission.status = api_key_permissions.status;
          this.apiKeyPermission.start_date = api_key_permissions.start_date;
          this.apiKeyPermission.end_date = api_key_permissions.end_date;
          this.apiKeyPermission.api_key = apikey;
          this.apiKeyPermission.permission = JSON.stringify(this.ApiPermissionsList);
          this.apikeyPermissionsService.updateApiKeyPermissions(this.apiKeyPermission, this.apiKeyPermission.id).subscribe(
            result => {
              //user_permissions =10
              this.CreateLogs("edit",new Date(),18,this.apiKeyPermission.id,this.data,0,JSON.stringify(this.getDiff()))
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
                title: 'API Permissions Edited successfully'
              })
              this.close()
              //this.router.navigateByUrl('/users')
            },
            error => {
              Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Something went wrong !'
              })
            }
          )
        } else {
          Swal.fire('Nothing was changed')
          //this.router.navigateByUrl('/users')
        }
      },
      error => {
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
  getUserLogs(){
    this.userLogsService.getUserLogsByUserId(this.data.id).subscribe(
      result=>{
        this.userLogsList=result.map( (elem:any) => {elem.element = this.elementType[elem.element];elem.source = this.sourceType[elem.source]; return elem})

      },
      error=>{
      }
    )
  }

  openModalAddKey(targetModal: any, apikey: any) {
    this.modalService.open(targetModal, {
      centered: true,
      backdrop: 'static',
    });

  }
 getApiPermissionsList(apikey:any){
  this.apikeyPermissionsService.getApiKeyPermissionsList(apikey.id).subscribe(
  result=>{
  this.ApiPermissionsList = JSON.parse(result.permission)
  },error=>{
  }
  )
  }
 openModalApiPermissions(targetModal: any, apikey: any) {
    this.modalService.open(targetModal, {
      centered: true,
      backdrop: 'static',
      size: 'xl'
    });

  }
  close(){
  this.modalService.dismissAll();
  }
  onSubmit() {
    this.modalService.dismissAll();
    this.KeyFormAdd.reset()
  }
  CreateLogs(action:String,action_date:Date,element:number,element_id:number|undefined,users:User,source:number,code:String){
    this.userLogs.action = action
    this.userLogs.action_date = action_date
    //Accounts=0, Users=1, Servers=2, rules=3,groups=4,policies=5,rules_instances=6,groups_rules=7
    this.userLogs.element = element
    this.userLogs.element_id = element_id
    this.userLogs.users = users
    // /account = 0, /users=1, /servers=2, /rules=3, /groups=4, /policies=5
    this.userLogs.source = source
    this.userLogs.code = code

    this.usersLogsService.saveUserLogs(this.userLogs).subscribe(
    result=>{

    },
    error=>{
          }
        )
   }
}
