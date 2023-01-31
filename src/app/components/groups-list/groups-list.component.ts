import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { Group } from 'src/app/model/group';
import { Rule } from 'src/app/model/rule';
import { User } from 'src/app/model/user';
import { UsersLogs } from 'src/app/model/users-logs';
import { GroupsService } from 'src/app/services/groups.service';
import { RulesService } from 'src/app/services/rules.service';
import { UsersLogsService } from 'src/app/services/users-logs.service';
import { UsersPermissionsService } from 'src/app/services/users-permissions.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-groups-list',
  templateUrl: './groups-list.component.html',
  styleUrls: ['./groups-list.component.css']
})
export class GroupsListComponent implements OnInit {
  userr:any
  d:any
  acc:any
  userPermission:any
  usrPer:any
  account:any
  searchText:any ;
  groupsList:Group[]=[]
  rulesList:Rule[]=[]
  userLogs:UsersLogs = new UsersLogs()
  p:number=1
  constructor(private groupsService:GroupsService,
    private usersLogsService:UsersLogsService,private rulesService:RulesService ,
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
        //JSON.parse(this.userPermission.code).users.includes('create')
      },
      error=>{
       }
    )
*/
    this.acc = this.d['account']
    this.account = JSON.stringify(this.acc)

    this.getGroups()
    this.getAllRules()
}

  getGroups(){
    this.groupsService.getGroups(this.acc.id).subscribe(
      result=>{
        this.groupsList=result
      },
      error=>{
      }
    )
  }
  getAllRules(){
    this.rulesService.getAllRules().subscribe(
      result=>{
        this.rulesList=result

      },
      error=>{
      }
    )
  }
  deleteGroup(id:any){
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't to delete this group ?!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
      this.groupsService.getGroupById(id).subscribe(
        result=>{
          let g = result
          g.status = 4
          g.end_date = new Date()
          this.groupsService.updateGroup(g,id).subscribe(
            result=>{
              //usr = result
              let row =document.getElementById(id);
              if(row != null){
              row.remove()
              this.groupsList = this.groupsList.filter(g => g.id !== id);
              }
            },
            error=>{
            }
          )
          this.CreateLogs("delete",new Date(),4,id,this.d,4)

        },
        error=>{
        }
      )
      Swal.fire('Deleted!',
          'Group has been deleted.',
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

          }
        )
   }
}
