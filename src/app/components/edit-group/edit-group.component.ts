import { Component, ElementRef, OnInit, Renderer2 } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';
import { Account } from 'src/app/model/account';
import { Category } from 'src/app/model/category';
import { Group } from 'src/app/model/group';
import { GroupRule } from 'src/app/model/group-rule';
import { Rule } from 'src/app/model/rule';
import { Server } from 'src/app/model/server';
import { User } from 'src/app/model/user';
import { UsersLogs } from 'src/app/model/users-logs';
import { AccountsService } from 'src/app/services/accounts.service';
import { CategoriesService } from 'src/app/services/categories.service';
import { GroupsRulesService } from 'src/app/services/groups-rules.service';
import { GroupsService } from 'src/app/services/groups.service';
import { RulesService } from 'src/app/services/rules.service';
import { ServersService } from 'src/app/services/servers.service';
import { UsersLogsService } from 'src/app/services/users-logs.service';
import { UsersPermissionsService } from 'src/app/services/users-permissions.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-group',
  templateUrl: './edit-group.component.html',
  styleUrls: ['./edit-group.component.css']
})
export class EditGroupComponent implements OnInit {
  public groupForm!:FormGroup
  public groupRuleForm!:FormGroup
  public ruleFormEdit!:FormGroup
  public ruleFormAdd!:FormGroup
  public ruleInstanceFormAdd!:FormGroup
  public serverFormEdit!:FormGroup
  groupsList:Group[]=[]
  groupsList1:Group[]=[]
  serversList:Server[]=[]
  categoriesList:Category[]=[]
  accountsList:Account[]=[]
  rulesList:Rule[]=[]
  groupRuleList:GroupRule[]=[]
  usersLogsList:UsersLogs[]=[]
  server:Server=new Server()
  group:Group=new Group()
  rule:Rule=new Rule()
  groupRule:GroupRule=new GroupRule()
  userLogs:UsersLogs=new UsersLogs()
  submitted=false;
  userPermission:any
  usrPer:any
  id:any
  p1:number=1
  p2:number=1
  user:any
  d:any
  acc:any
  account:any
  dataaa:any
  hasChange : boolean = false
  hasChange1 : boolean = false
  searchText:any
  searchText1:any
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
    10:"User permissions"
  }
  sourceType :{ [key: string]: any } = {
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
    11:"Desktop"
  }
  constructor(private fb:FormBuilder,private ruleService:RulesService,private groupService:GroupsService,private serverService:ServersService,private accountService:AccountsService,private categoryService:CategoriesService,
    private router:Router, private route:ActivatedRoute,private groupsRulesService:GroupsRulesService,private modalService:NgbModal,private usersLogsService:UsersLogsService,private usersPermissionsService:UsersPermissionsService,
    private SpinnerService: NgxSpinnerService,private renderer: Renderer2, private el: ElementRef) {
      this.groupForm=this.fb.group(
        {
        id:[''],
        name:['',Validators.required],
        status:[''],
        start_date:[''],
        end_date:[''],
        account:this.fb.group({
          id: ['']
        }),
        categories:this.fb.group({
          id: ['']
        })
      }
      )
      this.groupRuleForm=this.fb.group(
        {
        id:[''],
        status:[''],
        start_date:[''],
        groups:this.fb.group({
          id: ['']
        }),
        rules:this.fb.group({
          id: ['']
        })
      }
      )
      this.ruleFormEdit=this.fb.group(
        {
        id:[''],
        name:['',Validators.required],
        ip_address:['',Validators.required],
        port:['',Validators.required],
        protocol:['',Validators.required],
        action:['',Validators.required],
        status:['',Validators.required],
        start_date:[''],
        account:this.fb.group({
          id: ['']
        }),
        categories:this.fb.group({
          id: ['']
        })
      }
      )
      this.ruleFormAdd=this.fb.group(
        {
          id:[''],
          name:['',Validators.required],
          ip_address:['',Validators.required],
          port:['',Validators.required],
          action:['',Validators.required],
          protocol:['',Validators.required],
          status:['',Validators.required],
          start_date:['',Validators.required],
          account:this.fb.group({
            id: ['']
          })
      }
      )
      this.ruleInstanceFormAdd=this.fb.group(
        {
          id:[''],
          servers: this.fb.group({
            id: ['']
          }) ,
          rules: this.fb.group({
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
    this.d = JSON.parse(this.user)

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

    this.id=this.route.snapshot.params["id"]
    this.groupService.getGroupById(this.id).subscribe(
      result=>{
        this.group=result
        this.groupForm.patchValue({id:this.group.id})
        this.groupForm.patchValue({start_date:this.group.start_date})
      },
      error=>{
      }

    )
    this.getAllRules()
    this.getAllServers()
    //this.updateGroup(this.id)
    this.getAllAccounts()
    this.getAllCategories(this.acc.id)
    this.getGroupsRulesByGroupId(this.id)
    this.getGroupsUsersLogs()

    const parent = this.renderer.parentNode(this.el.nativeElement);

    if (parent.getElementsByTagName('LABEL').length && !parent.getElementsByClassName('required-asterisk').length) {
      parent.getElementsByTagName('LABEL')[0].innerHTML += '<span class="required-asterisk">*</span>';
    }

  }
  getAllCategories(account_id:any){
    this.categoryService.getAllCategories(account_id).subscribe(
      result=>{
        this.categoriesList=result

      },
      error=>{
      }
    )
  }
  getAllAccounts(){
    this.accountService.getAllAccounts().subscribe(
      result=>{
        this.accountsList=result

      },
      error=>{
      }
    )
  }
  getAllRules(){
    this.ruleService.getAllRules().subscribe(
      result=>{
        this.rulesList=result

      },
      error=>{
      }
    )
  }
  getGroupsRulesByGroupId(id:this){
    this.groupsRulesService.getAllGroupRulesByGroupId(id).subscribe(
      result=>{
        this.groupRuleList = result
      },
      error=>{
      }
    )
  }
  getAllServers(){
    this.serverService.getAllServers().subscribe(
      result=>{
        this.serversList=result

      },
      error=>{
      }
    )
  }
  getGroupsUsersLogs() {
    this.usersLogsService.getGroupsUsersLogs(this.id).subscribe(
      result => {
        this.usersLogsList = result.map( (elem:any) => {elem.element = this.elementType[elem.element];elem.source = this.sourceType[elem.source]; return elem});
      },
      error => {
      }
    )
  }
  get form() {
    return this.groupForm.controls;
  }
  get addRuleForm() {
    return this.ruleFormAdd.controls;
  }
  get editRuleForm() {
    return this.ruleFormEdit.controls;
  }
  updateGroup(id:any){
    //this.groupForm.patchValue({end_date:this.group.end_date})
    let data=this.groupForm.value
    data.end_date = this.group.end_date
    data.account = this.group.account
    data.categories = this.group.categories
    if (this.groupForm.invalid || this.groupForm.value.length == 0) {
      this.submitted = true;

      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Fill all information!'
      })
      return;
    }
    this.hasChange1 = (data.end_date != this.group.end_date || data.name != this.group.name || data.start_date != this.group.start_date || data.status != this.group.status
      || data.account != this.group.account || data.categories != this.group.categories)
    if(this.hasChange1 == true){
    this.groupService.updateGroup(data,id).subscribe(
      result=>{
        this.CreateLogs("edit",new Date(),4,id,this.d,4)
        const Toast = Swal.mixin({
          toast: true,
          position: 'top-right',
          showConfirmButton: false,
          timer: 2500,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer)
            toast.addEventListener('mouseleave', Swal.resumeTimer)
          }
        })

        Toast.fire({
          icon: 'success',
          title: 'Group Edited successfully'
        })
        //this.router.navigateByUrl('/groups')
      },
      error=>{

      }
    )
  }else{
    Swal.fire('Nothing was changed')
    //this.router.navigateByUrl('/groups')
  }
  }

  updateRule(id:any , rule:Rule){
    this.dataaa  = this.ruleFormEdit.value
    this.dataaa.account = rule.account
    if (this.ruleFormEdit.invalid || this.ruleFormEdit.value.length == 0) {
      this.submitted = true;

      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Fill all information!'
      })
      return;
    }else if (!this.ValidateIPaddress1(this.rule.ip_address)) {
      return;
    }else if (!this.checkIfValidPortnumber1(this.rule.port)) {
      return;
    }
    this.hasChange = (this.dataaa.name != rule.name || this.dataaa.ip_address != rule.ip_address || this.dataaa.action != rule.action
      || this.dataaa.status != rule.status || this.dataaa.start_date != rule.start_date || this.dataaa.end_date != rule.end_date
      || this.dataaa.port != rule.port || this.dataaa.protocol != rule.protocol || this.dataaa.account != rule.account)
    if(this.hasChange == true){
    this.ruleService.updateRule(this.dataaa,id).subscribe(
      result=>{
        let dataa = this.ruleFormEdit.getRawValue()
        let row =document.querySelector('#table_rule tr[id="'+dataa.id+'"]')
        if(row != null){
        let r = row.querySelectorAll('td');
        if(r!==null){
          r[1].textContent = dataa.name
          r[2].textContent = dataa.ip_address
          r[3].textContent = dataa.port
          r[4].textContent = dataa.protocol
          r[5].textContent = dataa.action

          this.CreateLogs("edit",new Date(),3,dataa.id,this.d,4)

          this.groupsRulesService.getOneGroupRule(dataa.id,this.group.id).subscribe(
            result=>{
              let gl = result
              let gl_id = gl.id
              this.CreateLogs("edit",new Date(),7,gl_id,this.d,4)
              const Toast = Swal.mixin({
                toast: true,
                position: 'top-right',
                showConfirmButton: false,
                timer: 2500,
                timerProgressBar: true,
                didOpen: (toast) => {
                  toast.addEventListener('mouseenter', Swal.stopTimer)
                  toast.addEventListener('mouseleave', Swal.resumeTimer)
                }
              })

              Toast.fire({
                icon: 'success',
                title: 'Rule Edited successfully'
              })
            },
          error=>{
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'Something went wrong!'
            })

          })
          this.onSubmit()
          this.getGroupsRulesByGroupId(this.id)
    }
    }

      },
      error=>{
        confirm("Please check your informations again")
      }
    )
    }
    else{
      Swal.fire('Nothing was changed')
      this.onSubmit()
    }
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
      this.ruleService.getRuleById(id).subscribe(
        result=>{
          let r = result
          let r_id = r.id
          this.groupsRulesService.getOneGroupRule(r.id,this.group.id).subscribe(
            result=>{
              let GR = result
              let GR_id = GR.id
              GR.status =4
              GR.end_date = new Date()
              this.groupsRulesService.updateGroupsRules(GR,GR_id).subscribe(
                result=>{
                  //usr = result
                  let row =document.getElementById(id);
                  if(row != null){
                  row.remove()
                  this.groupRuleList = this.groupRuleList.filter(g_r => g_r.rules?.id !== id);
                  }
                  this.CreateLogs("delete",new Date(),7,GR_id,this.d,4)
                },
                error=>{
                 Swal.fire({
                  icon: 'error',
                  title: 'Oops...',
                  text: 'Something went wrong!'
                })
                }
              )
            },
            error=>{
             Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'Something went wrong!'
            })
            }
          )
        },
        error=>{
         Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Something went wrong!'
        })
        }
      )
      Swal.fire('Deleted!',
          'Rule has been deleted.',
          'success'
        )
      }
    })
  }

  addRule(){
    this.ruleFormAdd.patchValue({account:this.acc})
    let data2=this.ruleFormAdd.value
        // stop here if form is invalid
    if (this.ruleFormAdd.invalid || this.ruleFormAdd.value.length == 0) {
      this.submitted = true;

      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Fill all information!'
      })
      return;
    }else if (!this.ValidateIPaddress(this.rule.ip_address)) {
      return;
    }else if (!this.checkIfValidPortnumber(this.rule.port)) {
      return;
    }
    this.ruleService.saveRule(data2).subscribe(
      result=>{
        this.rule = result
        this.groupRule.groups = this.group
        this.groupRule.rules = this.rule
        this.groupRule.status = 1
        this.groupRule.start_date = new Date()
        this.groupsRulesService.saveGroupRules(this.groupRule).subscribe(
          result=>{
            this.groupRuleList.push(this.groupRule)
            this.CreateLogs("create",new Date(),3,this.rule.id!,this.d,4)
            this.groupsRulesService.getOneGroupRule(this.rule.id,this.group.id).subscribe(
              result=>{
                let gl = result
                let gl_id = gl.id
                this.CreateLogs("create",new Date(),7,gl_id,this.d,4)
                this.onSubmit()
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
                  title: 'Rule Added successfully'
                })
              },
            error=>{
              Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Something went wrong!'
              })

            })
          },
        error=>{
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Something went wrong!'
          })

        })
      },
      error=>{
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Something went wrong!'
        })

      }
    )
    this.onSubmit()
    this.getGroupsRulesByGroupId(this.id)
  }
  openModal(targetModal: any, rule: Rule) {
    this.modalService.open(targetModal, {
     centered: true,
     backdrop: 'static'
    });
    this.ruleFormEdit.patchValue({id:rule.id})
    this.ruleFormEdit.patchValue({name:rule.name})
    this.ruleFormEdit.patchValue({status:rule.status})
    this.ruleFormEdit.patchValue({start_date:rule.start_date})
    this.ruleFormEdit.patchValue({end_date:rule.end_date})
    this.ruleFormEdit.patchValue({ip_address:rule.ip_address})
    this.ruleFormEdit.patchValue({protocol:rule.protocol})
    this.ruleFormEdit.patchValue({action:rule.action})
    this.ruleFormEdit.patchValue({port:rule.port})
   }
   openModal1(targetModal: any, server: Server) {
    this.modalService.open(targetModal, {
     centered: true,
     backdrop: 'static'
    });
    this.serverFormEdit.patchValue({id:this.server.id})
    this.serverFormEdit.patchValue({
     id: server.id,
     name: server.name,
     ip_address : server.ip_address,
     operating_system : server.operating_system,
     system_version : server.system_version,
     status : server.status


    });
   }
   openModal2(targetModal: any, rule: Rule) {
    this.modalService.open(targetModal, {
     centered: true,
     backdrop: 'static'
    });
   }
  onSubmit() {
    this.modalService.dismissAll();
    this.ruleFormAdd.reset()
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
   ValidateIPaddress(ipaddress:any) {
    if (/^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/.test(this.ruleFormAdd.get('ip_address')?.value))
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
  ValidateIPaddress1(ipaddress:any) {
    if (/^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/.test(this.ruleFormEdit.get('ip_address')?.value))
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
  checkIfValidPortnumber(port:any) {
    // Regular expression to check if number is a valid port number
    if(/^((6553[0-5])|(655[0-2][0-9])|(65[0-4][0-9]{2})|(6[0-4][0-9]{3})|([1-5][0-9]{4})|([0-5]{0,5})|([0-9]{1,4}))$/gi.test(this.ruleFormAdd.get('port')?.value))
    {
      return(true)
    }

    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'You have entered an invalid Port number!'
    })
  return (false)
}
checkIfValidPortnumber1(port:any) {
  // Regular expression to check if number is a valid port number
  if(/^((6553[0-5])|(655[0-2][0-9])|(65[0-4][0-9]{2})|(6[0-4][0-9]{3})|([1-5][0-9]{4})|([0-5]{0,5})|([0-9]{1,4}))$/gi.test(this.ruleFormEdit.get('port')?.value))
  {
    return(true)
  }

  Swal.fire({
    icon: 'error',
    title: 'Oops...',
    text: 'You have entered an invalid Port number!'
  })
return (false)
}
  getUserLogs(){
    this.getGroupsUsersLogs()
  }
}
