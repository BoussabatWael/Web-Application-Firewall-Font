import { ThisReceiver } from '@angular/compiler';
import { Component, OnInit, Provider, Renderer2, ElementRef, SimpleChange } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { disableDebugTools } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Account } from 'src/app/model/account';
import { Category } from 'src/app/model/category';
import { Group } from 'src/app/model/group';
import { GroupRule } from 'src/app/model/group-rule';
import { Rule } from 'src/app/model/rule';
import { RulesInstances } from 'src/app/model/rules-instances';
import { Server } from 'src/app/model/server';
import { User } from 'src/app/model/user';
import { UsersLogs } from 'src/app/model/users-logs';
import { AccountsService } from 'src/app/services/accounts.service';
import { CategoriesService } from 'src/app/services/categories.service';
import { FirewallScriptService } from 'src/app/services/firewall-script.service';
import { GroupsRulesService } from 'src/app/services/groups-rules.service';
import { GroupsService } from 'src/app/services/groups.service';
import { ProvidersService } from 'src/app/services/providers.service';
import { RulesInstancesService } from 'src/app/services/rules-instances.service';
import { RulesService } from 'src/app/services/rules.service';
import { ServersService } from 'src/app/services/servers.service';
import { UsersLogsService } from 'src/app/services/users-logs.service';
import { UsersPermissionsService } from 'src/app/services/users-permissions.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-rule',
  templateUrl: './edit-rule.component.html',
  styleUrls: ['./edit-rule.component.css']
})
export class EditRuleComponent implements OnInit {
  public ruleEditForm!:FormGroup
  public groupRuleForm!:FormGroup
  public groupFormEdit!:FormGroup
  public groupFormAdd!:FormGroup
  public ruleInstanceFormAdd!:FormGroup
  public serverFormEdit!:FormGroup
  public CategoryFormAdd!:FormGroup
  groupsList:Group[]=[]
  groupsList1:Group[]=[]
  groupRuleList:GroupRule[]=[]
  ruleInstanceList:RulesInstances[]=[]
  categoriesList:Category[]=[]
  providersList:Provider[]=[]
  accountsList:Account[]=[]
  serversList:Server[]=[]
  serversList1:Server[]=[]
  usersLogsList:UsersLogs[]=[]
  server:Server=new Server()
  rule:Rule=new Rule()
  category:Category = new Category()
  group:Group = new Group()
  groupRule:GroupRule=new GroupRule()
  rulesInstances:RulesInstances=new RulesInstances()
  userLogs:UsersLogs=new UsersLogs()
  submitted = false;
  submitted1 = false;
  submitted3 = false;
  userPermission:any
  usrPer:any
  id:any
  p1:number=1
  p2:number=1
  p3:number=1
  user:any
  d:any
  acc:any
  account:any
  dataaa: any;
  dataaaa:any
  groupValues:any
  hasChange: boolean = false;
  hasChange2: boolean = false;
  hasChange3: boolean = false;
  searchText:any
  searchText1:any
  searchText2:any
  modalReference1:any
  response:any
  elementType :{ [key: string]: any } = {
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
    10:"User Permissions"
  }
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
  constructor(private fb:FormBuilder,private rulesService:RulesService,private groupService:GroupsService,private modalService: NgbModal,private serverService:ServersService,
    private groupRuleService:GroupsRulesService,private categoriesService:CategoriesService,private router:Router, private route:ActivatedRoute,private usersLogsService:UsersLogsService,
    private providersService:ProvidersService,private accountService:AccountsService,private rulesInstancesService:RulesInstancesService,
    private firewallScriptService:FirewallScriptService, private usersPermissionsService:UsersPermissionsService,private renderer: Renderer2, private el: ElementRef,
    private categoryService:CategoriesService) {
      this.ruleEditForm=this.fb.group(
        {
        id:[''],
        name:['',Validators.required],
        action:['',Validators.required],
        protocol:['',Validators.required],
        port:['',Validators.required],
        ip_address:[''],
        status:['',Validators.required],
        start_date:['',Validators.required],
        end_date:[''],
        account:this.fb.group({
          id: ['',Validators.required]
        })
      }
      )
      this.groupRuleForm=this.fb.group(
        {
        groups:this.fb.group({
          id: ['',Validators.required]
        })
      }
      )
      this.groupFormEdit=this.fb.group(
        {
        id:[''],
        name:['',Validators.required],
        status:['',Validators.required],
        start_date:['',Validators.required],
        account:this.fb.group({
          id: ['',Validators.required]
        }),
        categories:this.fb.group({
          id: ['',Validators.required]
        })
      }
      )
      this.groupFormAdd=this.fb.group(
        {
          id:[''],
          name:['',Validators.required],
          status:['',Validators.required],
          start_date:['',Validators.required],
          account:this.fb.group({
            id: ['',Validators.required]
          }),
          categories:this.fb.group({
            id: ['']
          })
      }
      )
      this.ruleInstanceFormAdd=this.fb.group(
        {
          servers: this.fb.group({
            id: ['',Validators.required]
          })
        }
      )
      this.serverFormEdit=this.fb.group(
        {
          id:[''],
          name:['',Validators.required],
          ip_address:['',Validators.required],
          autorization:['',Validators.required],
          operating_system:['',Validators.required],
          system_version:['',Validators.required],
          status:['',Validators.required],
          start_date:['',Validators.required],
          account:this.fb.group({
            id: ['',Validators.required]
          }),
          categories:this.fb.group({
            id: ['',Validators.required]
          }),
          providers:this.fb.group({
            id: ['',Validators.required]
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

     }
     ngOnChanges(changes: SimpleChange): void {
      let currentUrl = this.router.url;
      this.groupFormAdd.reset();
      //this.ruleFormEdit.reset()
      this.router.navigate([currentUrl]);

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
    this.rulesService.getRuleById(this.id).subscribe(
      result=>{
        this.rule=result

        this.ruleEditForm.patchValue({id:this.rule.id})
        this.groupFormEdit.patchValue({start_date:this.group.start_date});


      },
      error=>{
      }

    )
    this.getAllGroups()
    this.getAllServers()
    this.getAllAccounts()
    this.getAllCategories(this.acc.id)
    this.getAllGroupsRulesByRuleId(this.id)
    this.getAllRulesInstancesByRuleId(this.id)
    this.getServersList(this.id)
    this.getGroupssList(this.id)
    this.getAllProviders(this.acc.id)
    this.getRulesUsersLogs()


    const parent = this.renderer.parentNode(this.el.nativeElement);

    if (parent.getElementsByTagName('LABEL').length && !parent.getElementsByClassName('required-asterisk').length) {
      parent.getElementsByTagName('LABEL')[0].innerHTML += '<span class="required-asterisk">*</span>';
    }

  }
  getAllGroups(){
    this.groupService.getAllGroups().subscribe(
      result=>{
        this.groupsList=result

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
  getServersList(id:this){
    this.serverService.getServerList(id,this.acc.id).subscribe(
      result=>{
        this.serversList1=result

      },
      error=>{
      }
    )
  }
  getGroupssList(id:this){
    this.groupService.getGroupsList(id,this.acc.id).subscribe(
      result=>{
        this.groupsList1=result

      },
      error=>{
      }
    )
  }
  getAllGroupsRulesByRuleId(id:this){
    this.groupRuleService.getAllGroupRulesByRuleId(id).subscribe(
      result=>{
        this.groupRuleList = result
        //this.rule.groupRule = this.rule.groupRule?.filter(x=>x.rules?.id === this.rule.id)
      },
      error=>{
      }
    )
  }
  getAllRulesInstancesByRuleId(id:this){
    this.rulesInstancesService.getRulesInstancesByRuleId(id).subscribe(
      result=>{
        this.ruleInstanceList = result
        //this.rule.groupRule = this.rule.groupRule?.filter(x=>x.rules?.id === this.rule.id)
      },
      error=>{
      }
    )
  }
  getAllCategories(account_id:any){
    this.categoriesService.getAllCategories(account_id).subscribe(
      result=>{
        this.categoriesList=result

      },
      error=>{
      }
    )
  }
  getAllProviders(account_id:any){
    this.providersService.getAllProviders(account_id).subscribe(
      result=>{
        this.providersList=result

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
  getRulesUsersLogs() {
    this.usersLogsService.getRulesUsersLogs(this.id).subscribe(
      result => {
        this.usersLogsList = result.map( (elem:any) => {elem.element = this.elementType[elem.element];elem.source = this.sourceType[elem.source]; return elem});
      },
      error => {
      }
    )
  }
  get ruleForm() {
    return this.ruleEditForm.controls;
  }
  get serverForm() {
    return this.serverFormEdit.controls;
  }
  get groupForm() {
    return this.groupFormEdit.controls;
  }
  get groupRuleFormAdd() {
    return this.groupFormAdd.controls;
  }
  get categoryForm() {
    return this.CategoryFormAdd.controls;
  }
get groupRuleControls() {
    return this.groupRuleForm.controls;
  }

get ruleInstacnesControls() {
    return this.ruleInstanceFormAdd.controls;
  }

  updateRule(id:any){
    let data=this.ruleEditForm.value
    data.account = this.rule.account
    data.end_date = this.rule.end_date
    if (this.ruleEditForm.invalid || this.ruleEditForm.value.length == 0) {
      this.submitted = true;

      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Fill all information!'
      })
      return;
    }else if(data.ip_address != ""){
      if (!this.ValidateIPaddress1(this.server.ip_address)) {
      return;
  }
    }else if (!this.checkIfValidPortnumber(this.rule.port)) {
      return;
    }
    this.hasChange3 = (data.action != this.rule.action || data.end_date != this.rule.end_date || data.ip_address != this.rule.ip_address || data.name != this.rule.name
      || data.port != this.rule.port || data.protocol != this.rule.protocol || data.start_date != this.rule.start_date || data.status != this.rule.status
      || data.account != this.rule.account)
    if(this.hasChange3 == true){
      let char = this.ruleInstanceList.filter((c=>c.rules?.id ===id));
      if(char != null && data.ip_address != ""){
        for(let i=0;i<char.length;i++){
          document.querySelector('.checkOs')?.classList.remove('d-none');
          document.querySelector('.checkOsTitle')!.innerHTML = "Updating rule ...";
          this.firewallScriptService.RuleIptables({server_id:char[i]["servers"]?.id,Task:"edit",ruleId:id,new_protocol:data.protocol,new_ip_address:data.ip_address,new_port:data.port,new_action:data.action}).subscribe(
            response=>{
              if (i + 1 == char.length){
                this.rulesService.updateRule(data,id).subscribe(
                  result=>{
                    this.CreateLogs("edit",new Date(),3,id,this.d,3)
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
                    this.rule.ip_address = data.ip_address
                    this.rule.port = data.port
                    this.rule.status = data.status
                    this.rule.name = data.name
                    this.rule.action = data.action
                    this.rule.protocol = data.protocol
                    this.rule.start_date = data.start_date
                    this.rule.end_date = data.end_date
                    document.querySelector('.checkOs')?.classList.add('d-none');

                    //this.router.navigateByUrl('/rules')
                  },
                  error=>{
                    document.querySelector('.checkOs')?.classList.add('d-none');

                    Swal.fire({
                      icon: 'error',
                      title: 'Oops...',
                      text: 'Something went wrong!'
                    })
                  }
                )
              }

            }
          )
        }
      }else{
        this.rulesService.updateRule(data,id).subscribe(
          result=>{
            this.CreateLogs("edit",new Date(),3,id,this.d,3)
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
            this.rule.ip_address = data.ip_address
            this.rule.port = data.port
            this.rule.status = data.status
            this.rule.name = data.name
            this.rule.action = data.action
            this.rule.protocol = data.protocol
            this.rule.start_date = data.start_date
            this.rule.end_date = data.end_date
            //this.router.navigateByUrl('/rules')
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


    }else{
      Swal.fire('Nothing was changed')
      //this.router.navigateByUrl('/rules')
    }
  }
  updateGroup(id:any , g:Group){
    this.groupValues  = this.groupFormEdit.value
    this.groupValues.account = g.account
    if (this.groupFormEdit.invalid || this.groupFormEdit.value.length == 0) {
      this.submitted = true;

      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Fill all information!'
      })
      return;
    }

    this.hasChange = (this.groupValues.name != g.name || this.groupValues.status != g.status || this.groupValues.start_date != g.start_date ||
      this.groupValues.end_date != g.end_date || this.groupValues.account != g.account)

    if(this.hasChange == true){
      this.groupService.updateGroup(this.groupValues,id).subscribe(
        result=>{
          let dataa = this.groupFormEdit.getRawValue()
          let row =document.querySelector('#table_rule tr[id="'+dataa.id+'"]')
          if(row != null){
          let r = row.querySelectorAll('td');
          if(r!==null){
            r[1].textContent = dataa.name
            r[2].textContent = dataa.status

           // r[6].textContent = dataa.status

            this.CreateLogs("edit",new Date(),4,dataa.id,this.d,3)

            this.groupRuleService.getOneGroupRule(this.rule.id,dataa.id).subscribe(
              result=>{
                let gl = result
                let gl_id = gl.id
                this.CreateLogs("edit",new Date(),7,gl_id,this.d,3)
              },
            error=>{
              Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Something went wrong!'
              })

            })
            this.onSubmit()
            this.getAllGroupsRulesByRuleId(this.id)
      }
      }
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
      this.onSubmit()
    }
  }
  updateServer(id:any , s:Server){
    this.dataaaa  = this.serverFormEdit.value
    this.dataaaa.account = s.account
    this.dataaaa.categories = s.categories
    this.dataaaa.providers = s.providers
    if (this.serverFormEdit.invalid || this.serverFormEdit.value.length == 0) {
      this.submitted = true;

      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Fill all information!'
      })
      return;
    }else if (!this.ValidateIPaddress2(this.server.ip_address)) {
      return;
    }
    this.hasChange2 = (this.dataaaa.name != s.name || this.dataaaa.ip_address != s.ip_address || this.dataaaa.autorization != s.authorization
      || this.dataaaa.operating_system != s.operating_system || this.dataaaa.status != s.status || this.dataaaa.start_date != s.start_date || this.dataaaa.end_date != s.end_date
      || this.dataaaa.account != s.account || this.dataaaa.system_version != s.system_version || this.dataaaa.categories != s.categories || this.dataaaa.providers != s.providers)
    if(this.hasChange2 == true){
    this.serverService.updateServer(this.dataaaa,id).subscribe(
      result=>{
        let dataa = this.serverFormEdit.getRawValue()
        let row =document.querySelector('#table_server tr[id="'+dataa.id+'"]')
        if(row != null){
        let r = row.querySelectorAll('td');
        if(r!==null){
          r[1].textContent = dataa.name
          r[2].textContent = dataa.ip_address
          r[3].textContent = dataa.operating_system
          r[4].textContent = dataa.system_version
          r[5].textContent = dataa.status

         // r[6].textContent = dataa.status
         this.CreateLogs("edit",new Date(),2,dataa.id,this.d,3)

          this.rulesInstancesService.getRulesInstancesList(this.rule.id,dataa.id).subscribe(
            result=>{
              let rii = result
              let rii_id = rii.id
              this.CreateLogs("edit",new Date(),6,rii_id,this.d,3)
            },
          error=>{
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'Something went wrong!'
            })

          })
          this.onSubmit()
          this.getAllRulesInstancesByRuleId(this.id)
    }
    }
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
      title: 'Server Edited successfully'
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

    }
    else{
      Swal.fire('Nothing was changed')
      this.onSubmit()
    }
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
      this.groupService.getGroupById(id).subscribe(
        result=>{
          let g = result
          let g_id = g.id
          this.groupRuleService.getOneGroupRule(this.rule.id,g_id).subscribe(
            result=>{
              let GR = result
              let GR_id = GR.id
              GR.status =4
              GR.end_date = new Date()
              this.groupRuleService.updateGroupsRules(GR,GR_id).subscribe(
                result=>{
                  let row =document.getElementById(id);

                  if(row != null){
                  row.remove()
                  this.groupRuleList = this.groupRuleList.filter(g_r => g_r.groups?.id !== id);
                  }
                  this.CreateLogs("delete",new Date(),7,GR_id,this.d,3)
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
          'Group has been deleted.',
          'success'
        )
      }
    })
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
        this.firewallScriptService.RuleIptables({server_id:id,Task:"delete",id_rule:this.rule.id}).subscribe(
          response=>{

          }
        )
      this.serverService.getServerById(id).subscribe(
        result=>{
          let s = result
          let s_id = s.id
          this.rulesInstancesService.getRulesInstancesList(this.rule.id,s_id).subscribe(
            result=>{
              let RI = result
              let RI_id = RI.id
              RI.status =4
              RI.end_date = new Date()
              this.rulesInstancesService.updateRulesInstances(RI,RI_id).subscribe(
                result=>{
                  //usr = result
                  let row =document.getElementById(id);
                  if(row != null){
                    row.remove()
                    this.ruleInstanceList = this.ruleInstanceList.filter(r_i => r_i.servers?.id !== id);
                  }
                  this.CreateLogs("delete",new Date(),6,RI_id,this.d,3)
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
          'Server has been deleted.',
          'success'
        )
    }
  })
  }
  addGroup(){
    this.groupFormAdd.patchValue({account:this.acc})
    let data2=this.groupFormAdd.value
    if (this.groupFormAdd.invalid || this.groupFormAdd.value.length == 0) {
      this.submitted = true;
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Fill all inforamation!'
      })
      return;
    }
   if(this.groupFormAdd.value.categories.id == "" || this.groupFormAdd.value.categories.id == null){
    data2.categories = undefined
    }
    this.groupService.saveGroup(data2).subscribe(
      result=>{
        this.group = result
        this.groupRule.groups = this.group
        this.groupRule.rules = this.rule
        this.groupRule.status = 1
        this.groupRule.start_date = new Date()
        this.groupRuleService.saveGroupRules(this.groupRule).subscribe(
          result=>{
            this.groupRuleList.push(this.groupRule)
            this.CreateLogs("create",new Date(),4,this.group.id!,this.d,3)
            this.groupRuleService.getOneGroupRule(this.rule.id,this.group.id).subscribe(
              result=>{
                let gl = result
                let gl_id = gl.id
                this.CreateLogs("create",new Date(),7,gl_id,this.d,3)
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
                  title: 'Group Added successfully'
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
    this.getAllGroupsRulesByRuleId(this.id)
  }
  assignRuleToServer(){
    this.rulesInstances.rules = this.rule
    this.rulesInstances.servers=this.ruleInstanceFormAdd.getRawValue().servers
    this.rulesInstances.status = 1
    this.rulesInstances.start_date = new Date()
  if (this.ruleInstanceFormAdd.invalid) {
      this.submitted3 = true;

      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Fill all information!'
      })
      return;
    }else{
    document.querySelector('.checkOs')?.classList.remove('d-none');
    document.querySelector('.checkOsTitle')!.innerHTML = "Adding rule to server ...";
   this.firewallScriptService.RuleIptables({server_id:this.rulesInstances.servers?.id,Task:"add",ip_address:this.rulesInstances.rules.ip_address,protocol:this.rulesInstances.rules.protocol,port:this.rulesInstances.rules.port,action:this.rulesInstances.rules.action}).subscribe(
      response=>{
      this.response = response
      if(this.response && this.response.code == "success"){
    this.rulesInstancesService.saveRuleInstances(this.rulesInstances).subscribe(
      result=>{
        this.ruleInstanceList?.push(result)
        this.rulesInstancesService.getRulesInstancesList(this.rule.id,this.rulesInstances.servers?.id).subscribe(
          result=>{
            let Rule_instance = result
            let Rule_instance_id = Rule_instance.id

            document.querySelector('.checkOs')?.classList.add('d-none');


            this.CreateLogs("create",new Date(),6,Rule_instance_id,this.d,3)
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
              title: 'Rule Assigned to server successfully'
            })
          },
        error=>{
          document.querySelector('.checkOs')?.classList.add('d-none');
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Something went wrong!'
          })

        })
      },
        error=>{
          document.querySelector('.checkOs')?.classList.add('d-none');
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Something went wrong!'
          })

        })

      }else{
      document.querySelector('.checkOs')?.classList.add('d-none');
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Something went wrong!'
      })

      }
      }
      )

  }

  }
  assignRuleToGroup(){
    this.groupRule.rules = this.rule
    this.groupRule.groups = this.groupRuleForm.getRawValue().groups
    this.groupRule.status = 1
    this.groupRule.start_date = new Date()
 if (this.groupRuleForm.invalid) {
      this.submitted = true;

      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Fill all information!'
      })
      return;
    }
  else{
this.groupRuleService.saveGroupRules(this.groupRule).subscribe(
      result=>{
        this.groupRuleList?.push(result)
        this.groupRuleService.getOneGroupRule(this.rule.id,this.groupRule.groups?.id).subscribe(
          result=>{
            let gl = result
            let gl_id = gl.id
            this.CreateLogs("create",new Date(),7,gl_id,this.d,3)
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
              title: 'Rule Assigned to group successfully'
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

          this.CreateLogs("create",new Date(),19,this.category.id!,this.d,3)

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
        this.close()
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
  openModal(targetModal: any, group: Group) {
    this.modalService.open(targetModal, {
     centered: true,
     backdrop: 'static'
    });
    this.groupFormEdit.patchValue({id:group.id})
    this.groupFormEdit.patchValue({name:group.name})
    this.groupFormEdit.patchValue({status:group.status})
    this.groupFormEdit.patchValue({start_date:group.start_date})
    this.groupFormEdit.patchValue({end_date:group.end_date})
   }
   openModal1(targetModal: any, server: Server) {
    this.modalService.open(targetModal, {
     centered: true,
     backdrop: 'static'
    });
    this.serverFormEdit.patchValue({id:server.id})
    this.serverFormEdit.patchValue({name:server.name})
    this.serverFormEdit.patchValue({ip_address:server.ip_address})
    this.serverFormEdit.patchValue({operating_system:server.operating_system})
    this.serverFormEdit.patchValue({system_version:server.system_version})
    this.serverFormEdit.patchValue({status:server.status})
    this.serverFormEdit.patchValue({autorization:server.authorization})
    this.serverFormEdit.patchValue({start_date:server.start_date})
    this.serverFormEdit.patchValue({end_date:server.end_date})
   }
   openModalAssignToGroup(targetModal: any, group: Group) {
    this.modalService.open(targetModal, {
     centered: true,
     backdrop: 'static'
    });
    this.getGroupssList(this.id)
   }
   openModalAssignToServer(targetModal: any, server: Server) {
    this.modalService.open(targetModal, {
     centered: true,
     backdrop: 'static'
    });
    this.getServersList(this.id)
   }
   openModal2(targetModal: any, group: Group) {
    this.modalService.open(targetModal, {
     centered: true,
     backdrop: 'static',
     size:'lg'
    });

   }
  openModalCategory(targetModal: any, category: Category) {
  this.modalReference1 =  this.modalService.open(targetModal, {
      centered: true,
      backdrop: 'static'
    });

    this.getAllCategories(this.acc.id)
  }

  close() {
    this.modalReference1.close();
    this.CategoryFormAdd.reset()
   }

  onSubmit() {
    this.modalService.dismissAll();
    this.groupFormAdd.reset()
    this.groupRuleForm.reset()
    this.ruleInstanceFormAdd.reset()
    this.CategoryFormAdd.reset()
    //this.groupRuleForm.reset()
    //this.ruleInstanceFormAdd.reset()
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
   ValidateIPaddress1(ipaddress:any) {
    if (/^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/.test(this.ruleEditForm.get('ip_address')?.value))
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
  ValidateIPaddress2(ipaddress:any) {
    if (/^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/.test(this.serverFormEdit.get('ip_address')?.value))
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
    if(/^((6553[0-5])|(655[0-2][0-9])|(65[0-4][0-9]{2})|(6[0-4][0-9]{3})|([1-5][0-9]{4})|([0-5]{0,5})|([0-9]{1,4}))$/gi.test(this.ruleEditForm.get('port')?.value))
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
    this.getRulesUsersLogs()
  }
}
