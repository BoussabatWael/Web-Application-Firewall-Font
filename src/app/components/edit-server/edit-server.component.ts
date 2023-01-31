import { Component, ElementRef, OnChanges, OnInit, Renderer2, SimpleChanges } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Account } from 'src/app/model/account';
import { Category } from 'src/app/model/category';
import { Provider } from 'src/app/model/provider';
import { Rule } from 'src/app/model/rule';
import { Server } from 'src/app/model/server';
import { AccountsService } from 'src/app/services/accounts.service';
import { CategoriesService } from 'src/app/services/categories.service';
import { ProvidersService } from 'src/app/services/providers.service';
import { RulesService } from 'src/app/services/rules.service';
import { ServersService } from 'src/app/services/servers.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { RulesInstances } from 'src/app/model/rules-instances';
import { RulesInstancesService } from 'src/app/services/rules-instances.service';
import { UsersLogs } from 'src/app/model/users-logs';
import { UsersLogsService } from 'src/app/services/users-logs.service';
import { User } from 'src/app/model/user';
import Swal from 'sweetalert2';
import { UsersPermissionsService } from 'src/app/services/users-permissions.service';
import { CredentialsAccount } from 'src/app/model/credentials-account';
import { CredentialsAccountService } from 'src/app/services/credentials-account.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { FirewallScriptService } from 'src/app/services/firewall-script.service';
import { ThisReceiver } from '@angular/compiler';
import { UrlprotectionService } from 'src/app/services/urlprotection.service';
import { Urlprotection } from 'src/app/model/urlprotection';
import { of } from 'rxjs';

@Component({
  selector: 'app-edit-server',
  templateUrl: './edit-server.component.html',
  styleUrls: ['./edit-server.component.css']
})
export class EditServerComponent implements OnInit, OnChanges {
  public serverForm!: FormGroup
  public ruleFormEdit!: FormGroup
  public ruleFormAdd!: FormGroup
  public ruleInstancesForm!: FormGroup
  public CredentialsFormAdd!: FormGroup
  public CredentialsFormEdit!: FormGroup
  public checkForm!: FormGroup
  public URLFormEdit!: FormGroup
  public URLFormAdd!: FormGroup
  rulesList: Rule[] = []
  rulesInstancesList: Rule[] = []
  ruleInstanceList: RulesInstances[] = []
  ruleInstanceList1: RulesInstances[] = []
  accountsList: Account[] = []
  categoriesList: Category[] = []
  providersList: Provider[] = []
  serversList: Server[] = []
  usersLogsList: UsersLogs[] = []
  sshCredentialsList: CredentialsAccount[] = []
  urlProtection: Urlprotection[] = []
  CsfDenyList: []=[]
  csfList:[]=[]
  CsfAllowList: []=[]
  response: any
  response1: any
  response11: any
  response111: any
  response2: any
  response3: any
  servicesList: []=[]
  openedPortsList: any[]=[]
  Fail2banLogsList: []=[]
  Fail2banIPbanned: []=[]
  urlProtectionList: any[] = []
  credentialsAccount = new CredentialsAccount()
  server: Server = new Server()
  userLogs: UsersLogs = new UsersLogs()
  ruleInstances: RulesInstances = new RulesInstances()
  rule: Rule = new Rule()
  submitted = false;
  userPermission: any
  usrPer: any
  selectedOption: any
  id: any
  p1: number = 1
  p2: number = 1
  p3: number = 1
  p4: number = 1
  p5: number = 1
  p6: number = 1
  p7: number = 1
  p8: number = 1
  p9: number = 1
  p10: number = 1
  user: any
  d: any
  acc: any
  account: any
  dataaa: any
  credentialsinfo: any
  hasChange: boolean = false;
  hasChange2: boolean = false;
  hasChange3: boolean = false;
  searchText: any
  searchText1: any
  searchText2: any
  searchText3: any
  searchText4: any
  searchText5: any
  rulesInstancesNumber: any
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
  Message1:any
  Message2:any
  Message3:any
  OS_Message:any
  constructor(private fb: FormBuilder, private serverService: ServersService, private ruleService: RulesService,
    private accountService: AccountsService, private categoryService: CategoriesService, private modalService: NgbModal,
    private providerService: ProvidersService, private ruleInstancesService: RulesInstancesService,
    private usersLogsService: UsersLogsService, private router: Router, private usersPermissionsService: UsersPermissionsService,
    private credentialsService: CredentialsAccountService, private route: ActivatedRoute, private SpinnerService: NgxSpinnerService,
    private firewallScriptService: FirewallScriptService, private urlProtectionService: UrlprotectionService,private renderer: Renderer2, private el: ElementRef) {
    this.serverForm = this.fb.group(
      {
        id: [''],
        name: ['', Validators.required],
        ip_address: ['', Validators.required],
        authorization: [''],
        operating_system: [''],
        system_version: [''],
        status: [''],
        start_date: [''],
        end_date: [''],
        account: this.fb.group({
          id: ['']
        }),
        categories: this.fb.group({
          id: ['']
        }),
        providers: this.fb.group({
          id: ['']
        })
      }
    )
    this.ruleInstancesForm = this.fb.group(
      {
        id: [''],
        status: [''],
        start_date: [''],
        end_date: [''],
        servers: this.fb.group({
          id: ['']
        }),
        rules: this.fb.group({
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
    this.CredentialsFormEdit = this.fb.group(
      {
        id: [''],
        login: ['', Validators.required],
        name: [''],
        password: ['', Validators.required],
        port: ['', Validators.required],
        source: [''],
        source_id: [''],
        status: ['']
      }
    )

    this.ruleFormAdd = this.fb.group(
      {
        id: [''],
        name: ['', Validators.required],
        action: ['', Validators.required],
        protocol: ['', Validators.required],
        port: ['', Validators.required],
        ip_address: ['', Validators.required],
        status: [''],
        start_date: [''],
        account: this.fb.group({
          id: ['']
        }),
        servers: this.fb.group({
          id: ['']
        })
      }
    )
    this.CredentialsFormAdd = this.fb.group(
      {
        id: [''],
        login: ['', Validators.required],
        name: [''],
        password: ['', Validators.required],
        port: ['', Validators.required],
        source: [''],
        source_id: [''],
        status: ['']
      }
    )
    this.checkForm = this.fb.group(
      {
        port: [''],
        ip: [''],
        target: ['', Validators.required]
      }
    )
    this.URLFormAdd = this.fb.group(
      {
        id: [''],
        url: [''],
        ip_address: [''],
        status: [''],
        server: this.fb.group({
          id: ['']
        })
      }
    )
    this.URLFormEdit = this.fb.group(
      {
        id: [''],
        url: ['', Validators.required],
        ip_address: ['', Validators.required],
        status: ['', Validators.required],
        server: this.fb.group({
          id: ['']
        })
      }
    )
  }
  ngOnChanges(changes: SimpleChanges): void {
    let currentUrl = this.router.url;
    this.ruleFormAdd.reset();
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
    this.id = this.route.snapshot.params["id"]
    this.serverService.getServerById(this.id).subscribe(
      result => {
        this.server = result
        this.serverForm.patchValue({ id: this.server.id })
        this.serverForm.patchValue({ status: this.server.status })
        this.serverForm.patchValue({ start_date: this.server.start_date })
        //this.userForm.patchValue({account:this.user.account?.id})
        this.ruleFormEdit.patchValue({ id: this.rule.id })
      },
      error => {
      }
    )
    this.getAllServers()
    this.getCredentials()
    this.getAllAccounts()
    this.getAllCategories(this.acc.id)
    this.getAllProviders(this.acc.id)
    this.getAllRulesInstancesByServerId(this.id)
    this.getServersUsersLogs()
    this.getCsfList()
    this.getOpenedPorts()
    this.getServices()
    this.getFail2banLogs()
    this.getFail2banBannedip()
    this.getUrlProtection()
    this.getRulesInstancesNumberByServerId()

    const parent = this.renderer.parentNode(this.el.nativeElement);

    if (parent.getElementsByTagName('LABEL').length && !parent.getElementsByClassName('required-asterisk').length) {
      parent.getElementsByTagName('LABEL')[0].innerHTML += '<span class="required-asterisk">*</span>';
    }

  }
  get FormUrlEdit() {
    return this.URLFormEdit.controls;
  }
  get FormRuleEdit() {
    return this.ruleFormEdit.controls;
  }
  get FormCredentialsEdit() {
    return this.CredentialsFormEdit.controls;
  }
  get FormRuleAdd() {
    return this.ruleFormAdd.controls;
  }
  get FormCredentialsAdd() {
    return this.CredentialsFormAdd.controls;
  }
  get form() {
    return this.serverForm.controls;
  }
  get formcheck() {
    return this.checkForm.controls;
  }
  get urlform() {
    return this.URLFormAdd.controls;
  }

  getRulesInstancesNumberByServerId() {
    this.ruleInstancesService.getRulesInstancesNumberByServerId(this.id).subscribe(
      result => {
        this.rulesInstancesNumber = result
      }, error => {

      }
    )
  }
  getAllServers() {
    this.serverService.getAllServers().subscribe(
      result => {
        this.serversList = result

      },
      error => {
      }
    )
  }
  getUrlProtection() {
    this.urlProtectionService.getAllUrlProtectionByserver(this.id).subscribe(
      result => {
        this.urlProtectionList = result
      },
      error => {

      }
    )
  }
  getFail2banLogs() {
    this.firewallScriptService.fail2banlogs({ server_id: this.id, Task: "fail2banlogs" }).subscribe(
      result => {
        if (result) {
          document.querySelector('#IPS .innerLoad')?.classList.add('d-none');
          document.querySelector('#IPS .card.body')?.classList.remove('card','body');

        }
        this.response = result
        this.response111 = this.response.code
        this.Fail2banLogsList = this.response.data

      },
      error => {

      }
    )
  }
  getFail2banBannedip() {
    this.firewallScriptService.fail2banIPbanned({ server_id: this.id, Task: "fail2banIPbanned" }).subscribe(
      result => {
        this.response = result
        this.Fail2banIPbanned = this.response.data
      },
      error => {

      }

    )
  }
  getCsfList() {
    this.firewallScriptService.CSF({ server_id: this.id, Task: "csf" }).subscribe(
      result => {
        if (result) {
          document.querySelector('#ports .innerLoad')?.classList.add('d-none');
          document.querySelector('#ports .card.body')?.classList.remove('card','body');
        }
        this.response = result
        this.response1 = this.response.code
        this.CsfDenyList = this.response.data[0]
        this.CsfAllowList = this.response.data[1]
      },
      error => {
      }
    )
  }
  getOpenedPorts() {
    this.firewallScriptService.openedPorts({ server_id: this.id, Task: "openedports" }).subscribe(
      result => {
        this.response = result
        this.openedPortsList = this.response.data
      },
      error => {
      }
    )
  }
  getServices() {
    this.firewallScriptService.services({ server_id: this.id, Task: "services" }).subscribe(
      result => {
        if (result) {
          document.querySelector('#services .innerLoad')?.classList.add('d-none');
          document.querySelector('#services .card.body')?.classList.remove('card','body');

        }
        this.response = result
        this.response11 = this.response.code
        this.servicesList = this.response.data
      },
      error => {
      }
    )
  }
  startService(service: any, event: Event) {
    this.firewallScriptService.startService({ server_id: this.id, Task: "startservice", service: service }).subscribe(
      async result => {
        this.response = result
        if (this.response && this.response.code == "success") {
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
            icon: 'info',
            title: this.response.data
          })
          let element = event.target as Element;
          if (element != null) {
            if (element.closest('tr') != null) {
              let status = element?.closest('tr')?.querySelectorAll('td')[1] as Element;
              status.innerHTML! = "Active";
              let actions = element?.closest('td') as Element;
              actions.innerHTML! = '<div class="d-flex flex-wrap gap-2 justify-content-center"> <button type="submit" class="btn btn-outline-primary restart">Restart</button><button type="button" class="btn btn-secondary waves-effect waves-light stop">Stop</button> </div>';
              actions.querySelector('.stop')?.addEventListener('click', this.stopService.bind(this, service));
              actions.querySelector('.restart')?.addEventListener('click', this.restartService.bind(this, service));
            }
          }
        }
        else {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Error while starting service'
          })
        }

      },
      error => {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Error while starting service'
        })
      }
    )
  }
  restartService(service: any, event: Event) {
    this.firewallScriptService.restartService({ server_id: this.id, Task: "restartservice", service: service }).subscribe(
      async result => {
        this.response = result
        if (this.response && this.response.code == "success") {
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
            icon: 'info',
            title: this.response.data
          })
        }
        else {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Error while restarting service'
          })
        }

      },
      error => {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Error while restarting service'
        })
      }
    )
  }
  installService(service: any, event: Event) {
    this.firewallScriptService.installService({ server_id: this.id, Task: "installservice", service: service }).subscribe(
      async result => {
        this.response = result
        if (this.response && this.response.code == "success") {
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
            icon: 'info',
            title: this.response.data
          })
          let element = event.target as Element;
          if (element != null) {
            if (element.closest('tr') != null) {
              let status = element?.closest('tr')?.querySelectorAll('td')[1] as Element;
              status.innerHTML! = "Active";
              let actions = element?.closest('td') as Element;
              actions.innerHTML! = '<div class="d-flex flex-wrap gap-2"> <button type="submit" class="btn btn-outline-primary restart">Restart</button><button type="button" class="btn btn-secondary waves-effect waves-light stop">Stop</button> </div>';
              actions.querySelector('.stop')?.addEventListener('click', this.stopService.bind(this, service));
              actions.querySelector('.restart')?.addEventListener('click', this.restartService.bind(this, service));
            }
          }
        }
        else {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Error while restarting service'
          })
        }

      },
      error => {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Error while restarting service'
        })
      }
    )
  }
  stopService(service: any, event: Event) {
    this.firewallScriptService.stopService({ server_id: this.id, Task: "stopservice", service: service }).subscribe(
      async result => {
        this.response = result
        if (this.response && this.response.code == "success") {
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
            icon: 'info',
            title: this.response.data
          })
          let element = event.target as Element;
          if (element != null) {
            if (element.closest('tr') != null) {
              let status = element?.closest('tr')?.querySelectorAll('td')[1] as Element;
              status.innerHTML! = "Stopped";
              let actions = element?.closest('td') as Element;
              actions.innerHTML! = '<div class="d-flex flex-wrap gap-2 justify-content-center"> <button type="submit" class="btn btn-outline-primary start">Start</button> <button type="button" class="btn btn-secondary waves-effect waves-light" disabled>Stop</button></div>';
              actions.querySelector('.start')?.addEventListener('click', this.startService.bind(this, service));
            }
          }
        }
        else {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Error while stoping service'
          })
        }

      },
      error => {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Error while stoping service'
        })
      }
    )
  }
  Check() {
    let fields = this.checkForm.value
    if (this.checkForm.invalid || this.checkForm.value.length == 0) {
      this.submitted = true;

      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Error , Field required !'
      })
      return;
    }
    if (this.selectedOption == "ip") {
      if(!this.ValidateIPaddress6(fields.target)){
        return;
      }
    else{
    document.querySelector('.checkOs')?.classList.remove('d-none');
    document.querySelector('.checkOsTitle')!.innerHTML = "Checking IP address ...";
      this.firewallScriptService.checkip({ server_id: this.id, Task: "checkip", host: fields.target }).subscribe(
        result => {
          this.response = result
          if (this.response && this.response.code == "success") {
          document.querySelector('.checkOs')?.classList.add('d-none');
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
              icon: 'info',
              title: this.response.data
            })
          }
          else {
          document.querySelector('.checkOs')?.classList.add('d-none');
          document.querySelector('.checkOsResults')!.innerHTML = "";

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
              icon: 'info',
              title: this.response.data
            })
          }

        },
        error => {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Something went wrong'
          })
        }
      )
    }

    } else if (this.selectedOption == "port") {
    if(!this.checkIfValidPortnumber4(fields.target)){
        return;
      }
    else{
    document.querySelector('.checkOs')?.classList.remove('d-none');
    document.querySelector('.checkOsTitle')!.innerHTML = "Checking port ...";
      this.firewallScriptService.checkport({ server_id: this.id, Task: "checkport", host: this.server.ip_address, port: fields.target }).subscribe(
        result => {
          this.response = result
          if (this.response && this.response.code == "success") {
          document.querySelector('.checkOs')?.classList.add('d-none');
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
              icon: 'info',
              title: this.response.data
            })
          }
          else {
          document.querySelector('.checkOs')?.classList.add('d-none');
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
              icon: 'info',
              title: "Error ..."
            })
          }
        },
        error => {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Something went wrong'
          })
        }
      )
      }

    }
    else {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'You must select an option !'
      })

    }
  }
  changecheck(event: Event) {
    this.selectedOption = (event.target as HTMLTextAreaElement).value
  }
  getAllRulesInstancesByServerId(id: this) {
    this.ruleInstancesService.getRuleInstancesByServerId(id).subscribe(
      result => {
        this.ruleInstanceList = result
        //this.server.rulesInstances = this.server.rulesInstances?.filter(x=>x.servers?.id === this.server.id)
      },
      error => {
      }
    )
  }
  getAllCategories(account_id:any) {
    this.categoryService.getAllCategories(account_id).subscribe(
      result => {
        this.categoriesList = result

      },
      error => {
      }
    )
  }
  getAllProviders(account_id:any) {
    this.providerService.getAllProviders(account_id).subscribe(
      result => {
        this.providersList = result

      },
      error => {
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
  getCredentials() {
    this.credentialsService.getCredentialsBySourceId(this.id).subscribe(
      result => {
        this.sshCredentialsList = result
      },
      error => {
      }
    )
  }
  ChechCredentials(){
    if(this.server.status == 2){
      this.Message1= "No Credetnials to connect to the server"
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
        icon: 'info',
        title: this.Message1
      })
    }else if (this.server.status == 1){
      this.firewallScriptService.Check_OS({server_id : this.id, Task:"check_os"}).subscribe(
        response=>{
          this.response = response
          if(this.response && this.response.code == "success"){
            this.Message1 = "success"
            this.server.operating_system = this.response.data[0]
            this.server.system_version = this.response.data[1]
            this.serverService.updateServer(this.server,this.id).subscribe(
              result=>{

              },error=>{

              }
            )
          }else{
            this.Message1 = "error"
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
              icon: 'info',
              title: "OS NOT SUPPORTED"
            })
          }
        },error=>{
          this.Message1= "Failed to connect to the server"
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
            icon: 'info',
            title: this.Message1
          })
        }
      )
    }
  }
  getServersUsersLogs() {
    this.usersLogsService.getServersUsersLogs(this.id).subscribe(
      result => {
        this.usersLogsList = result.map( (elem:any) => {elem.element = this.elementType[elem.element];elem.source = this.sourceType[elem.source]; return elem});
      },
      error => {
      }
    )
  }

  updateServer(id: any) {
    this.serverForm.patchValue({ end_date: this.server.end_date })
    let data = this.serverForm.value
    data.account = this.server.account
    data.categories = this.server.categories
    data.providers = this.server.providers
    if (this.serverForm.invalid || this.serverForm.value.length == 0) {
      this.submitted = true;

      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Fill all information!'
      })
      return;
    } else if (!this.ValidateIPaddress(this.server.ip_address)) {
      return;
    }

    this.hasChange = (data.authorization != this.server.authorization || data.end_date != this.server.end_date || data.ip_address != this.server.ip_address || data.name != this.server.name
      || data.operating_system != this.server.operating_system || data.start_date != this.server.start_date || data.status != this.server.status || data.system_version != this.server.system_version
      || data.account != this.server.account || data.categories != this.server.categories || data.providers != this.server.providers)
    if (this.hasChange == true) {
      this.serverService.updateServer(data, id).subscribe(
        result => {

          this.CreateLogs("edit", new Date(), 2, id, this.d, 2)
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
          this.server.name = data.name
          this.server.ip_address = data.ip_address
          this.server.operating_system = data.operating_system
          this.server.system_version = data.system_version
          this.server.status = data.status
          this.server.authorization = data.authorization
          this.server.start_date = data.start_date
          this.server.end_date = data.end_date
          //this.router.navigateByUrl('/servers')

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
      //this.router.navigateByUrl('/servers')
    }
  }
  updateRule(id: any, r: Rule) {
    this.dataaa = this.ruleFormEdit.value
    this.dataaa.account = r.account
    if (this.ruleFormEdit.invalid || this.ruleFormEdit.value.length == 0) {
      this.submitted = true;
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Fill all information!'
      })
      return;
    }else if(this.dataaa.ip_address != ""){
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
      if(this.dataaa.ip_address == ""){
          this.ruleService.updateRule(this.dataaa, id).subscribe(
                  result => {
                    let dataa = this.ruleFormEdit.getRawValue()

                    let row = document.querySelector('#table_rule tr[id="' + dataa.id + '"]')
                    if (row != null) {
                      let r = row.querySelectorAll('td');
                      if (r !== null) {
                        r[1].textContent = dataa.name
                        r[2].textContent = dataa.action
                        r[3].textContent = dataa.protocol
                        r[4].textContent = dataa.port
                        r[5].textContent = dataa.ip_address
                        r[6].textContent = dataa.status

                      }
                    }
                    this.CreateLogs("edit", new Date(), 3, dataa.id, this.d, 2)

                    this.ruleInstancesService.getRulesInstancesList(dataa.id, this.server.id).subscribe(
                      result => {
                        let ri = result
                        let ri_id = ri.id
                        this.CreateLogs("edit", new Date(), 6, ri_id, this.d, 2)
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
                      error => {
                        Swal.fire({
                          icon: 'error',
                          title: 'Oops...',
                          text: 'Something went wrong!'
                        })

                      })
                    this.onSubmit()
                    this.getAllRulesInstancesByServerId(this.id)
                  },
                  error => {
                  }
                )
      }
      else{
  let char = this.ruleInstanceList.filter((c => c.rules?.id === id));
      if (char != null) {
      document.querySelector('.checkOs')?.classList.remove('d-none');
      document.querySelector('.checkOsTitle')!.innerHTML = "Updating rule ...";
        for (let i = 0; i < char.length; i++) {

          this.firewallScriptService.RuleIptables({ server_id: char[i]["servers"]?.id, Task: "edit", ruleId: id,new_protocol: this.dataaa.protocol ,new_ip_address: this.dataaa.ip_address, new_port: this.dataaa.port, new_action: this.dataaa.action }).subscribe(
            response => {
              this.response3 = response
              if(this.response3 && this.response3.code =="success"){
              if (i + 1 == char.length) {
                this.ruleService.updateRule(this.dataaa, id).subscribe(
                  result => {
                  document.querySelector('.checkOs')?.classList.add('d-none');
                    let dataa = this.ruleFormEdit.getRawValue()

                    let row = document.querySelector('#table_rule tr[id="' + dataa.id + '"]')
                    if (row != null) {
                      let r = row.querySelectorAll('td');
                      if (r !== null) {
                        r[1].textContent = dataa.name
                        r[2].textContent = dataa.action
                        r[3].textContent = dataa.protocol
                        r[4].textContent = dataa.port
                        r[5].textContent = dataa.ip_address
                        r[6].textContent = dataa.status

                      }
                    }
                    this.CreateLogs("edit", new Date(), 3, dataa.id, this.d, 2)

                    this.ruleInstancesService.getRulesInstancesList(dataa.id, this.server.id).subscribe(
                      result => {
                        let ri = result
                        let ri_id = ri.id
                        this.CreateLogs("edit", new Date(), 6, ri_id, this.d, 2)
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
                      error => {
                        Swal.fire({
                          icon: 'error',
                          title: 'Oops...',
                          text: 'Something went wrong!'
                        })

                      })
                    this.onSubmit()
                    this.getAllRulesInstancesByServerId(this.id)
                  },
                  error => {
                  }
                )
              }
              }

            }
          )
        }
      }
      }

    } else {
      Swal.fire('Nothing was changed')
      this.onSubmit()
    }
  }
  updateUrl(id: any, urlprotection: Urlprotection) {
    this.URLFormEdit.patchValue({ server: this.server })
    this.URLFormEdit.patchValue({ status: 1 })
    let dataaa = this.URLFormEdit.value
    if (this.URLFormEdit.invalid || this.URLFormEdit.value.length == 0) {
      this.submitted = true;
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Fill all information!'
      })
      return;
    } else if (!this.ValidateIPaddress5(urlprotection.ip_address)) {
      return;
    }
    this.hasChange = (dataaa.url != urlprotection.url || dataaa.ip_address != urlprotection.ip_address)
    if (this.hasChange == true) {
      document.querySelector('.checkOs')?.classList.remove('d-none');
      document.querySelector('.checkOsTitle')!.innerHTML = "Updating URL ...";
      this.firewallScriptService.updateurl({ server_id: this.id, Task: "updateurl", id_url: id, url2: dataaa.url, ip_address2: dataaa.ip_address }).subscribe(
        result => {
          this.response = result
          if (this.response && this.response.code == 'success') {
            this.urlProtectionService.updateUrlProtection(dataaa, id).subscribe(
              result => {
                let dataa = this.URLFormEdit.getRawValue()
                let row = document.querySelector('#tableurl tr[id="' + dataa.id + '"]')
                if (row != null) {
                  let r = row.querySelectorAll('td');
                  if (r !== null) {
                    r[1].textContent = dataa.ip_address
                    r[2].textContent = dataa.url

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
                    title: 'URL updated successfully'
                  })
                }
                this.CreateLogs("edit", new Date(), 2, dataa.id, this.d, 2)
                document.querySelector('.checkOs')?.classList.add('d-none');

                this.getUrlProtection()
                this.onSubmit()
              },
              error => {
                document.querySelector('.checkOs')?.classList.add('d-none');
                Swal.fire({
                  icon: 'error',
                  title: 'Oops...',
                  text: 'Error !'
                })
              }
            )
          }
          else {
            document.querySelector('.checkOs')?.classList.add('d-none');
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'Error !'
            })
          }
        },
        error => {
          document.querySelector('.checkOs')?.classList.add('d-none');
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Error !'
          })
        }
      )


    } else {
      Swal.fire('Nothing was changed')
      this.onSubmit()
    }
  }
  updateCredentials(id: any, credential: CredentialsAccount) {
    this.credentialsinfo = this.CredentialsFormEdit.value
    this.credentialsinfo.status = credential.status
    this.credentialsinfo.classe = credential.classe
    this.credentialsinfo.name = credential.name
    this.credentialsinfo.source = credential.source
    this.credentialsinfo.source_id = credential.source_id

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

    if (this.CredentialsFormEdit.invalid || this.CredentialsFormEdit.value.length == 0) {
      this.submitted = true;
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Fill all information!'
      })
      return;
    } else if (!this.checkIfValidPortnumber2(this.credentialsAccount.port)) {
      return;
    }
    this.hasChange3 = (this.credentialsinfo.name != credential.name || this.credentialsinfo.login != credential.login || this.credentialsinfo.password != credential.password || this.credentialsinfo.port != credential.port
      || this.credentialsinfo.status != credential.status)
    if (this.hasChange3 == true) {
    document.querySelector('.checkOs')?.classList.remove('d-none');
    document.querySelector('.checkOsTitle')!.innerHTML = "Connecting to server ...";
      this.firewallScriptService.Connect({server_id: this.id, Task: "Connect", username: this.credentialsinfo.login, password:this.credentialsinfo.password, port:this.credentialsinfo.port }).subscribe(
        response=>{
          this.response = response

          if (this.response && this.response.code == "success"){
          document.querySelector('.checkOsResults')!.innerHTML += '<div class="alert alert-success mt-4">Connected successfully</div>';
          document.querySelector('.checkOsTitle')!.innerHTML = "Checking operating system ...";
            this.credentialsService.updateCredentials(this.credentialsinfo, id).subscribe(
              result => {
                let data = this.CredentialsFormEdit.getRawValue()
                let row = document.querySelector('#table_c tr[id="' + data.id + '"]')
                if (row != null) {
                  let r = row.querySelectorAll('td');
                  if (r !== null) {
                    r[1].textContent = data.login
                    r[2].textContent = "************"
                    r[3].textContent = data.port
                    this.CreateLogs("edit", new Date(), 9, id, this.d, 2)
                  }
                }
            this.firewallScriptService.Check_OS({server_id:this.id, Task:"check_os"}).subscribe(
                  response=>{
                    this.response = response
                  if(this.response && this.response.code == "success"){
                    document.querySelector('.checkOsResults')!.innerHTML += '<div class="alert alert-success mt-4">Operating system supported</div>';
                    this.server.operating_system = this.response.data[0]
                    this.server.system_version = this.response.data[1]
                    this.server.status = 1
                    this.serverService.updateServer(this.server,this.id).subscribe(
                      result=>{

                      },error=>{

                      }
                    )

                    this.getCsfList()
                    this.getCredentials()
                    this.getFail2banBannedip()
                    this.getFail2banLogs()
                    this.getOpenedPorts()
                    this.getServices()
                    this.onSubmit();

                  Toast.fire({
                    icon: 'success',
                    title: 'Credentials Edited successfully'
                  })

                  }else{
                    this.OS_Message = 'OS NOT SUPPORTED'
                    this.server.operating_system = 'NOT SUPPORTED'
                    this.server.system_version = 'NOT SUPPORTED'
                    this.server.status = 2
                    this.serverService.updateServer(this.server,this.id).subscribe(
                      result=>{

                      },error=>{

                      }
                    )
                  Toast.fire({
                    icon: 'success',
                    title: 'Credentials Edited successfully'
                  })
                  }

                this.onSubmit()
                this.getCredentials()

                  },error=>{

                  }
                )
              },
              error => {
              }
            )

          }
          else{
          document.querySelector('.checkOsResults')!.innerHTML += '<div class="alert alert-danger mt-4">Failed to connect</div>';
          document.querySelector('.checkOs')?.classList.add('d-none');
          document.querySelector('.checkOsResults')!.innerHTML = "";
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'Invalid Credentials !'
            })
          }
        },error=>{
          document.querySelector('.checkOsResults')!.innerHTML += '<div class="alert alert-danger mt-4">Failed to connect</div>';
          document.querySelector('.checkOs')?.classList.add('d-none');
          document.querySelector('.checkOsResults')!.innerHTML = "";

          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Invalid Credentials !'
          })
        }
      )
/*
      this.firewallScriptService.Check_OS({ server_id: this.id, Task: "check_os" }).subscribe(
        result=>{

        },error=>{

        }
      )

      this.credentialsService.updateCredentials(this.credentialsinfo, id).subscribe(
        result => {
          let data = this.CredentialsFormEdit.getRawValue()

          let row = document.querySelector('#table_c tr[id="' + data.id + '"]')
          if (row != null) {
            let r = row.querySelectorAll('td');
            if (r !== null) {
              r[0].textContent = data.login
              r[1].textContent = data.password
              r[2].textContent = data.port
              this.CreateLogs("edit", new Date(), 9, data.id, this.d, 2)
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
                title: 'Credentials Edited successfully'
              })
            }
          }

          this.onSubmit()
          this.getCredentials()
        },
        error => {
        }
      )
*/
    } else {
      Swal.fire('Nothing was changed')
      this.onSubmit()
    }
  }
  deleteUrl(id: any) {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't to delete this URL ?!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.urlProtectionService.getUrlProtectionById(id).subscribe(
          result => {
            let UP = result
            let UP_id = UP.id
            let UP_url = UP.url
            this.firewallScriptService.deleteurl({ server_id: this.server.id, Task: "deleteurl", url: UP_url }).subscribe(
              result => {
                this.response = result
                if (this.response.code == 'success') {
                  UP.status = 4
                  this.urlProtectionService.updateUrlProtection(UP, UP_id).subscribe(
                    result => {

                      let row = document.getElementById(id);
                      if (row != null) {
                        row.remove()
                        this.urlProtectionList = this.urlProtectionList.filter(up => up.id !== id);
                      }
                    },
                    error => {
                      Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: 'Error !'
                      })
                    }
                  )
                } else {
                  Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Error !'
                  })
                }

              },
              error => {
                Swal.fire({
                  icon: 'error',
                  title: 'Oops...',
                  text: 'Error !'
                })
              }
            )
          },
          error => {
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'Error !'
            })
          }
        )


        Swal.fire('Deleted!',
          'URL has been deleted.',
          'success'
        )
      }
    })
  }
  deleteRule(id: any) {
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
        this.ruleInstancesService.getRulesInstancesByRuleId(id).subscribe(
          re => {
            this.ruleInstanceList1 = re
            let char = this.ruleInstanceList.filter((c => c.rules?.id === id));
            if (char != null) {
              for (let i = 0; i < char.length; i++) {
                this.firewallScriptService.RuleIptables({ server_id: char[i]["servers"]?.id, Task: "delete", id_rule: id }).subscribe(
                  response => {

                  }
                )
              }
            }
          }, err => {

          }
        )
        this.ruleService.getRuleById(id).subscribe(
          result => {
            let r = result
            let r_id = r.id
            this.ruleInstancesService.getRulesInstancesList(r_id, this.server.id).subscribe(
              result => {
                let RI = result
                let RI_id = RI.id
                RI.status = 4
                RI.end_date = new Date()
                this.rulesInstancesNumber = this.rulesInstancesNumber - 1
                this.ruleInstancesService.updateRulesInstances(RI, RI_id).subscribe(
                  result => {
                    //usr = result
                    let row = document.getElementById(id);
                    if (row != null) {
                      row.remove()
                      this.ruleInstanceList = this.ruleInstanceList.filter(r_i => r_i.rules?.id !== id);
                    }
                  },
                  error => {
                  }
                )
                //this.CreateLogs("delete",new Date(),3,r_id,this.server.account!,2)
                this.CreateLogs("delete", new Date(), 6, RI_id, this.d, 2)

              },
              error => {
              }
            )

          },
          error => {
          }
        )
        Swal.fire('Deleted!',
          'Rule has been deleted.',
          'success'
        )
      }
    })
  }
  deleteCredentials(id: any) {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't to delete this credentials ?!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.credentialsService.getCredentialsById(id).subscribe(
          result => {
            let c = result
            let c_id = c.id
            c.status = 4
            this.credentialsService.updateCredentials(c, c_id).subscribe(
              result => {
                this.CreateLogs("delete", new Date(), 9, c_id, this.d, 2)
                let row = document.getElementById(id);
                if (row != null) {
                  row.remove()
                  this.sshCredentialsList = this.sshCredentialsList.filter(c => c.id !== id);
                }
                Swal.fire('Deleted!',
                  'Credential has been deleted.',
                  'success'
                )
              },
              error => {
                Swal.fire({
                  icon: 'error',
                  title: 'Oops...',
                  text: 'Something went wrong!'
                })
              }
            )
          },
          error => {
          }
        )

      }
    })
  }
  addRule() {
    this.ruleFormAdd.patchValue({ account: this.acc })
    let data2 = this.ruleFormAdd.value
    data2.start_date = new Date()
    data2.status = 1
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
    }else if (!this.ValidateIPaddress3(this.rule.ip_address)) {
      return;
    } else if (!this.checkIfValidPortnumber(this.rule.port)) {
      return;
    }

    //add rule to iptables first
    document.querySelector('.checkOs')?.classList.remove('d-none');
    document.querySelector('.checkOsTitle')!.innerHTML = "Adding rule to server ...";
    this.firewallScriptService.RuleIptables({ server_id: this.server.id, Task: "add", ip_address: data2.ip_address, protocol: data2.protocol, port: data2.port, action: data2.action }).subscribe(
      response => {
        this.response3 = response
        if(this.response3 && this.response3.code == "success"){
          document.querySelector('.checkOs')?.classList.add('d-none');
    this.ruleService.saveRule(data2).subscribe(
      result => {
        this.rule = result
        this.ruleInstances.rules = this.rule
        this.ruleInstances.servers = this.server
        this.ruleInstances.status = 1
        this.ruleInstances.start_date = new Date()
        this.ruleInstancesService.saveRuleInstances(this.ruleInstances).subscribe(
          result => {
            this.ruleInstanceList?.push(this.ruleInstances)
            this.rulesInstancesNumber = this.rulesInstancesNumber + 1
            this.CreateLogs("create", new Date(), 3, this.rule.id!, this.d, 2)
            this.ruleInstancesService.getRuleInstanceByRuleId(this.rule.id).subscribe(
              result => {
                let ri = result
                let ri_id = ri.id
                this.CreateLogs("create", new Date(), 6, ri_id, this.d, 2)
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
              error => {
                Swal.fire({
                  icon: 'error',
                  title: 'Oops...',
                  text: 'Something went wrong!'
                })

              })
          },
          error => {
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'Something went wrong!'
            })

          })

      },
      error => {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Something went wrong!'
        })

      }

    )
        this.onSubmit()
        this.getAllRulesInstancesByServerId(this.id)
     }else{
          document.querySelector('.checkOs')?.classList.add('d-none');
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Add rule failed!'
        })
      }
      },
      error => {

      }
    )

  }
  addURL() {
    this.URLFormAdd.patchValue({ server: this.server })
    this.URLFormAdd.patchValue({ status: 1 })
    let data = this.URLFormAdd.value
    if (this.URLFormAdd.invalid || this.URLFormAdd.value.length == 0) {
      this.submitted = true;
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Fill all information!'
      })
      return;
    } else if (!this.ValidateIPaddress4(data.ip_address)) {
      return;
    }
    if (this.URLFormAdd.invalid || this.URLFormAdd.value.length == 0) {
      this.submitted = true;

      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Fill all information!'
      })
      return;
    }
    document.querySelector('.checkOs')?.classList.remove('d-none');
    document.querySelector('.checkOsTitle')!.innerHTML = "Adding URL ...";
    this.firewallScriptService.addurl({ server_id: this.server.id, Task: "addurl", url_to_protect: data.url, ip_add: data.ip_address }).subscribe(
      result => {
        this.response = result
        if (this.response && this.response.code == 'success') {
          this.urlProtectionService.saveUrlProtection(data).subscribe(
            result => {
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
              document.querySelector('.checkOs')?.classList.add('d-none');
              Toast.fire({
                icon: 'success',
                title: "URL Added Successfully"
              })
              this.getUrlProtection()
              this.onSubmit()
            },
            error => {
              Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Error !'
              })
            }
          )
        }
        else {
          document.querySelector('.checkOs')?.classList.add('d-none');
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Error !'
          })
        }
      },
      error => {
        document.querySelector('.checkOs')?.classList.add('d-none');
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Error !'
        })
      }
    )
  }
  addCredentials() {
    //source : 1 = Servers ||  source_id : server_id //
    let data2 = this.CredentialsFormAdd.value
    data2.status = 1
    data2.source = 1
    data2.classe = 1
    data2.source_id = this.id
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
    if (this.CredentialsFormAdd.invalid || this.CredentialsFormAdd.value.length == 0) {
      this.submitted = true;

      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Fill all information!'
      })
      return;
    } if (!this.checkIfValidPortnumber3(this.credentialsAccount.port)) {
      return;
    }
    document.querySelector('.checkOs')?.classList.remove('d-none');
    document.querySelector('.checkOsTitle')!.innerHTML = "Connecting to server ...";
    this.firewallScriptService.Connect({server_id: this.id, Task: "Connect", username: data2.login, password:data2.password, port:data2.port }).subscribe(
      response=>{
        this.response = response
        if (this.response.code == "success") {
        document.querySelector('.checkOsResults')!.innerHTML += '<div class="alert alert-success mt-4">Connected successfully</div>';
        document.querySelector('.checkOsTitle')!.innerHTML = "Checking operating system ...";
          this.credentialsService.saveCredentials(data2).subscribe(
            result => {
              this.credentialsAccount = result
              this.CreateLogs("create", new Date(), 9, this.credentialsAccount.id!, this.d, 2)
              this.getCredentials()
              this.firewallScriptService.Check_OS({server_id:this.id, Task:"check_os"}).subscribe(
                response2=>{
                  this.response2 = response2
                  if(this.response2.code == "success"){
                    document.querySelector('.checkOsResults')!.innerHTML += '<div class="alert alert-success mt-4">Operating system supported</div>';
                    this.server.operating_system = this.response2.data[0]
                    this.server.system_version = this.response2.data[1]
                    this.server.status = 1
                    this.serverService.updateServer(this.server,this.id).subscribe(
                      result=>{

                      },error=>{

                      }
                    )
                    this.getCsfList()
                    this.getFail2banBannedip()
                    this.getFail2banLogs()
                    this.getOpenedPorts()
                    this.getServices()
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
                    this.serverService.updateServer(this.server,this.id).subscribe(
                      result=>{

                      },error=>{

                      }
                    )
                  }
              Toast.fire({
                icon: 'success',
                title: 'Credentials added successfully'
              })

                  this.onSubmit();
                }
              )
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
          Toast.fire({
            icon: 'error',
            title: 'Connection to server failed !'
          })
          document.querySelector('.checkOsResults')!.innerHTML += '<div class="alert alert-danger mt-4">Failed to connect</div>';
          document.querySelector('.checkOs')?.classList.add('d-none');
          document.querySelector('.checkOsResults')!.innerHTML = "";
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Invalid credentials'
          })
        }
        this.getCredentials()
      },error=>{
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Invalid credentials !'
        })
      }

  )


  }

  openModal(targetModal: any, rule: Rule) {
    this.modalService.open(targetModal, {
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
  openModalUrl(targetModal: any, Urlprotection: Urlprotection) {
    this.modalService.open(targetModal, {
      centered: true,
      backdrop: 'static'
    });

    this.URLFormEdit.patchValue({ id: Urlprotection.id })
    this.URLFormEdit.patchValue({ url: Urlprotection.url })
    this.URLFormEdit.patchValue({ ip_address: Urlprotection.ip_address })
    this.URLFormEdit.patchValue({ status: Urlprotection.status })

  }
  openModalCredentials(targetModal: any, credentials: CredentialsAccount) {
    this.modalService.open(targetModal, {
      centered: true,
      backdrop: 'static'
    });

    this.CredentialsFormEdit.patchValue({ id: credentials.id })
    this.CredentialsFormEdit.patchValue({ login: credentials.login })
    this.CredentialsFormEdit.patchValue({ password: credentials.password })
    this.CredentialsFormEdit.patchValue({ name: credentials.name })
    this.CredentialsFormEdit.patchValue({ status: credentials.status })
    this.CredentialsFormEdit.patchValue({ classe: credentials.classe })
    this.CredentialsFormEdit.patchValue({ port: credentials.port })
    this.CredentialsFormEdit.patchValue({ source: credentials.source })
    this.CredentialsFormEdit.patchValue({ source_id: credentials.source_id })
  }
  openModalAdd(targetModal: any, rule: Rule) {
    this.modalService.open(targetModal, {
      centered: true,
      backdrop: 'static'
    });

  }
  openModalAddCredentials(targetModal: any, credentialsAccount: CredentialsAccount) {
    this.modalService.open(targetModal, {
      centered: true,
      backdrop: 'static'
    });

  }
  openModalCheck(targetModal: any) {
    this.modalService.open(targetModal, {
      centered: true,
      backdrop: 'static'
    });

  }
  openModaladdURL(targetModal: any) {
    this.modalService.open(targetModal, {
      centered: true,
      backdrop: 'static'
    });

  }
  onSubmit() {
    this.modalService.dismissAll();
    this.ruleFormAdd.reset()
    this.CredentialsFormAdd.reset()
    this.checkForm.reset()
    this.URLFormAdd.reset()
  }
  CreateLogs(action: String, action_date: Date, element: number, element_id: number, users: User, source: number) {
    this.userLogs.action = action
    this.userLogs.action_date = action_date
    //Accounts=0, Users=1, Servers=2, rules=3,groups=4,policies=5,rules_instances=6,ssh_credentials=9
    this.userLogs.element = element
    this.userLogs.element_id = element_id
    this.userLogs.users = users
    // /account = 0, /users=1, /servers=2, /rules=3, /groups=4, /policies=5
    this.userLogs.source = source

    this.usersLogsService.saveUserLogs(this.userLogs).subscribe(
      result => {

      },
      error => {

      }
    )
  }

  ValidateIPaddress(ipaddress: any) {
    if (/^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/.test(this.serverForm.get('ip_address')?.value)) {
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
  ValidateIPaddress4(ipaddress: any) {
    if (/^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/.test(this.URLFormAdd.get('ip_address')?.value)) {
      return (true)
    }
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'You have entered an invalid IP address!'
    })
    return (false)
  }
  ValidateIPaddress5(ipaddress: any) {
    if (/^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/.test(this.URLFormEdit.get('ip_address')?.value)) {
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
  checkIfValidPortnumber2(port: any) {
    // Regular expression to check if number is a valid port number
    if (/^((6553[0-5])|(655[0-2][0-9])|(65[0-4][0-9]{2})|(6[0-4][0-9]{3})|([1-5][0-9]{4})|([0-5]{0,5})|([0-9]{1,4}))$/gi.test(this.CredentialsFormEdit.get('port')?.value)) {
      return (true)
    }

    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'You have entered an invalid Port number!'
    })
    return (false)
  }
  checkIfValidPortnumber3(port: any) {
    // Regular expression to check if number is a valid port number
    if (/^((6553[0-5])|(655[0-2][0-9])|(65[0-4][0-9]{2})|(6[0-4][0-9]{3})|([1-5][0-9]{4})|([0-5]{0,5})|([0-9]{1,4}))$/gi.test(this.CredentialsFormAdd.get('port')?.value)) {
      return (true)
    }

    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'You have entered an invalid Port number!'
    })
    return (false)
  }
  checkIfValidPortnumber4(port: any) {
    // Regular expression to check if number is a valid port number
    if (/^((6553[0-5])|(655[0-2][0-9])|(65[0-4][0-9]{2})|(6[0-4][0-9]{3})|([1-5][0-9]{4})|([0-5]{0,5})|([0-9]{1,4}))$/gi.test(this.checkForm.value.target)) {
      return (true)
    }

    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'You have entered an invalid Port number!'
    })
    return (false)
  }
  ValidateIPaddress6(ipaddress: any) {
    if (/^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/.test(this.checkForm.value.target)) {
      return (true)
    }
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'You have entered an invalid IP address!'
    })
    return (false)
  }
  getUserLogs() {
    this.getServersUsersLogs()
  }
}


