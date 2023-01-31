import { JsonpClientBackend } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';
import { Account } from 'src/app/model/account';
import { User } from 'src/app/model/user';
import { UsersLogsService } from 'src/app/services/users-logs.service';
import { AccountsService } from 'src/app/services/accounts.service';
import { RulesService } from 'src/app/services/rules.service';
import { ServersService } from 'src/app/services/servers.service';
import { UsersPermissionsService } from 'src/app/services/users-permissions.service';
import { UsersService } from 'src/app/services/users.service';
import { PoliciesService } from 'src/app/services/policies.service';
import { ChartConfiguration } from 'chart.js';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  public barChartLegend = true;
  public barChartPlugins = [];

  public pieChartLegend = true;
  public pieChartPlugins = [];


  public barChartData: ChartConfiguration<'bar'>['data'] = {
    labels: [],
    datasets: []
  };

  public pieChartData: ChartConfiguration<'pie'>['data'] = {
    labels: [],
    datasets: []
  };

  public barChartOptions: ChartConfiguration<'bar'>['options'] = {
    responsive: false,
  };

  public pieChartOptions: ChartConfiguration<'pie'>['options'] = {
    responsive: false,
  };

  AccountsList:Account[]=[]
  user:any
  data:any
  userPermission:any
  acc:any
  usrPer:any
  account:any
  usersNumber:any
  serversNumber:any
  policiesNumber:any
  rulesNumber:any
  activeRulesNumber:any
  pendingRulesNumber:any
  inactiveRulesNumber:any
  deletedRulesNumber:any
  usersLogsList:any
  LastUserLogs:any
  pieLables:any[]=[]
  pieDatasets:any[]=[]
  RulesByServer:any={
    labels: [],
    datasets:{
    data:[]
  }
}
  RulesByMonth: any={
    labels: [ 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec' ],
    datasets:{
    '1' : {
      data : [0,0,0,0,0,0,0,0,0,0,0,0],
      label : 'Active rules'
    },
    '2' : {
      data : [0,0,0,0,0,0,0,0,0,0,0,0],
      label : 'Inactive rules'
    },
    '3' : {
      data : [0,0,0,0,0,0,0,0,0,0,0,0],
      label : 'Pending rules'
    },
    '4' : {
      data : [0,0,0,0,0,0,0,0,0,0,0,0],
      label : 'Deleted rules'
    }
  }
}

  p:number=1
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
    10:"User permissions",
    15:"User server rule",
    16:"User server",
    17:"API key",
    18:"API key permission",
    19:"Category",
    20:"Provider"
  } ;
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

  response1:any
  response2:any
  constructor(private accountsService:AccountsService,private usersService:UsersService,
    private usersPermissionsService:UsersPermissionsService, private serversService:ServersService,
    private rulesService:RulesService, private policiesService:PoliciesService, private usersLogsService:UsersLogsService,private router:Router) { }

  ngOnInit(): void {
    if (localStorage.getItem("user") === null) {
      this.router.navigateByUrl('')
    }
    this.user = localStorage.getItem('user');
    this.data = JSON.parse(this.user)

    this.userPermission = localStorage.getItem('permissions');
    this.usrPer = JSON.parse(this.userPermission);

/*
    this.usersPermissionsService.getUserPermissionsByUserId(this.data.id).subscribe(
      result=>{

        this.userPermission = result
        this.usrPer = JSON.parse(this.userPermission.code);

        //JSON.parse(this.userPermission.code).users.includes('create')
      },
      error=>{
       }
    )
*/
    this.acc = this.data['account']
    this.account = JSON.stringify(this.acc)

    this.getRulesNumber()
    this.getServersNumber()
    this.getUserLogs()
    this.getPoliciesNumber()
    this.getActiveRulesNumber()
    this.getInactiveRulesNumber()
    this.getPendingRulesNumber()
    this.getLastUserLogs()
    this.getRulesByMonth(this.acc.id)
    this.getRulesByserver()
    this.getDeletedRulesNumber()
}

getRulesByserver(){
  this.serversService.getRulesByServer(this.acc.id).subscribe(
    result=>{
      this.response2 = result
      let total = result.reduce((total:any, current:any) => total + current[1], 0);
      for(let i=0;i<result.length;i++){
        this.RulesByServer.labels.push(result[i][0])
        this.RulesByServer.datasets.data.push((result[i][1]/total)*100)
      }
      this.RulesByServer.datasets = [{data:this.RulesByServer.datasets.data}];
      this.pieChartData = this.RulesByServer
    }, error=>{

    }
  )
}
getRulesByMonth(account_id:any){
  this.rulesService.getRulesByMonth(account_id).subscribe(
    result=>{
      this.response1 = result
      for(let i=0;i<result.length;i++){
        this.RulesByMonth.datasets[result[i][2]].data[result[i][0]-1]= result[i][1];
      }
      this.RulesByMonth.datasets = Object.values(this.RulesByMonth.datasets);
      this.barChartData = this.RulesByMonth;
    }, error=>{
    }
  )
}
getLastUserLogs(){
  this.usersLogsService.getLastUserLogsByUserId(this.data.id).subscribe(
    result=>{
      this.LastUserLogs = result.map( (elem:any) => {elem.element = this.elementType[elem.element];elem.source = this.sourceType[elem.source]; return elem})
    },
    error=>{

    }
  )
}
  getUserLogs(){
    this.usersLogsService.getUserLogsByUserId(this.data.id).subscribe(
      result=>{
        this.usersLogsList = result
      },
      error=>{

      }
    )
  }

  getPoliciesNumber(){
    this.policiesService.getPoliciesNumber(this.acc.id).subscribe(
      result=>{
        this.policiesNumber = result
      },
      error=>{
      }
    )
  }
  getServersNumber(){
    this.serversService.getServersNumber(this.acc.id).subscribe(
      result=>{
        this.serversNumber = result
      },
      error=>{
      }
    )
  }
  getRulesNumber(){
    this.rulesService.getRulesNumber(this.acc.id).subscribe(
      result=>{
        this.rulesNumber = result
      },
      error=>{
      }
    )
  }
  getActiveRulesNumber(){
    this.rulesService.getRulesNumberByStatus(1,this.acc.id).subscribe(
      result=>{
        this.activeRulesNumber = result
      },
      error=>{
      }
    )
  }
  getPendingRulesNumber(){
    this.rulesService.getRulesNumberByStatus(3,this.acc.id).subscribe(
      result=>{
        this.pendingRulesNumber = result
      },
      error=>{
      }
    )
  }
  getInactiveRulesNumber(){
    this.rulesService.getRulesNumberByStatus(2,this.acc.id).subscribe(
      result=>{
        this.inactiveRulesNumber = result
      },
      error=>{
      }
    )
  }
  getDeletedRulesNumber(){
    this.rulesService.getRulesNumberByStatus(4,this.acc.id).subscribe(
      result=>{
        this.deletedRulesNumber = result
      },
      error=>{
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

}
