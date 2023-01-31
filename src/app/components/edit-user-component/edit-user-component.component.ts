import { Component, OnInit, Renderer2, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Account } from 'src/app/model/account';
import { Rule } from 'src/app/model/rule';
import { Server } from 'src/app/model/server';
import { User } from 'src/app/model/user';
import { UsersLogs } from 'src/app/model/users-logs';
import { UsersPermissions } from 'src/app/model/users-permissions';
import { UsersServers } from 'src/app/model/users-servers';
import { UsersServersRules } from 'src/app/model/users-servers-rules';
import { AccountsService } from 'src/app/services/accounts.service';
import { RulesService } from 'src/app/services/rules.service';
import { ServersService } from 'src/app/services/servers.service';
import { UsersLogsService } from 'src/app/services/users-logs.service';
import { UsersPermissionsService } from 'src/app/services/users-permissions.service';
import { UsersServersRulesService } from 'src/app/services/users-servers-rules.service';
import { UsersServersService } from 'src/app/services/users-servers.service';
import { UsersService } from 'src/app/services/users.service';
import Swal from 'sweetalert2';
import * as CryptoJS from 'crypto-js';
import { FirewallScriptService } from 'src/app/services/firewall-script.service';

@Component({
  selector: 'app-edit-user-component',
  templateUrl: './edit-user-component.component.html',
  styleUrls: ['./edit-user-component.component.css']
})
export class EditUserComponentComponent implements OnInit {
  public userForm!: FormGroup
  public userPermissionForm!: FormGroup
  public userServerFormAdd!: FormGroup
  public userServerRulesFormAdd!: FormGroup
  public ruleFormAdd!: FormGroup
  public ruleFormEdit!: FormGroup
  user: User = new User()
  server: Server = new Server()
  rule: Rule = new Rule()
  accountsList: Account[] = []
  usersServersRulesList: UsersServersRules[] = []
  PermissionsList: { [key: string]: any[] } = {}
  PermissionsList1: { [key: string]: any[] } = {}
  RulesPermissionsList: any[] = []
  GroupsPermissionsList: any[] = []
  isCheckedList: any[] = []
  usersLogsList: UsersLogs[] = []
  UsersServersList: UsersServers[] = []
  RulesUsersServersList: any
  serversList: Server[] = []
  userServerRule: UsersServersRules = new UsersServersRules()
  userServer: UsersServers = new UsersServers()
  userPermissions: UsersPermissions = new UsersPermissions()
  userLogs: UsersLogs = new UsersLogs()
  userPermission: any
  usrPer: any
  response: any
  id: any
  p: number = 1
  p4: number = 1
  p5: number = 1
  p6: number = 1
  userr: any
  d: any
  acc: any
  account: any
  submitted = false;
  submitted1 = false;
  submitted2 = false;
  submitted3 = false;
  hasChange: boolean = false
  hasChange2: boolean = false
  searchText: any
  searchText1: any
  records: any
  dataaa:any
  modalReference:any
  modalReference1:any
  modalReference2:any
  modalReference3:any
  elementType: { [key: string]: any } = {
    0: "Accounts",
    1: "Users",
    2: "Servers",
    3: "Rules",
    4: "Groups",
    5: "Policies",
    6: "Rules instances",
    7: "Groups rules",
    8: "Policies instances",
    9: "SSH credentials",
    10: "User permissions",
    15: "User server rule",
    16: "User server"
  }
  sourceType: { [key: string]: any } = {
    0: "Accounts",
    1: "Users",
    2: "Servers",
    3: "Rules",
    4: "Groups",
    5: "Policies",
    6: "Rules instances",
    7: "Groups rules",
    8: "Policies instances",
    9: "SSH credentials",
    10: "User permissions",
    11: "Desktop"
  }
  browserName = '';
  browserVersion = '';
  selectedOption: any
  constructor(private fb: FormBuilder, private userService: UsersService, private accountService: AccountsService,
    private router: Router, private userPermissionsService: UsersPermissionsService, private usersPermissionsService: UsersPermissionsService,
    private route: ActivatedRoute, private usersLogsService: UsersLogsService, private usersServersService: UsersServersService, private modalService: NgbModal,
    private serverService: ServersService, private rulesService: RulesService, private usersServersRulesService: UsersServersRulesService,private renderer: Renderer2,
    private el: ElementRef, private firewallScriptService:FirewallScriptService) {
    this.userForm = this.fb.group(
      {
        id: [''],
        username: ['', Validators.required],
        password: ['', Validators.required],
        role: [''],
        language: [''],
        timezone: [''],
        browser: [''],
        ip_address: [''],
        last_auth: [''],
        auto_sync: [''],
        key_value: [''],
        photo: [''],
        status: [''],
        start_date: [''],
        end_date: [''],
        account: this.fb.group({
          id: ['']
        })
      }
    )
    this.userPermissionForm = this.fb.group(
      {
        id: [''],
        code: [''],
        status: [''],
        users: this.fb.group({
          id: ['']
        })
      }
    )

    this.userServerFormAdd = this.fb.group(
      {
        servers: this.fb.group({
          id: ['']
        })
      }
    )
    this.ruleFormAdd = this.fb.group(
      {
        id: [''],
        name: ['', Validators.required],
        action: ['', Validators.required],
        protocol: ['', Validators.required],
        port: ['', Validators.required],
        ip_address: [''],
        status: [''],
        start_date: [''],
        static: [''],
        dynamic: [''],
        account: this.fb.group({
          id: ['']
        }),
        servers: this.fb.group({
          id: ['']
        })
      }
    )
    this.ruleFormEdit = this.fb.group(
      {
        id: [''],
        name: ['', Validators.required],
        action: ['', Validators.required],
        protocol: ['', Validators.required],
        port: ['', Validators.required],
        ip_address: [''],
        status: ['', Validators.required],
        start_date: ['', Validators.required],
        end_date: [''],
        account: this.fb.group({
          id: ['']
        })
      }
    )
    this.userServerRulesFormAdd = this.fb.group(
      {
        rules: this.fb.group({
          id: ['', Validators.required]
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
      result => {
        this.userPermission = result
        this.usrPer = JSON.parse(this.userPermission.code);
        //JSON.parse(this.userPermission.code).users.includes('create')
      },
      error => {
      }
    )*/
    this.acc = this.d['account']
    this.account = JSON.stringify(this.acc)

    this.getAllAccounts()
    this.getAllAccounts()
    this.id = this.route.snapshot.params["id"]
    this.userService.getUserById(this.id).subscribe(
      result => {
        this.user = result
        this.userForm.patchValue({ id: this.user.id })
        this.userForm.patchValue({ status: this.user.status })
        this.userForm.patchValue({ browser: this.user.browser })
        this.userForm.patchValue({ last_auth: this.user.last_auth })
        //this.userForm.patchValue({account:this.user.account?.id})
      },
      error => {
      }
    )
    this.getUsersPermissions()
    this.getUserLogs()
    this.getUsersServers()
    this.getUserServers()


    const parent = this.renderer.parentNode(this.el.nativeElement);

    if (parent.getElementsByTagName('LABEL').length && !parent.getElementsByClassName('required-asterisk').length) {
      parent.getElementsByTagName('LABEL')[0].innerHTML += '<span class="required-asterisk">*</span>';
    }

    this.browserName = this.detectBrowserName();
    this.browserVersion = this.detectBrowserVersion();


  }
 detectBrowserName() {
    const agent = window.navigator.userAgent.toLowerCase()
    switch (true) {
      case agent.indexOf('edge') > -1:
        return 'edge';
      case agent.indexOf('opr') > -1 && !!(<any>window).opr:
        return 'opera';
      case agent.indexOf('chrome') > -1 && !!(<any>window).chrome:
        return 'chrome';
      case agent.indexOf('trident') > -1:
        return 'ie';
      case agent.indexOf('firefox') > -1:
        return 'firefox';
      case agent.indexOf('safari') > -1:
        return 'safari';
      default:
        return 'other';
    }
  }

  detectBrowserVersion(){
      var userAgent = navigator.userAgent, tem,
      matchTest = userAgent.match(/(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i) || [];

      if(/trident/i.test(matchTest[1])){
          tem =  /\brv[ :]+(\d+)/g.exec(userAgent) || [];
          return 'IE '+(tem[1] || '');
      }
      if(matchTest[1]=== 'Chrome'){
          tem = userAgent.match(/\b(OPR|Edge)\/(\d+)/);
          if(tem!= null) return tem.slice(1).join(' ').replace('OPR', 'Opera');
      }
      matchTest= matchTest[2]? [matchTest[1], matchTest[2]]: [navigator.appName, navigator.appVersion, '-?'];
      if((tem= userAgent.match(/version\/(\d+)/i))!= null) matchTest.splice(1, 1, tem[1]);
      return matchTest.join(' ');
  }

  getpage(){
  }
  get FormRuleAdd() {
    return this.ruleFormAdd.controls;
  }
  get FormRuleEdit() {
    return this.ruleFormEdit.controls;
  }

  get usersServersControls() {
    return this.userServerFormAdd.controls;
  }
  get usersServersRuleControls() {
    return this.userServerRulesFormAdd.controls;
  }
  getUsersServersRulesList(id: any) {
    this.rulesService.getUsersServersRules(id, this.acc.id,this.id).subscribe(
      result => {
        this.usersServersRulesList = result
      }, error => {

      }
    )
  }
  getRulesUsersServers(id: any) {
    this.rulesService.getRulesUsersSevers(id, this.acc.id,this.id).subscribe(
      result => {
        this.RulesUsersServersList = result
      }, error => {

      }
    )
  }
  getUserServers() {
    this.serverService.getUserServers(this.id, this.acc.id).subscribe(
      result => {
        this.serversList = result
      }, error => {

      }
    )
  }
  file: any; imgUrl: any
  selectImge(event: any) {
    this.file = event.target.files[0];
    let fr = new FileReader();
    fr.readAsDataURL(this.file)
    fr.onload = (event) => this.imgUrl = fr.result

  }

  getUsersServers() {
    this.usersServersService.getUsersServersByUserID(this.id).subscribe(
      result => {
        this.UsersServersList = result
      }, error => {

      }
    )
  }

  getAllAccounts() {
    this.accountService.getAllAccounts().subscribe(
      result => {
        this.accountsList = result

      },
      error => {
      }
    )
  }
  updateRule(id: any, r: Rule) {
    this.dataaa = this.ruleFormEdit.value
    this.dataaa.account = r.account
    if (this.ruleFormEdit.invalid || this.ruleFormEdit.value.length == 0) {
      this.submitted2 = true;
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Fill all information!'
      })
      return;
    }else if(this.dataaa.ip_address !=""){
    if (!this.ValidateIPaddress2(this.rule.ip_address)) {
      return;
    }
    }
    else if (!this.checkIfValidPortnumber1(this.rule.port)) {
      return;
    }
    this.hasChange = (this.dataaa.name != r.name || this.dataaa.port != r.port || this.dataaa.ip_address != r.ip_address || this.dataaa.protocol != r.protocol
      || this.dataaa.action != r.action || this.dataaa.status != r.status || this.dataaa.start_date != r.start_date || this.dataaa.end_date != r.end_date
      || this.dataaa.account != r.account)
    if (this.hasChange == true) {
      this.rulesService.updateRule(this.dataaa, id).subscribe(
          result => {
            let dataa = this.ruleFormEdit.getRawValue()

            r.name = dataa.name
            r.ip_address = dataa.ip_address
            r.action = dataa.action
            r.port = dataa.port
            r.protocol = dataa.protocol
            r.status = dataa.status

            let row = document.querySelector('#table_rule tr[id="' + dataa.id + '"]')
            if (row != null) {
              let rr = row.querySelectorAll('td');
              if (rr !== null) {
                rr[1].textContent = dataa.name
                rr[2].textContent = dataa.ip_address
                rr[3].textContent = dataa.action
                rr[4].textContent = dataa.port
                rr[5].textContent = dataa.protocol
                //r[6].textContent = dataa.status

              }
            }
            this.user.ip_address = undefined
            this.userService.updateUser(this.user,this.user.id).subscribe(
              result=>{
              },error=>{

              }
            )
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
              title: 'Rule updated successfully'
            })
            this.CreateLogs("edit", new Date(), 3, id, this.d, 1, '')
            this.close()
                  },
                  error => {
                    Swal.fire({
                      icon: 'error',
                      title: 'Oops...',
                      text: 'Something went wrong !'
                    })
                  }
                )
              }
     else {
      Swal.fire('Nothing was changed')
      this.close()
    }
  }
  addRule(user_server:any){
    this.ruleFormAdd.patchValue({ account: this.acc })
    let data2 = this.ruleFormAdd.value
    data2.start_date = new Date()
    data2.status = 1

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

    if (this.ruleFormAdd.invalid || this.ruleFormAdd.value.length == 0) {
      this.submitted = true;

      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Fill all information!'
      })
      return;
    } else if(this.ruleFormAdd.getRawValue().name == 'RULE_DENY' || this.ruleFormAdd.getRawValue().name == 'rule_deny'){
        Swal.fire({
         icon: 'error',
         title: 'Oops...',
         text: 'Choose another name please!'
       })
        return;
      }else if (!this.checkIfValidPortnumber(this.rule.port)) {
      return;
    }
    if(this.selectedOption == 'static'){
     if (!this.ValidateIPaddress3(this.rule.ip_address)) {
      return;
     }else{
      document.querySelector('.checkOs')?.classList.remove('d-none');
      document.querySelector('.checkOsTitle')!.innerHTML = "Adding rule to server ...";
      this.firewallScriptService.RuleIptables({ server_id: user_server.servers.id, Task: "add", ip_address: data2.ip_address, protocol: data2.protocol, port: data2.port, action: data2.action }).subscribe(
      response=>{
        this.response = response
        if(this.response && this.response.code == "success"){
        this.rulesService.saveRule(data2).subscribe(
      result => {
        this.rule = result
        this.CreateLogs("create", new Date(), 3, this.rule.id, this.d, 1, '')
        this.userServerRule.status = 1
        this.userServerRule.start_date = new Date()
        this.userServerRule.rules = this.rule
        this.userServerRule.usersServers = user_server
          this.usersServersRulesService.saveUserServer(this.userServerRule).subscribe(
                    resultt=>{
                      this.response = resultt
                      this.usersServersRulesList.push(this.rule)
                      this.CreateLogs("create", new Date(), 15, this.response.id, this.d, 1, '')
                  this.closeModalAddRule()
                  Toast.fire({
                    icon: 'success',
                    title: 'Rule added successfully'
                  })
                  document.querySelector('.checkOs')?.classList.add('d-none');

                    },error=>{
              document.querySelector('.checkOs')?.classList.add('d-none');
              Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Something went wrong!'
              })
                    }
                      )

              },error=>{
            document.querySelector('.checkOs')?.classList.add('d-none');
              Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Something went wrong!'
              })
          }

        )
        }else{
          document.querySelector('.checkOs')?.classList.add('d-none');
            Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Something went wrong!'
          })
        }
    this.user.ip_address = data2.ip_address
    this.userService.updateUser(this.user,this.user.id).subscribe(
      result=>{
      },error=>{

      }
    )
        },error=>{
          document.querySelector('.checkOs')?.classList.add('d-none');
            Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Something went wrong!'
          })
        }
      )
        }

    }else if (this.selectedOption == 'dynamic'){
      document.querySelector('.checkOs')?.classList.remove('d-none');
      document.querySelector('.checkOsTitle')!.innerHTML = "Adding rule to server ...";
    this.rulesService.saveRule(data2).subscribe(
      result => {
        this.rule = result
        this.CreateLogs("create", new Date(), 3, this.rule.id, this.d, 1, '')

        this.firewallScriptService.ruleDeny({server_id: user_server.servers.id, Task: "deny", rule_id: this.rule.id, user_id:this.d.id}).subscribe(
          response=>{
              this.response = response
              if(this.response && this.response.code == "success"){
                  this.userServerRule.status = 2
                  this.userServerRule.start_date = new Date()
                  this.userServerRule.rules = this.rule
                  this.userServerRule.usersServers = user_server
                  this.usersServersRulesService.saveUserServer(this.userServerRule).subscribe(
                    resultt=>{
                      this.response = resultt
                      this.usersServersRulesList.push(this.rule)
                      this.CreateLogs("create", new Date(), 15, this.response.id, this.d, 1, '')
                      document.querySelector('.checkOs')?.classList.add('d-none');
                      this.closeModalAddRule()
                      Toast.fire({
                        icon: 'success',
                        title: 'Rule added successfully'
                      })
                    },error=>{
                        document.querySelector('.checkOs')?.classList.add('d-none');
                        Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: 'Something went wrong!'
                      })

                    }
                  )
              }else{
                document.querySelector('.checkOs')?.classList.add('d-none');
                Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Something went wrong!'
              })

              }

          },error=>{
          document.querySelector('.checkOs')?.classList.add('d-none');
          Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Something went wrong!'
        })

          }
        )
      },
      error => {
          document.querySelector('.checkOs')?.classList.add('d-none');
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Something went wrong!'
        })
      }
    )
    this.user.ip_address = undefined
    this.userService.updateUser(this.user,this.user.id).subscribe(
      result=>{
      },error=>{

      }
    )
    }else{
      document.querySelector('.checkOs')?.classList.add('d-none');
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'You must select an option !'
      })
    }

  }
  getUserLogs() {
    this.usersLogsService.getUserLogs(this.id).subscribe(
      result => {
        this.usersLogsList = result.map((elem: any) => { elem.element = this.elementType[elem.element]; elem.source = this.sourceType[elem.source]; return elem });
      },
      error => {
      }
    )
  }
  get form() {
    return this.userForm.controls;
  }
  assignRule(id: any) {
    this.userServerRule.id = undefined
    this.userServerRule.start_date = new Date()
    this.userServerRule.status = 2
    this.userServerRule.end_date = undefined
    if (this.userServerRulesFormAdd.invalid || this.userServerRulesFormAdd.value.length == 0) {
      this.submitted3 = true;

      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Fill all information!'
      })
      return;
    }
    else{
    document.querySelector('.checkOs')?.classList.remove('d-none');
    document.querySelector('.checkOsTitle')!.innerHTML = "Adding rule ...";
      this.firewallScriptService.ruleDeny({server_id: id, Task: "deny", rule_id: this.userServerRulesFormAdd.value.rules.id, user_id:this.d.id}).subscribe(
        response=>{
          this.response = response
          if(this.response && this.response.code == "success"){
            this.usersServersService.getUserServerByUserServerId(this.id, id).subscribe(
              result => {
                this.userServer = result
                this.userServerRule.usersServers = this.userServer
                this.rulesService.getRuleById(this.userServerRulesFormAdd.getRawValue().rules.id).subscribe(
                  result => {
                    this.userServerRule.rules = result
                    this.usersServersRulesService.saveUserServer(this.userServerRule).subscribe(
                      result => {
                        this.response = result
                        //this.UsersServersList?.push(result)
                        this.CreateLogs("create", new Date(), 15, this.response.id, this.d, 1, '')
                        this.getUsersServersRulesList(id)

                        this.user.ip_address = undefined
                        this.userService.updateUser(this.user,this.user.id).subscribe(
                          result=>{
                          },error=>{

                          }
                        )
                        document.querySelector('.checkOs')?.classList.add('d-none');
                        this.closeModalAssignRule()
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
                          title: 'Rule added successfully'
                        })
                      },error=>{
                      document.querySelector('.checkOs')?.classList.add('d-none');
                        Swal.fire({
                          icon: 'error',
                          title: 'Oops...',
                          text: 'Something went wrong !'
                        })
                      })
                  }, error => {
                    Swal.fire({
                      icon: 'error',
                      title: 'Oops...',
                      text: 'Something went wrong !'
                    })
                  }
                )
              }, error => {
                Swal.fire({
                  icon: 'error',
                  title: 'Oops...',
                  text: 'Something went wrong !'
                })

              }
            )
        }else{
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Something went wrong !'
        })

        }

        },error=>{
          document.querySelector('.checkOs')?.classList.add('d-none');
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Something went wrong !'
        })
        }
      )
    }


  }
  assignUserToServer() {
    this.userServer.id = undefined
    this.userServer.start_date = new Date()
    this.userServer.end_date = undefined
    this.userServer.status = 1
    this.userServer.users = this.user
    this.userServer.servers = this.userServerFormAdd.getRawValue().servers
    if (this.userServerFormAdd.invalid || this.userServerFormAdd.value.length == 0) {
      this.submitted1 = true;

      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Fill all information!'
      })
      return;
    }
else{
this.usersServersService.saveUserServer(this.userServer).subscribe(
      result => {
        this.response = result
        this.CreateLogs("create", new Date(), 16, this.response.id, this.d, 1, '')
        this.user.auto_sync = 'false'
        this.userService.updateUser(this.user,this.id).subscribe(
        result=>{

        },error=>{
        }
        )
        //this.UsersServersList?.push(result)
        this.CreateLogs("edit", new Date(), 1, this.id, this.d, 1, '')
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
        this.getUsersServers()
        Toast.fire({
          icon: 'success',
          title: 'Server assigned to user successfully'
        })

      }, error => {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Something went wrong !'
        })
      }
    )
  }

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

 changecheck(event: Event) {
    this.selectedOption = (event.target as HTMLTextAreaElement).value
  }
  updateUser(id: any) {
    let data = this.userForm.value
    let fd = new FormData();
    data.account = this.user.account
    data.start_date = this.user.start_date
    data.key_value = this.user.key_value
    data.auto_sync = this.user.auto_sync
    data.browser = this.browserName
    fd.append("users", JSON.stringify(data));
    fd.append("file", this.file);

    if (this.userForm.invalid || this.userForm.value.length == 0) {
      this.submitted = true;

      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Fill all information!'
      })
      return;
    }
    this.hasChange = (data.username != this.user.username || data.browser != this.user.browser || data.ip_address != this.user.ip_address || data.language != this.user.language
      || data.last_auth != this.user.last_auth || data.password != this.user.password || data.photo != this.user.photo || data.role != this.user.role
      || data.status != this.user.status || data.timezone != this.user.timezone || data.account != this.user.account)
    if (this.hasChange == true) {
      if (this.file) {
        this.userService.updateUser1(fd, id).subscribe(
          result => {
            this.records = result
            this.CreateLogs("edit", new Date(), 1, id, this.d, 1, '')
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
              title: 'User Edited successfully'
            })
            this.user.browser = data.browser
            this.user.ip_address = data.ip_address
            this.user.language = data.language
            this.user.last_auth = data.last_auth
            this.user.auto_sync = data.auto_sync
            this.user.key_value = data.key_value
            this.user.start_date = data.start_date
            this.user.timezone = data.timezone
            this.user.role = data.role
            this.user.status = data.status
            this.user.username = data.username
            this.user.photo = this.records.photo
            this.user.password = data.password
            //window.location.reload()
          },
          error => {
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'Something went wrong!'
            })
          }
        )
      }
      else if(data.password != this.user.password){
      data.password = this.encrypt(data.password)
      this.userService.updateUser(data, id).subscribe(
        result => {
          this.CreateLogs("edit", new Date(), 1, id, this.d, 1, '')
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
              title: 'User Edited successfully'
            })
            this.user.role = data.role
            this.user.status = data.status
            this.user.username = data.username
            this.user.password = data.password

            //window.location.reload()
          },
          error => {
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'Something went wrong!'
            })
          }
        )
}

      else {
        this.userService.updateUser(data, id).subscribe(
          result => {
            this.CreateLogs("edit", new Date(), 1, id, this.d, 1, '')
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
              title: 'User Edited successfully'
            })
            this.user.browser = data.browser
            this.user.ip_address = data.ip_address
            this.user.language = data.language
            this.user.last_auth = data.last_auth
            this.user.auto_sync = data.auto_sync
            this.user.key_value = data.key_value
            this.user.start_date = data.start_date
            this.user.timezone = data.timezone
            this.user.role = data.role
            this.user.status = data.status
            this.user.username = data.username
            this.user.photo = this.records.photo
            this.user.password = data.password

            //window.location.reload()
          },
          error => {
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'Something went wrong!'
            })
          }
        )
      }


    } else {
      Swal.fire('Nothing was changed')
      //this.router.navigateByUrl('/users')
    }
  }

  getUsersPermissions() {
    this.userPermissionsService.getUserPermissionsByUserId(this.id).subscribe(
      result => {
        let r = result
        let permissions = JSON.parse(r.code);
        this.userPermissions.code = permissions
        this.userPermissions.id = r.id
        this.userPermissions.users = r.users
        this.userPermissions.status = r.status
        this.PermissionsList = permissions;

      },
      error => {
      }
    )
  }
  Onchange(event: Event, action: any) {
    let target = (<HTMLInputElement>event.target);
    let permission = target.closest('tr')?.dataset['permission'];
    if (target.closest('tr') != null && permission != undefined && permission != null) {
      if (target.checked) {
        this.PermissionsList[permission].push(action);
      } else {
        const index = this.PermissionsList[permission].indexOf(action)
        if (index > -1) {
          this.PermissionsList[permission].splice(index, 1)
        }
      }
    }
  }
  getDiff() {
    let test: { [key: string]: any[] } = {}
    for (let key in this.PermissionsList) {
      if (JSON.stringify(this.PermissionsList[key]) === JSON.stringify(this.PermissionsList1[key])) { continue; } else {
        test[key] = this.PermissionsList[key];
      }
    }
    return test;
  }
  save() {
    this.userPermissionsService.getUserPermissionsByUserId(this.id).subscribe(
      result => {
        let r = result
        let permissions = JSON.parse(r.code);
        this.PermissionsList1 = permissions
        this.hasChange2 = JSON.stringify(this.PermissionsList) != JSON.stringify(this.PermissionsList1)
        if (this.hasChange2 == true) {
          this.userPermissions.code = JSON.stringify(this.PermissionsList);
          this.userPermissionsService.updateUserPermissions(this.userPermissions, this.userPermissions.id).subscribe(
            result => {
              //user_permissions =10
              this.CreateLogs("edit", new Date(), 10, r.id, this.d, 1, JSON.stringify(this.getDiff()))
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
                title: 'User Edited successfully'
              })
              //this.router.navigateByUrl('/users')
            },
            error => {
              Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Something went wrong!'
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

  CreateLogs(action: String, action_date: Date, element: number, element_id: number, users: User, source: number, code: String) {
    this.userLogs.action = action
    this.userLogs.action_date = action_date
    //Accounts=0, Users=1, Servers=2, rules=3,groups=4,policies=5,rules_instances=6,groups_rules=7,policies_instances=8, user_permissions =10
    this.userLogs.element = element
    this.userLogs.element_id = element_id
    this.userLogs.users = users
    // /account = 0, /users=1, /servers=2, /rules=3, /groups=4, /policies=5
    this.userLogs.source = source
    this.userLogs.code = code

    this.usersLogsService.saveUserLogs(this.userLogs).subscribe(
      result => {

      },
      error => {

      }
    )
  }
  getUserLogs1() {
    this.getUserLogs()
  }

  openModal(targetModal: any, rule: Rule) {
    this.modalReference= this.modalService.open(targetModal, {
      centered: true,
      backdrop: 'static'
    });

    this.ruleFormEdit.patchValue({ id: rule.id })
    this.ruleFormEdit.patchValue({ name: rule.name })
    this.ruleFormEdit.patchValue({ action: rule.action })
    this.ruleFormEdit.patchValue({ protocol: rule.protocol })
    this.ruleFormEdit.patchValue({ port: rule.port })
    this.ruleFormEdit.patchValue({ ip_address: rule.ip_address })
    this.ruleFormEdit.patchValue({ status: rule.status })
    this.ruleFormEdit.patchValue({ start_date: rule.start_date })
    this.ruleFormEdit.patchValue({ end_date: rule.end_date })

  }

  openModalAssignUserToServer(targetModal: any, server: Server) {
    this.modalService.open(targetModal, {
      centered: true,
      backdrop: 'static'
    });
    this.getUserServers()
  }
  openModalServer(targetModal: any) {
    this.modalReference2 = this.modalService.open(targetModal, {
      centered: true,
      backdrop: 'static',
      size: 'xl'
    });
  }
  openModalAssignRule(targetModal: any, rule: Rule) {
    this.modalReference3 =  this.modalService.open(targetModal, {
      centered: true,
      backdrop: 'static'
    });
  }
  openModalAddRule(targetModal: any, rule: Rule) {
    this.modalReference1 =  this.modalService.open(targetModal, {
      centered: true,
      backdrop: 'static'
    });

  }
  onSubmit() {
    this.modalService.dismissAll();
    this.ruleFormAdd.reset()
    this.userServerRulesFormAdd.reset()
    this.userServerFormAdd.reset()
  }
  closeModalAssignRule(){
    this.modalReference3.close();
    this.userServerRulesFormAdd.reset()
  }
  closeModalServer(){
    this.modalReference2.close()
  }
  closeModalAddRule(){
    this.modalReference1.close();
    this.ruleFormAdd.reset()
  }
  close(){
    this.modalReference.close()
  }

  deleteUserServer(id: any) {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't to delete this user server ?!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.usersServersService.getUserServerByUserServerId(this.id, id).subscribe(
          result => {
            let user_server = result
            user_server.status = 4
            user_server.end_date = new Date()
            this.usersServersService.updateUserServer(user_server, user_server.id).subscribe(
              result => {
                this.CreateLogs("delete", new Date(), 16, user_server.id, this.d, 1, '')
                this.getUsersServers()
                this.usersServersRulesService.getUserServerRuleByUserServID(user_server.id).subscribe(
                  result=>{
                    let res = result
                    for(let i=0; i<res.length;i++){
                      res[i].status = 4
                      res[i].end_date = new Date()
                      this.usersServersRulesService.updateUserServer(res[i],res[i].id).subscribe(
                        result=>{

                        },error=>{

                        }
                      )
                    }
                  },error=>{

                  }
                )
              }, error => {

              }
            )
          }, error => {

          }
        )
        Swal.fire('Deleted!',
          'Server has been deleted.',
          'success'
        )
      }
    })
  }
  deleteUserServerRule(idr: any,ids:any) {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't to delete this user server rule ?!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.usersServersService.getUserServerByUserServerId(this.id, ids).subscribe(
          result => {
            this.userServer = result
            this.usersServersRulesService.getUserServerRule(this.userServer.servers?.id, idr).subscribe(
              result => {
                this.userServerRule = result
                this.userServerRule.end_date = new Date()
                this.userServerRule.status = 4
                this.usersServersRulesService.updateUserServer(this.userServerRule,this.userServerRule.id).subscribe(
                  result=>{
                    this.CreateLogs("delete", new Date(), 15, this.userServerRule.id, this.d, 1, '')
                    this.getUsersServersRulesList(ids)
                    this.firewallScriptService.RuleIptables({ server_id: this.userServer.servers?.id, Task: "delete", id_rule: idr }).subscribe(
                    response => {

                    }
                  )
                  },error=>{

                  }
                )

              }, error => {

              }
            )
          }, error => {

          }
        )
        Swal.fire('Deleted!',
          'Rule has been deleted.',
          'success'
        )
      }
    })
  }

  ValidateIPaddress3(ipaddress: any) {
    if (/^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/.test(this.ruleFormAdd.get('ip_address')?.value)) {
      return (true)
    }
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'You have entered an invalid IP address!'
    })
    return (false)
  }
  ValidateIPaddress2(ipaddress: any) {
    if (/^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/.test(this.ruleFormEdit.get('ip_address')?.value)) {
      return (true)
    }
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'You have entered an invalid IP address!'
    })
    return (false)
  }

  checkIfValidPortnumber(port: any) {
    // Regular expression to check if number is a valid port number
    if (/^((6553[0-5])|(655[0-2][0-9])|(65[0-4][0-9]{2})|(6[0-4][0-9]{3})|([1-5][0-9]{4})|([0-5]{0,5})|([0-9]{1,4}))$/gi.test(this.ruleFormAdd.get('port')?.value)) {
      return (true)
    }

    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'You have entered an invalid Port number!'
    })
    return (false)
  }
  checkIfValidPortnumber1(port: any) {
    // Regular expression to check if number is a valid port number
    if (/^((6553[0-5])|(655[0-2][0-9])|(65[0-4][0-9]{2})|(6[0-4][0-9]{3})|([1-5][0-9]{4})|([0-5]{0,5})|([0-9]{1,4}))$/gi.test(this.ruleFormEdit.get('port')?.value)) {
      return (true)
    }

    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'You have entered an invalid Port number!'
    })
    return (false)
  }
}
