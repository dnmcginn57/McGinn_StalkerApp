import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PersonalchatPage } from './personalchat';

@NgModule({
  declarations: [
    PersonalchatPage,
  ],
  imports: [
    IonicPageModule.forChild(PersonalchatPage),
  ],
})
export class PersonalchatPageModule {}
