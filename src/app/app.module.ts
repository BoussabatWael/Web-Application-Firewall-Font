import { enableProdMode, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { TopbarComponent } from './components/topbar/topbar.component';
import { AccountComponent } from './components/account/account.component';
import { UsersListComponentComponent } from './components/users-list-component/users-list-component.component';
import { AddUserComponentComponent } from './components/add-user-component/add-user-component.component';
import { EditUserComponentComponent } from './components/edit-user-component/edit-user-component.component';
import { ServersListComponent } from './components/servers-list/servers-list.component';
import { EditServerComponent } from './components/edit-server/edit-server.component';
import { AddServerComponent } from './components/add-server/add-server.component';
import { RulesListComponent } from './components/rules-list/rules-list.component';
import { AddRuleComponent } from './components/add-rule/add-rule.component';
import { EditRuleComponent } from './components/edit-rule/edit-rule.component';
import { GroupsListComponent } from './components/groups-list/groups-list.component';
import { AddGroupComponent } from './components/add-group/add-group.component';
import { EditGroupComponent } from './components/edit-group/edit-group.component';
import { PoliciesListComponent } from './components/policies-list/policies-list.component';
import { EditPoliciesComponent } from './components/edit-policies/edit-policies.component';
import { AddPoliciesComponent } from './components/add-policies/add-policies.component';
import { SettingsListComponent } from './components/settings-list/settings-list.component';
import { AddSettingsComponent } from './components/add-settings/add-settings.component';
import { EditSettingsComponent } from './components/edit-settings/edit-settings.component';
import { RightSideBarComponent } from './components/right-side-bar/right-side-bar.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { NgxPaginationModule } from 'ngx-pagination';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
import { environment } from 'src/environments/environment';
import { FooterComponent } from './components/footer/footer.component';
import { NotfoundComponent } from './components/notfound/notfound.component';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { NgxSpinnerModule } from 'ngx-spinner';
import { ReportingComponent } from './components/reporting/reporting.component';
import { TagInputModule } from 'ngx-chips';
import { NgChartsModule } from 'ng2-charts';
import { SortDirective } from './directive/sort.directive';


if (environment.production) {
  enableProdMode();
}
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    SidebarComponent,
    TopbarComponent,
    AccountComponent,
    UsersListComponentComponent,
    AddUserComponentComponent,
    EditUserComponentComponent,
    ServersListComponent,
    EditServerComponent,
    AddServerComponent,
    RulesListComponent,
    AddRuleComponent,
    EditRuleComponent,
    GroupsListComponent,
    AddGroupComponent,
    EditGroupComponent,
    PoliciesListComponent,
    EditPoliciesComponent,
    AddPoliciesComponent,
    SettingsListComponent,
    AddSettingsComponent,
    EditSettingsComponent,
    RightSideBarComponent,
    ResetPasswordComponent,
    FooterComponent,
    NotfoundComponent,
    ReportingComponent,
    SortDirective

  ],
  imports: [SweetAlert2Module.forRoot(),
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    NgbModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    Ng2SearchPipeModule,
    NgxSpinnerModule,
    TagInputModule,
    NgChartsModule
  ],
  providers: [{provide: LocationStrategy, useClass: HashLocationStrategy}],
  bootstrap: [AppComponent]
})
export class AppModule { }
