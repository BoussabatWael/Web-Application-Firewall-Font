import { Component, ElementRef, OnInit, Renderer2 } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Rule } from 'src/app/model/rule';
import { RulesInstances } from 'src/app/model/rules-instances';
import { Server } from 'src/app/model/server';
import { User } from 'src/app/model/user';
import { UsersLogs } from 'src/app/model/users-logs';
import { AccountsService } from 'src/app/services/accounts.service';
import { FirewallScriptService } from 'src/app/services/firewall-script.service';
import { RulesInstancesService } from 'src/app/services/rules-instances.service';
import { RulesService } from 'src/app/services/rules.service';
import { ServersService } from 'src/app/services/servers.service';
import { UsersLogsService } from 'src/app/services/users-logs.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-rule',
  templateUrl: './add-rule.component.html',
  styleUrls: ['./add-rule.component.css']
})
export class AddRuleComponent implements OnInit {
  user:any
  d:any
  acc:any
  account:any
  public ruleForm!:FormGroup
  public ruleInstancesForm!:FormGroup
  ServersList:Server[]=[]
  accountList:Server[]=[]
  rulesInstances : RulesInstances = new RulesInstances()
  server : Server = new Server()
  rule:Rule = new Rule()
  userLogs:UsersLogs = new UsersLogs()
  submitted=false;
  response:any
  constructor(private fb:FormBuilder,private ruleService:RulesService,private serverService:ServersService,
    private accountService:AccountsService,private rulesInstancesService:RulesInstancesService,
    private usersLogsService:UsersLogsService, private firewallScriptService:FirewallScriptService,
    private route:Router,private renderer: Renderer2, private el: ElementRef) {
    this.ruleForm=this.fb.group(
      {
      id:[''],
      name:['',Validators.required],
      action:['',Validators.required],
      protocol:['',Validators.required],
      port:['',Validators.required],
      ip_address:[''],
      status:[''],
      start_date:[''],
      account: this.fb.group({
        id: ['']
      }),
      servers: this.fb.group({
        id: ['']
      })
    }
    )
    this.ruleInstancesForm=this.fb.group(
      {
      id:[''],
      rules: this.fb.group({
        id: ['']
      }),
      servers: this.fb.group({
        id: ['']
      })
    }
    )
   }
   ngOnInit(): void {
    if (localStorage.getItem("user") === null) {
      this.route.navigateByUrl('')
    }
    this.user = localStorage.getItem('user');
    this.d = JSON.parse(this.user)
    this.acc = this.d['account']
    this.account = JSON.stringify(this.acc)

    this.getAllAccounts()
    this.getAllServers()

    const parent = this.renderer.parentNode(this.el.nativeElement);

    if (parent.getElementsByTagName('LABEL').length && !parent.getElementsByClassName('required-asterisk').length) {
      parent.getElementsByTagName('LABEL')[0].innerHTML += '<span class="required-asterisk">*</span>';
    }

  }
   getAllServers(){
    this.serverService.getServers(this.acc.id).subscribe(
      result=>{
        this.ServersList=result

      },
      error=>{
      }
    )
  }
  getAllAccounts(){
    this.accountService.getAllAccounts().subscribe(
      result=>{
        this.accountList=result

      },
      error=>{
      }
    )
  }


  get form() {
    return this.ruleForm.controls;
  }
  addRule(){
    this.ruleForm.patchValue({account:this.acc})
    let data=this.ruleForm.value
    data.start_date = new Date()
    data.status = 1
    if (this.ruleForm.invalid || this.ruleForm.value.length == 0) {
      this.submitted = true;

      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Fill all information!'
      })
      return;
    }else if(this.ruleForm.getRawValue().name == 'RULE_DENY' || this.ruleForm.getRawValue().name == 'rule_deny'){
        Swal.fire({
         icon: 'error',
         title: 'Oops...',
         text: 'Choose another name please!'
       })
        return;
    }else if (!this.checkIfValidPortnumber(this.rule.port)) {
      return;
    }
    if(data.servers.id ==""){

      this.ruleService.saveRule(data).subscribe(
        result=>{
          this.rule = result
          this.CreateLogs("create",new Date(),3,this.rule.id!,this.d,3)
          /*this.rulesInstances.rules = this.rule
          this.rulesInstances.status = 1
          this.rulesInstances.start_date = new Date()
          this.rulesInstances.servers = this.ruleForm.get('servers')?.value
          this.CreateLogs("create",new Date(),3,this.rule.id!,this.d,3)
          this.rulesInstancesService.saveRuleInstances(this.rulesInstances).subscribe(
            result=>{
              this.server.rulesInstances?.push(this.rulesInstances)
              this.rulesInstancesService.getRuleInstanceByRuleId(this.rule.id).subscribe(
                result=>{
                  let ri = result
                  this.CreateLogs("create",new Date(),6,ri.id,this.d,3)
                },
                error=>{
                })
            },
          error=>{
          })*/
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
          this.route.navigateByUrl('/rules')
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
      if (!this.ValidateIPaddress(this.rule.ip_address)) {
        return;
      }
      document.querySelector('.checkOs')?.classList.remove('d-none');
      document.querySelector('.checkOsTitle')!.innerHTML = "Adding rule to server ...";
      this.firewallScriptService.RuleIptables({server_id:data.servers.id,Task:"add",ip_address:data.ip_address,protocol:data.protocol,port:data.port,action:data.action}).subscribe(
        response=>{
        this.response = response
        if(this.response && this.response.code =="success"){
        this.ruleService.saveRule(data).subscribe(
          result=>{
            this.rule = result
            this.rulesInstances.rules = this.rule
            this.rulesInstances.status = 1
            this.rulesInstances.start_date = new Date()
            this.rulesInstances.servers = this.ruleForm.get('servers')?.value
            this.CreateLogs("create",new Date(),3,this.rule.id!,this.d,3)
            this.rulesInstancesService.saveRuleInstances(this.rulesInstances).subscribe(
              result=>{
                this.server.rulesInstances?.push(this.rulesInstances)
                this.rulesInstancesService.getRuleInstanceByRuleId(this.rule.id).subscribe(
                  result=>{
                    let ri = result
                    this.CreateLogs("create",new Date(),6,ri.id,this.d,3)
                  },
                  error=>{
                  })
              },
            error=>{
            })
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
              title: 'Rule Added successfully'
            })
            this.route.navigateByUrl('/rules')
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
        else{
        document.querySelector('.checkOs')?.classList.add('d-none');
        Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Add rule failed !'
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
  CreateLogs(action:String,action_date:Date,element:number,element_id:number,users:User,source:number){
    this.userLogs.action = action
    this.userLogs.action_date = action_date
    //Accounts=0, Users=1, Servers=2, rules=3,groups=4,policies=5, rules_instances=6
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
    if (/^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/.test(this.ruleForm.get('ip_address')?.value))
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
    if(/^((6553[0-5])|(655[0-2][0-9])|(65[0-4][0-9]{2})|(6[0-4][0-9]{3})|([1-5][0-9]{4})|([0-5]{0,5})|([0-9]{1,4}))$/gi.test(this.ruleForm.get('port')?.value))
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
}
