import { Component, ElementRef, OnInit, Renderer2 } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Account } from 'src/app/model/account';
import { Category } from 'src/app/model/category';
import { PoliciesInstances } from 'src/app/model/policies-instances';
import { Policy } from 'src/app/model/policy';
import { Provider } from 'src/app/model/provider';
import { Server } from 'src/app/model/server';
import { User } from 'src/app/model/user';
import { UsersLogs } from 'src/app/model/users-logs';
import { AccountsService } from 'src/app/services/accounts.service';
import { PoliciesInstancesService } from 'src/app/services/policies-instances.service';
import { PoliciesService } from 'src/app/services/policies.service';
import { ServersService } from 'src/app/services/servers.service';
import { UsersLogsService } from 'src/app/services/users-logs.service';
import { UsersPermissionsService } from 'src/app/services/users-permissions.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-policies',
  templateUrl: './edit-policies.component.html',
  styleUrls: ['./edit-policies.component.css']
})
export class EditPoliciesComponent implements OnInit {
  public policyForm!:FormGroup
  public policyInstanceForm!:FormGroup
  public policyInstanceFormAdd!:FormGroup
  public serverFormEdit!:FormGroup
  public serverFormAdd!:FormGroup
  serversList:Server[]=[]
  accountsList:Account[]=[]
  providersList:Provider[]=[]
  categoriesList:Category[]=[]
  usersLogsList:UsersLogs[]=[]
  policyInstanceList:PoliciesInstances[]=[]
  policy:Policy=new Policy()
  policyInstance:PoliciesInstances=new PoliciesInstances()
  server:Server=new Server()
  userLogs:UsersLogs=new UsersLogs()
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
  submitted : boolean = false
  submitted1 : boolean = false
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
  constructor(private fb:FormBuilder,private policyService:PoliciesService,private serverService:ServersService,private accountService:AccountsService,
    private router:Router,private modalService:NgbModal ,private policiesInstancesService:PoliciesInstancesService,private usersLogsService:UsersLogsService,
    private usersPermissionsService:UsersPermissionsService,private route:ActivatedRoute,private renderer: Renderer2, private el: ElementRef) {
      this.policyForm=this.fb.group(
        {
        id:[''],
        name:['',Validators.required],
        metric:['',Validators.required],
        action:['',Validators.required],
        duration:['',Validators.required],
        threshold:['',Validators.required],
        status:[''],
        start_date:[''],
        end_date:[''],
        account:this.fb.group({
          id: ['']
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
        start_date:[''],
        account:this.fb.group({
          id: ['']
        }),
        categories:this.fb.group({
          id: ['']
        }),
        providers:this.fb.group({
          id: ['']
        })
      }
      )
      this.serverFormAdd=this.fb.group(
        {
          id:[''],
          name:[''],
          ip_address:[''],
          autorization:[''],
          operating_system:[''],
          system_version:[''],
          status:[''],
          start_date:[''],
          account:this.fb.group({
            id: ['']
          }),
          categories:this.fb.group({
            id: ['']
          }),
          providers:this.fb.group({
            id: ['']
          })
        }
      )
      this.policyInstanceFormAdd=this.fb.group(
        {
          servers: this.fb.group({
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
    this.policyService.getPolicyById(this.id).subscribe(
      result=>{
        this.policy=result
        this.policyForm.patchValue({id:this.policy.id})
        this.policyForm.patchValue({start_date:this.policy.start_date})
      },
      error=>{
      }
    )

    this.getAllServers(this.id)
    this.getAllAccounts()
    this.getPoliciesInstancesByPolicyId(this.id)
    this.getPoliciesUsersLogs()

    const parent = this.renderer.parentNode(this.el.nativeElement);

    if (parent.getElementsByTagName('LABEL').length && !parent.getElementsByClassName('required-asterisk').length) {
      parent.getElementsByTagName('LABEL')[0].innerHTML += '<span class="required-asterisk">*</span>';
    }

  }
  get form() {
    return this.policyForm.controls;
  }
  get serverForm() {
    return this.serverFormEdit.controls;
  }
  get policiesInstanceForm() {
    return this.policyInstanceFormAdd.controls;
  }
  updatePolicy(id:any){
    this.policyForm.patchValue({end_date:this.policy.end_date})
    let data=this.policyForm.value
    data.account = this.policy.account
    if (this.policyForm.invalid || this.policyForm.value.length == 0) {
      this.submitted = true;

      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Fill all information!'
      })
      return;
    }

    this.hasChange1 = (data.action != this.policy.action || data.duration != this.policy.duration || data.end_date != this.policy.end_date || data.metric != this.policy.metric
      || data.name != this.policy.name || data.start_date != this.policy.start_date || data.status != this.policy.status || data.threshold != this.policy.threshold || data.account != this.policy.account)
    if(this.hasChange1 == true){
    this.policyService.updatePolicy(data,id).subscribe(
      result=>{
        this.CreateLogs("edit",new Date(),5,id,this.d,5)
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
          title: 'Policy Edited successfully'
        })
        this.policy.name = data.name
        this.policy.action = data.action
        this.policy.duration = data.duration
        this.policy.metric = data.metric
        this.policy.threshold = data.threshold
        //this.router.navigateByUrl('/policies')
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
    //this.router.navigateByUrl('/policies')
  }
  }
  getPoliciesUsersLogs() {
    this.usersLogsService.getPoliciesUsersLogs(this.id).subscribe(
      result => {
        this.usersLogsList = result.map( (elem:any) => {elem.element = this.elementType[elem.element];elem.source = this.sourceType[elem.source]; return elem});
      },
      error => {
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
  getAllServers(id:this){
    this.serverService.findServerListOfPolicy(id,this.acc.id).subscribe(
      result=>{
        this.serversList=result

      },
      error=>{
      }
    )
  }
  getPoliciesInstancesByPolicyId(id:this){
    this.policiesInstancesService.getPolicyInstanceByPolicyId(id).subscribe(
      result=>{
        this.policyInstanceList = result

      },
      error=>{
      }
    )
  }
  updateServer(id:any , server:Server){
    this.dataaa  = this.serverFormEdit.value
    this.dataaa.account = server.account
    this.dataaa.categories = server.categories
    this.dataaa.providers = server.providers
    if (this.serverFormEdit.invalid || this.serverFormEdit.value.length == 0) {
      this.submitted = true;

      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Fill all information!'
      })
      return;
    }else if (!this.ValidateIPaddress(this.server.ip_address)) {
      return;
    }
    this.hasChange = (this.dataaa.name != server.name || this.dataaa.ip_address != server.ip_address || this.dataaa.autorization != server.authorization
      || this.dataaa.operating_system != server.operating_system || this.dataaa.status != server.status || this.dataaa.start_date != server.start_date || this.dataaa.end_date != server.end_date
      || this.dataaa.account != server.account || this.dataaa.system_version != server.system_version || this.dataaa.categories != server.categories || this.dataaa.providers != server.providers)
    if(this.hasChange == true){
    this.serverService.updateServer(this.dataaa,id).subscribe(
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

          this.CreateLogs("edit",new Date(),2,dataa.id,this.d,5)

          this.policiesInstancesService.getOnePolicyInstance(this.policy.id,dataa.id).subscribe(
            result=>{
              let pi = result
              let pi_id = pi.id
              this.CreateLogs("edit",new Date(),8,pi_id,this.d,5)
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

          })
          this.onSubmit()
          this.getPoliciesInstancesByPolicyId(this.id)
    }
    }

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
  assignPolicyInstanceToServer(){
    this.policyInstance.policies = this.policy
    this.policyInstance.servers=this.policyInstanceFormAdd.getRawValue().servers
    this.policyInstance.status = 1
    this.policyInstance.start_date = new Date()
 if (this.policyInstanceFormAdd.invalid) {
      this.submitted1 = true;

      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Fill all information!'
      })
      return;
    }
else{
    this.policiesInstancesService.savePolicyInstance(this.policyInstance).subscribe(
      result=>{
        this.policyInstanceList?.push(result)
        this.policiesInstancesService.getOnePolicyInstance(this.policy.id,this.policyInstance.servers?.id).subscribe(
          result=>{
            let Policy_instance = result
            let Policy_instance_id = Policy_instance.id
            this.CreateLogs("create",new Date(),8,Policy_instance_id,this.d,5)
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
              title: 'Policy Assigned to server successfully'
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
  }

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
      this.serverService.getServerById(id).subscribe(
        result=>{
          let s = result
          let s_id = s.id
          this.policiesInstancesService.getOnePolicyInstance(this.policy.id,s_id).subscribe(
            result=>{
              let PI = result
              let PI_id = PI.id
              PI.status =4
              PI.end_date = new Date()
              this.policiesInstancesService.updatePoliciesInstances(PI,PI_id).subscribe(
                result=>{
                  //usr = result
                  let row =document.getElementById(id);
                  if(row != null){
                  row.remove()
                  this.policyInstanceList = this.policyInstanceList.filter(p_i => p_i.servers?.id !== id);
                  }
                  this.CreateLogs("delete",new Date(),8,PI_id,this.d,5)
                },
                error=>{
                }
              )
            },
            error=>{
            }
          )
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

  openModal(targetModal: any, server: Server) {
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
   assignPolicyToServerModal(targetModal: any, server: Server) {
    this.modalService.open(targetModal, {
     centered: true,
     backdrop: 'static'
    });
    this.getAllServers(this.id)
   }
  onSubmit() {
    this.policyInstanceFormAdd.reset()
    this.modalService.dismissAll();

   }
   CreateLogs(action:String,action_date:Date,element:number,element_id:number,users:User,source:number){
    this.userLogs.action = action
    this.userLogs.action_date = action_date
    //Accounts=0, Users=1, Servers=2, rules=3,groups=4,policies=5,rules_instances=6,groups_rules=7,policies_instance=8
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
  getUserLogs(){
    this.getPoliciesUsersLogs()
  }
}
