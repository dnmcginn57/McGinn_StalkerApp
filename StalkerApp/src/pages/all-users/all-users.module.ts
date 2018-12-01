import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AllUsersPage } from './all-users';

@NgModule({
  declarations: [
    AllUsersPage,
  ],
  imports: [
    IonicPageModule.forChild(AllUsersPage),
  ],
})
export class AllUsersPageModule {}
