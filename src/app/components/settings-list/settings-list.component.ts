import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { Subject } from 'rxjs';
import { Account } from 'src/app/model/account';
import { User } from 'src/app/model/user';
import { UsersLogs } from 'src/app/model/users-logs';
import { UsersLogsService } from 'src/app/services/users-logs.service';
import { UsersPermissionsService } from 'src/app/services/users-permissions.service';
import { UsersService } from 'src/app/services/users.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-settings-list',
  templateUrl: './settings-list.component.html',
  styleUrls: ['./settings-list.component.css']
})
export class SettingsListComponent implements OnInit {
  userr:any
  d:any
  acc:any
  account:any
  userPermission:any
  usrPer:any
  usersList:User[]=[]
  public userForm!:FormGroup
  accountsList:Account[]=[]
  user:User = new User()
  userLogs: UsersLogs = new UsersLogs()
  p:number=1
  searchText:any
  constructor(private fb:FormBuilder,private usersService:UsersService,
    private usersLogsService:UsersLogsService,private usersPermissionsService:UsersPermissionsService,
    private SpinnerService: NgxSpinnerService, private router:Router) {
      this.userForm=this.fb.group(
        {
        id:[''],
        username:['',Validators.required],
        password:[''],
        role:[''],
        language:[''],
        timezone:[''],
        browser:[''],
        ip_address:[''],
        last_auth:[''],
        photo:[''],
        status:[''],
        start_date:[''],
        end_date:[''],
        account:this.fb.group({
          id: ['']
        })
      }
      )
     }

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
    this.getUsers()
    this.userForm.patchValue({id:this.user.id})
    this.userForm.patchValue({status:this.user.status})
    this.userForm.patchValue({browser:this.user.browser})
    this.userForm.patchValue({last_auth:this.user.last_auth})
  }
  getUsers(){
    this.usersService.getUsers(this.acc.id,this.d.id).subscribe(
      result=>{
        this.usersList = result

      },
      error=>{
      }
    )
  }
  deleteUser(id:any){
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't to delete this user ?!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {

          this.usersService.getUserById(id).subscribe(
            result=>{
              let usr = result
              usr.status = 4
              usr.end_date = new Date()
              this.usersService.updateUser(usr,id).subscribe(
                result=>{
                  let row =document.getElementById(id);
                  if(row != null){
                  row.remove()
                  this.usersList = this.usersList.filter(u => u.id !== id);
                  }
                    this.CreateLogs("delete",new Date(),1,id,this.d,1)

                },
                error=>{
                }
              )

            },
            error=>{
            }
          )
          Swal.fire('Deleted!',
          'User has been deleted.',
          'success'
        )
      }
    })
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
}
