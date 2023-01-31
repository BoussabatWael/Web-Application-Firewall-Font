import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { Group } from 'src/app/model/group';
import { Rule } from 'src/app/model/rule';
import { RulesInstances } from 'src/app/model/rules-instances';
import { User } from 'src/app/model/user';
import { UsersLogs } from 'src/app/model/users-logs';
import { FirewallScriptService } from 'src/app/services/firewall-script.service';
import { GroupsService } from 'src/app/services/groups.service';
import { RulesInstancesService } from 'src/app/services/rules-instances.service';
import { RulesService } from 'src/app/services/rules.service';
import { UsersLogsService } from 'src/app/services/users-logs.service';
import { UsersPermissionsService } from 'src/app/services/users-permissions.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-rules-list',
  templateUrl: './rules-list.component.html',
  styleUrls: ['./rules-list.component.css']
})
export class RulesListComponent implements OnInit {
  userr:any
  d:any
  acc:any
  userPermission:any
  usrPer:any
  account:any
  searchText:any ;
  rulesList:Rule[]=[]
  groupsList:Group[]=[]
  ruleInstanceList : RulesInstances[]=[]
  p:number=1
  userLogs:UsersLogs = new UsersLogs()
  constructor(private rulesService:RulesService,private groupsService:GroupsService ,
    private usersLogsService:UsersLogsService,private usersPermissionsService:UsersPermissionsService,
    private SpinnerService: NgxSpinnerService, private rulesInstancesService:RulesInstancesService,
    private firewallScriptService :FirewallScriptService, private router:Router) { }

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
    )*/
    this.acc = this.d['account']
    this.account = JSON.stringify(this.acc)
    this.getRules()
    this.getAllGroups()

  }
  getAllRulesInstancesByRuleId(id:any){
    this.rulesInstancesService.getRulesInstancesByRuleId(id).subscribe(
      result=>{
        this.ruleInstanceList = result
        //this.rule.groupRule = this.rule.groupRule?.filter(x=>x.rules?.id === this.rule.id)
      },
      error=>{
      }
    )
  }
  getRules(){
    this.rulesService.getRules(this.acc.id).subscribe(
      result=>{
        this.rulesList=result
      },
      error=>{
      }
    )
  }
  getAllGroups(){
    this.groupsService.getAllGroups().subscribe(
      result=>{
        this.groupsList=result

      },
      error=>{
      }
    )
  }
  deleteRule(id:any){
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't to delete this rule ?!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.rulesInstancesService.getRulesInstancesByRuleId(id).subscribe(
          re=>{
            this.ruleInstanceList = re
            let char = this.ruleInstanceList.filter((c=>c.rules?.id ===id));
            if(char != null){
              for(let i=0;i<char.length;i++){
                this.firewallScriptService.RuleIptables({server_id:char[i]["servers"]?.id,Task:"delete",id_rule:id}).subscribe(
                  response=>{

                  }
                )
              }
            }
          },err=>{

          }
        )
      this.rulesService.getRuleById(id).subscribe(
        result=>{
          let r = result
          r.status = 4
          r.end_date = new Date()
          this.rulesService.updateRule(r,id).subscribe(
            result=>{
              //usr = result
              let row =document.getElementById(id);
              if(row != null){
              row.remove()
              this.rulesList = this.rulesList.filter(r => r.id !== id);
              }
            },
            error=>{
            }
          )
          this.CreateLogs("delete",new Date(),3,id,this.d,3)

        },
        error=>{
        }
      )
      Swal.fire('Deleted!',
          'Rule has been deleted.',
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
