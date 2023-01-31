import { AppComponent } from './../../app.component';
import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Account } from 'src/app/model/account';
import { User } from 'src/app/model/user';
import { AccountsService } from 'src/app/services/accounts.service';
import { UsersPermissionsService } from 'src/app/services/users-permissions.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.css']
})
export class TopbarComponent implements OnInit {
  AccountsList:Account[]=[]
  user:any
  userPermission:any
  data:any
  usrPer:any
  acc:any
  account:any
  pagename:any
  page:any
  Stringpath:any
  constructor(private accountsService:AccountsService,private usersService:UsersService, private appComponent:AppComponent,
    private usersPermissionsService:UsersPermissionsService,private router:Router) { }

  ngOnInit(): void {
    if (localStorage.getItem("user") === null) {
      this.router.navigateByUrl('')
    }
    this.user = localStorage.getItem('user');
    this.data = JSON.parse(this.user)

    this.userPermission = localStorage.getItem('permissions');
    this.usrPer = JSON.parse(this.userPermission);

/*
    this.usersPermissionsService.getUserPermissionsByUserId(this.data.id).subscribe(
      result=>{
        this.userPermission = result
        this.usrPer = JSON.parse(this.userPermission.code);
        //JSON.parse(this.userPermission.code).users.includes('create')
      },
      error=>{
       }
    )*/
    this.acc = this.data['account']
    this.account = JSON.stringify(this.acc)

    this.pagename = this.router.url
    this.Stringpath = this.pagename

    if(this.Stringpath == "settings/users"){
      this.page = "USERS LIST"
    }else if(this.Stringpath.includes("/settings/user/edit")){
      this.page = "EDIT USER"
    }else if(this.Stringpath == "/settings/user/add"){
      this.page = "ADD USER"
    }else if(this.Stringpath == "/servers"){
      this.page = "SERVERS LIST"
    }else if(this.Stringpath.includes("/server/edit")){
      this.page = "EDIT SERVER"
    }else if(this.Stringpath == "/server/add"){
      this.page = "ADD SERVER"
    }else if(this.Stringpath == "/rules"){
      this.page = "RULES LIST"
    }else if(this.Stringpath.includes("/rule/edit")){
      this.page = "EDIT RULE"
    }else if(this.Stringpath == "/rule/add"){
      this.page = "ADD RULE"
    }else if(this.Stringpath == "/groups"){
      this.page = "GROUPS LIST"
    }else if(this.Stringpath.includes("/group/edit")){
      this.page = "EDIT GROUP"
    }else if(this.Stringpath == "/group/add"){
      this.page = "ADD GROUP"
    }else if(this.Stringpath == "/policies"){
      this.page = "POLICIES LIST"
    }else if(this.Stringpath.includes("/policies/edit")){
      this.page = "EDIT POLICY"
    }else if(this.Stringpath == "/reporting"){
        this.page = "REPORTING"
    }else if(this.Stringpath == "/settings"){
        this.page = "SETTINGS"
    }else if(this.Stringpath == "/policies/add"){
      this.page = "ADD POLICY"
    }else if(this.Stringpath == "/dashboard"){
      this.page = "DASHBOARD"
    }else if(this.Stringpath == "/account"){
      this.page = "PROFILE"
    }
}
 getUser(){
  this.accountsService.getAccountById(this.user.account.id).subscribe(
          result=>{
            this.account = result
          },
          error=>{
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
  logout(){
    localStorage.removeItem("user");
    localStorage.removeItem("permissions");
    localStorage.clear()
    this.appComponent.resetToken()
    this.router.navigateByUrl('')
  }
}
