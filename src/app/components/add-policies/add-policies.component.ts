import { Component, ElementRef, OnInit, Renderer2 } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Account } from 'src/app/model/account';
import { Policy } from 'src/app/model/policy';
import { User } from 'src/app/model/user';
import { UsersLogs } from 'src/app/model/users-logs';
import { AccountsService } from 'src/app/services/accounts.service';
import { PoliciesService } from 'src/app/services/policies.service';
import { UsersLogsService } from 'src/app/services/users-logs.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-policies',
  templateUrl: './add-policies.component.html',
  styleUrls: ['./add-policies.component.css']
})
export class AddPoliciesComponent implements OnInit {
  user:any
  d:any
  acc:any
  account:any
  public policyForm!:FormGroup
  AccountsList:Account[]=[]
  userLogs:UsersLogs = new UsersLogs()
  policy:Policy = new Policy()
  submitted=false;
  constructor(private fb:FormBuilder,private accountsService:AccountsService,private policyService:PoliciesService,private usersLogsService:UsersLogsService,
    private route:Router,private renderer: Renderer2, private el: ElementRef) {
    this.policyForm=this.fb.group(
      {
      id:[''],
      name:['',Validators.required],
      metric:['',Validators.required],
      action:['',Validators.required],
      threshold:['',Validators.required],
      duration:['',Validators.required],
      status:['',Validators.required],
      start_date:['',Validators.required],
      account: this.fb.group({
        id: ['']
      })
    }
    )
   }

  getAllAccounts(){
    this.accountsService.getAllAccounts().subscribe(
      result=>{
        this.AccountsList=result

      },
      error=>{
      }
    )
  }

  getAllPolicies(){}
  ngOnInit(): void {
    if (localStorage.getItem("user") === null) {
      this.route.navigateByUrl('')
    }
    this.user = localStorage.getItem('user');
    this.d = JSON.parse(this.user)
    this.acc = this.d['account']
    this.account = JSON.stringify(this.acc)

    this.getAllPolicies()
    this.getAllAccounts()

    const parent = this.renderer.parentNode(this.el.nativeElement);

    if (parent.getElementsByTagName('LABEL').length && !parent.getElementsByClassName('required-asterisk').length) {
      parent.getElementsByTagName('LABEL')[0].innerHTML += '<span class="required-asterisk">*</span>';
    }
  }
  get form() {
    return this.policyForm.controls;
  }
  addPolicy(){
    this.policyForm.patchValue({account:this.acc})
    let data=this.policyForm.value
    if (this.policyForm.invalid || this.policyForm.value.length == 0) {
      this.submitted = true;

      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Fill all information!'
      })
      return;
    }
    this.policyService.savePolicy(data).subscribe(
      result=>{
        this.policy = result
        this.CreateLogs("create",new Date(),5,this.policy.id!,this.d,5)
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
          title: 'Policy Added successfully'
        })
        this.route.navigateByUrl('/policies')
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
}
