import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { Account } from 'src/app/model/account';
import { AccountsService } from 'src/app/services/accounts.service';
import { FirewallScriptService } from 'src/app/services/firewall-script.service';
import { UsersPermissionsService } from 'src/app/services/users-permissions.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  AccountsList:Account[]=[]
  user:any | undefined
  userPermission:any | undefined
  data:any | undefined
  usrPer:any | undefined
  acc:any | undefined
  account:any | undefined
  response:any
  constructor(private accountsService:AccountsService,private usersService:UsersService,
    private usersPermissionsService:UsersPermissionsService,private router:Router,
    private SpinnerService: NgxSpinnerService, private firewallService:FirewallScriptService) { }

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
      },
      error=>{
       }
    )
*/
    this.acc = this.data['account']
    this.account = JSON.stringify(this.acc)
  }

}
