import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CredentialsAccount } from './../../model/credentials-account';
import { Component, ElementRef, OnInit, Renderer2 } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Account } from 'src/app/model/account';
import { Category } from 'src/app/model/category';
import { Provider } from 'src/app/model/provider';
import { Server } from 'src/app/model/server';
import { User } from 'src/app/model/user';
import { UsersLogs } from 'src/app/model/users-logs';
import { AccountsService } from 'src/app/services/accounts.service';
import { CategoriesService } from 'src/app/services/categories.service';
import { CredentialsAccountService } from 'src/app/services/credentials-account.service';
import { FirewallScriptService } from 'src/app/services/firewall-script.service';
import { ProvidersService } from 'src/app/services/providers.service';
import { ServersService } from 'src/app/services/servers.service';
import { UsersLogsService } from 'src/app/services/users-logs.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-server',
  templateUrl: './add-server.component.html',
  styleUrls: ['./add-server.component.css']
})
export class AddServerComponent implements OnInit {
  user:any
  d:any
  acc:any
  account:any
  category: Category = new Category()
  provider:Provider = new Provider()
  public serverForm!:FormGroup
  public CategoryFormAdd!:FormGroup
  public ProviderFormAdd!:FormGroup
  AccountsList:Account[]=[]
  CategoriesList:Category[]=[]
  ProvidersList:Provider[]=[]
  server:Server=new Server()
  userLogs:UsersLogs = new UsersLogs()
  submitted=false;
  submitted1=false;
  submitted2=false;
  credentials :CredentialsAccount = new CredentialsAccount()
  response:any
  CredentialsAccount:any
  response2:any
  OS_Message:any
  constructor(private fb:FormBuilder,private serverService:ServersService,private categoryService:CategoriesService,
  private providerService:ProvidersService,private accountsService:AccountsService, private credentialsAccountService:CredentialsAccountService, private firewallScriptService:FirewallScriptService,
  private usersLogsService:UsersLogsService,private route:Router, private modalService:NgbModal, private renderer: Renderer2, private el: ElementRef) {
    this.serverForm=this.fb.group(
      {
      id:[''],
      name:['',Validators.required],
      ip_address:['',Validators.required],
      system_version:[''],
      operating_system:[''],
      status:[''],
      start_date:[''],
      login:[''],
      password:[''],
      port:[''],
      account: this.fb.group({
        id: ['',Validators.required]
      }) ,
      categories: this.fb.group({
        id: ['']
      }) ,
      providers: this.fb.group({
        id: ['']
      })
    }
    )

  this.CategoryFormAdd=this.fb.group(
      {
      id:[''],
      classe:[''],
      name:['',Validators.required],
      account: this.fb.group({
        id: ['',Validators.required]
      })
    }
    )

    this.ProviderFormAdd=this.fb.group(
      {
      id:[''],
      firewall:[''],
      end_date:[''],
      start_date:[''],
      logo:[''],
      name:[''],
      status:[''],
      tag:[''],
      website:[''],
      account: this.fb.group({
        id: ['',Validators.required]
      }),
      categories: this.fb.group({
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
  getAllCategories(account_id:any){
    this.categoryService.getAllCategories(account_id).subscribe(
      result=>{
        this.CategoriesList=result

      },
      error=>{
      }
    )
  }
  getAllProviders(account_id:any){
    this.providerService.getAllProviders(account_id).subscribe(
      result=>{
        this.ProvidersList=result

      },
      error=>{
      }
    )
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
    this.getAllCategories(this.acc.id)
    this.getAllProviders(this.acc.id)

   const parent = this.renderer.parentNode(this.el.nativeElement);

    if (parent.getElementsByTagName('LABEL').length && !parent.getElementsByClassName('required-asterisk').length) {
      parent.getElementsByTagName('LABEL')[0].innerHTML += '<span class="required-asterisk">*</span>';
    }

  }
  get form() {
    return this.serverForm.controls;
  }
  get categoryForm() {
    return this.CategoryFormAdd.controls;
  }
 get providerForm() {
    return this.ProviderFormAdd.controls;
  }
  addServer(){
    this.serverForm.patchValue({account:this.acc})
    let data=this.serverForm.value
    //data.account = this.acc
    data.start_date = new Date()
    data.status = 2
    data.operating_system = undefined
    data.system_version = undefined

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

   if(this.serverForm.value.categories.id == "" || this.serverForm.value.categories.id == null){
    data.categories = undefined
    }
   if(this.serverForm.value.providers.id == "" || this.serverForm.value.providers.id == null){
    data.providers = undefined
    }
    if (this.serverForm.invalid) {
      this.submitted = true;

      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Fill all information!'
      })
      return;
    }else if (!this.ValidateIPaddress(this.server.ip_address)) {
      return;
    }
    if(data.login == "" && data.password == "" && data.port == ""){
      this.serverService.saveServer(data).subscribe(
      result=>{
        this.server = result
        this.CreateLogs("create",new Date(),2,this.server.id!,this.d,2)

        Toast.fire({
          icon: 'success',
          title: 'Server Added successfully'
        })
        this.route.navigateByUrl('/servers')
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
    document.querySelector('.checkOs')?.classList.remove('d-none');
    document.querySelector('.checkOsTitle')!.innerHTML = "Connecting to the server ...";
    this.serverService.saveServer(data).subscribe(
      result=>{
        this.server = result
        this.CreateLogs("create",new Date(),2,this.server.id!,this.d,2)
    this.firewallScriptService.Connect({server_id: this.server.id, Task: "Connect", username: data.login, password:data.password, port:data.port }).subscribe(
      result=>{
        this.response = result
        if (this.response && this.response.code == "success") {

        document.querySelector('.checkOsResults')!.innerHTML += '<div class="alert alert-success mt-4">Connected successfully</div>';
        document.querySelector('.checkOsTitle')!.innerHTML = "Checking Operating system ...";

        this.credentials.login= data.login
        this.credentials.classe = 1
        this.credentials.password= data.password
        this.credentials.name = data.name
        this.credentials.port = data.port
        this.credentials.source = 1
        this.credentials.source_id = this.server.id
        this.credentials.status = 1
        this.credentialsAccountService.saveCredentials(this.credentials).subscribe(
        result=>{
          this.CredentialsAccount = result
          this.CreateLogs("create",new Date(),9,this.CredentialsAccount.id,this.d,2)
          this.firewallScriptService.Check_OS({server_id:this.server.id, Task:"check_os"}).subscribe(
          response2=>{
            this.response2 = response2
            if(this.response2 && this.response2.code == "success"){
            document.querySelector('.checkOsResults')!.innerHTML += '<div class="alert alert-success mt-4">Operating system supported</div>';
            this.server.operating_system = this.response2.data[0]
            this.server.system_version = this.response2.data[1]
            this.server.status = 1
            this.serverService.updateServer(this.server,this.server.id).subscribe(
              result=>{
                  let server  = result
                      Toast.fire({
                        icon: 'success',
                        title: 'Server Added successfully'
                      })
                  this.route.navigateByUrl('/servers')
                   },error=>{
                    }
                 )
        }else{
              document.querySelector('.checkOsResults')!.innerHTML += '<div class="alert alert-danger mt-4">Operating system Not supported</div>';
              Toast.fire({
                icon: 'warning',
                title: 'Operating system not supported!'
              })
            this.OS_Message = 'OS NOT SUPPORTED'
            this.server.operating_system = 'NOT SUPPORTED'
            this.server.system_version = 'NOT SUPPORTED'
            this.server.status = 2
            this.serverService.updateServer(this.server,this.server.id).subscribe(
              result=>{

        Toast.fire({
          icon: 'warning',
          title: 'SERVER OS NOT SUPPORTED'
        })
        this.route.navigateByUrl('/servers')
              },error=>{

              }
            )
          }
        })
        },error=>{
        })
        }
        else{
        Toast.fire({
            icon: 'error',
            title: 'Connection to server failed !'
          })
          document.querySelector('.checkOsResults')!.innerHTML += '<div class="alert alert-danger mt-4">Failed to Connect</div>';
          document.querySelector('.checkOs')?.classList.add('d-none');
          document.querySelector('.checkOsResults')!.innerHTML = "";
          Toast.fire({
            icon: 'error',
            title: 'Invalid Credentials'
          })
        this.route.navigateByUrl('/servers')
        }
      })
      })
   }
  }
addCategory(){
    this.CategoryFormAdd.patchValue({account:this.acc})
    let data=this.CategoryFormAdd.value
    //data.account = this.acc
    data.classe = 1

    if (this.CategoryFormAdd.invalid || this.CategoryFormAdd.value.length == 0) {
      this.submitted1 = true;

      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Fill all information!'
      })
      return;
    }

    else{
    this.categoryService.addCategory(data).subscribe(
    result=>{
          this.category = result

          this.CreateLogs("create",new Date(),19,this.category.id!,this.d,2)

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
          title: 'Category Added successfully'
        })
        this.getAllCategories(this.acc.id)
        this.onSubmit()
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

  addProvider(){
  this.ProviderFormAdd.patchValue({account:this.acc})
    let data=this.ProviderFormAdd.value
    //data.account = this.acc
    data.start_date = new Date()
    data.firewall = 1
    data.status = 1
    if(this.ProviderFormAdd.value.categories.id == "" || this.ProviderFormAdd.value.categories.id == null){
    data.categories = undefined
    }
    if (this.ProviderFormAdd.invalid || this.ProviderFormAdd.value.length == 0) {
      this.submitted2 = true;

      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Fill all information!'
      })
      return;
    }

    else{

    this.providerService.addProvider(data).subscribe(
    result=>{

          this.provider = result

          this.CreateLogs("create",new Date(),20,this.provider.id!,this.d,2)

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
          title: 'Provider Added successfully'
        })
        this.getAllProviders(this.acc.id)
        this.onSubmit()
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
  openModalCategory(targetModal: any, category: Category) {
    this.modalService.open(targetModal, {
      centered: true,
      backdrop: 'static'
    });
    this.getAllCategories(this.acc.id)
  }
  openModalProvider(targetModal: any, provider: Provider) {
    this.modalService.open(targetModal, {
      centered: true,
      backdrop: 'static'
    });
    this.getAllProviders(this.acc.id)
  }
  onSubmit(){
    this.modalService.dismissAll()
    this.CategoryFormAdd.reset()
    this.ProviderFormAdd.reset()
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

          }
        )
   }
  ValidateIPaddress(ipaddress:any) {
    if (/^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/.test(this.serverForm.get('ip_address')?.value))
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
