import { Component, OnInit } from '@angular/core';
import { FirewallScriptService } from 'src/app/services/firewall-script.service';

@Component({
  selector: 'app-reporting',
  templateUrl: './reporting.component.html',
  styleUrls: ['./reporting.component.css']
})
export class ReportingComponent implements OnInit {
  AccessLogsList:any
  accesslogs :any
  response:any
  response1:any
  searchText:any
  p:number=1
  constructor(private firewallService:FirewallScriptService) { }

  ngOnInit(): void {
    this.DisplayAccessLogs()
  }
  DisplayAccessLogs(){
    this.firewallService.Reporting({server_id:1,Task:"accesslogs"}).subscribe(
      result=>{
        if (result) {
          document.getElementsByClassName('innerLoad')[0]?.classList.add('d-none');
      }
        this.response = result
        this.response1 = this.response.code
        for(let i=0;i<this.response.data.length;i++){
          this.response.data[i][3] = this.response.data[i][3].split(" ")
        }
        this.AccessLogsList = this.response.data
      },
      error=>{
      }
    );
  }

}
