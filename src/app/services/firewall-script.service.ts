import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FirewallScriptService {
  //urlScript="http://45.76.121.27/wael/test2.php"
  //urlScript="http://144.202.71.141:8080/test2.php"
  //urlScript="https://firewall.servcenter.net/scripts/call.php"
  urlScript="http://localhost/test2.php"

  constructor(private http:HttpClient) { }

  RuleIptables(data:any){
    return this.http.post(this.urlScript,data)
  }
  Reporting(data:any){
    return this.http.post(this.urlScript,data)
  }
  CSF(data:any){
    return this.http.post(this.urlScript,data)
  }
  openedPorts(data:any){
    return this.http.post(this.urlScript,data)
  }
  services(data:any){
    return this.http.post(this.urlScript,data)
  }
  startService(data:any){
    return this.http.post(this.urlScript,data)
  }
  restartService(data:any){
    return this.http.post(this.urlScript,data)
  }
  stopService(data:any){
    return this.http.post(this.urlScript,data)
  }
  installService(data:any){
    return this.http.post(this.urlScript,data)
  }
  checkport(data:any){
    return this.http.post(this.urlScript,data)
  }
  checkip(data:any){
    return this.http.post(this.urlScript,data)
  }
  fail2banlogs(data:any){
    return this.http.post(this.urlScript,data)
  }
  fail2banIPbanned(data:any){
    return this.http.post(this.urlScript,data)
  }
  addurl(data:any){
    return this.http.post(this.urlScript,data)
  }
  updateurl(data:any){
    return this.http.post(this.urlScript,data)
  }
  deleteurl(data:any){
    return this.http.post(this.urlScript,data)
  }
  Check_OS(data:any){
    return this.http.post(this.urlScript,data)
  }
  Connect(data:any){
    return this.http.post(this.urlScript,data)
  }

  ruleDeny(data:any){
    return this.http.post(this.urlScript,data)
  }
}
