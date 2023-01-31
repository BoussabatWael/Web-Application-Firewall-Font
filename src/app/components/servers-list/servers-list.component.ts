import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { Subject } from 'rxjs';
import { Server } from 'src/app/model/server';
import { User } from 'src/app/model/user';
import { UsersLogs } from 'src/app/model/users-logs';
import { ServersService } from 'src/app/services/servers.service';
import { UsersLogsService } from 'src/app/services/users-logs.service';
import { UsersPermissionsService } from 'src/app/services/users-permissions.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-servers-list',
  templateUrl: './servers-list.component.html',
  styleUrls: ['./servers-list.component.css']
})
export class ServersListComponent implements OnInit {
  userr:any
  usrPer:any
  d:any
  acc:any
  account:any
  userPermission:any
  serversList:Server[]=[]
  userLogs:UsersLogs = new UsersLogs()
  p:number=1
  searchText :any
  constructor(private serversService:ServersService,private usersLogsService:UsersLogsService,
    private usersPermissionsService:UsersPermissionsService,private router:Router,private SpinnerService: NgxSpinnerService) { }

  ngOnInit(): void {
    if (localStorage.getItem("user") === null) {
      this.router.navigateByUrl('')
    }
    this.userr = localStorage.getItem('user');
    this.d = JSON.parse(this.userr)

    this.userPermission = localStorage.getItem('permissions');
    this.usrPer = JSON.parse(this.userPermission);
/*
    this.usersPermissionsService.getUserPermissionsByUserId(this.d.id).subscribe(
      result=>{
        this.userPermission = result
        this.usrPer = JSON.parse(this.userPermission.code);
      },
      error=>{
       }
    )*/
    this.acc = this.d['account']
    this.account = JSON.stringify(this.acc)
    this.getServers()

  }

  getServers(){

    this.serversService.getServers(this.acc.id).subscribe(
      result=>{
        this.serversList=result

      },
      error=>{
      }
    )
  }

  deleteServer(id:any){
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't to delete this server ?!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
      this.serversService.getServerById(id).subscribe(
        result=>{
          let srv = result
          srv.status = 4
          srv.end_date = new Date()
          this.serversService.updateServer(srv,id).subscribe(
            result=>{
              let row =document.getElementById(id);
              if(row != null){
              row.remove()
              this.serversList = this.serversList.filter(s => s.id !== id);

              }
            },
            error=>{
            }
            )
            this.CreateLogs("delete",new Date(),2,id,this.d,2)

        },
        error=>{
        }
      )
      Swal.fire('Deleted!',
          'Server has been deleted.',
          'success'
        )
    }
  })
  }
  CreateLogs(action:String,action_date:Date,element:number,element_id:number,users:User,source:number){
    this.userLogs.action = action
    this.userLogs.action_date = action_date
    //Accounts=0, Users=1, Servers=2, rules=3,groups=4,policies=5,rules_instances=6,groups_rules=7
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
}
