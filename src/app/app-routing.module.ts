import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountComponent } from './components/account/account.component';
import { AddGroupComponent } from './components/add-group/add-group.component';
import { AddPoliciesComponent } from './components/add-policies/add-policies.component';
import { AddRuleComponent } from './components/add-rule/add-rule.component';
import { AddServerComponent } from './components/add-server/add-server.component';
import { AddSettingsComponent } from './components/add-settings/add-settings.component';
import { AddUserComponentComponent } from './components/add-user-component/add-user-component.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { EditGroupComponent } from './components/edit-group/edit-group.component';
import { EditPoliciesComponent } from './components/edit-policies/edit-policies.component';
import { EditRuleComponent } from './components/edit-rule/edit-rule.component';
import { EditServerComponent } from './components/edit-server/edit-server.component';
import { EditSettingsComponent } from './components/edit-settings/edit-settings.component';
import { EditUserComponentComponent } from './components/edit-user-component/edit-user-component.component';
import { GroupsListComponent } from './components/groups-list/groups-list.component';
import { LoginComponent } from './components/login/login.component';
import { NotfoundComponent } from './components/notfound/notfound.component';
import { PoliciesListComponent } from './components/policies-list/policies-list.component';
import { ReportingComponent } from './components/reporting/reporting.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
import { RightSideBarComponent } from './components/right-side-bar/right-side-bar.component';
import { RulesListComponent } from './components/rules-list/rules-list.component';
import { ServersListComponent } from './components/servers-list/servers-list.component';
import { SettingsListComponent } from './components/settings-list/settings-list.component';
import { UsersListComponentComponent } from './components/users-list-component/users-list-component.component';

const routes: Routes = [
  {
  path:"",
  component:LoginComponent
},
{
  path:"dashboard",
  component:DashboardComponent
},
{
  path:"account",
  component:AccountComponent
},
{
  path:"RightSideBar",
  component:RightSideBarComponent
},
{
  path:"settings/users",
  component:UsersListComponentComponent
},
{
  path:"settings/user/edit/:id",
  component:EditUserComponentComponent
},
{
  path:"settings/user/add",
  component:AddUserComponentComponent
},
{
  path:"servers",
  component:ServersListComponent
},
{
  path:"server/edit/:id",
  component:EditServerComponent
},
{
  path:"server/add",
  component:AddServerComponent
},
{
  path:"rules",
  component:RulesListComponent
},
{
  path:"rule/add",
  component:AddRuleComponent
},
{
  path:"rule/edit/:id",
  component:EditRuleComponent
},
{
  path:"groups",
  component:GroupsListComponent
},
{
  path:"group/add",
  component:AddGroupComponent
},
{
  path:"group/edit/:id",
  component:EditGroupComponent
},
{
  path:"policies",
  component:PoliciesListComponent
},
{
  path:"policies/edit/:id",
  component:EditPoliciesComponent
},
{
  path:"policies/add",
  component:AddPoliciesComponent
},
{
  path:"settings",
  component:SettingsListComponent
},
{
  path:"reporting",
  component:ReportingComponent
},
{
  path:"settings/add",
  component:AddSettingsComponent
},
{
  path:"settings/edit",
  component:EditSettingsComponent
},
{
  path:"resetpassword",
  component:ResetPasswordComponent
},
{
  path:"**",
  component:NotfoundComponent
}
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
