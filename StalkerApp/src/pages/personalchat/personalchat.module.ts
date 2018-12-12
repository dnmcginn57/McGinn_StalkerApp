import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PersonalchatPage } from './personalchat';
import{ SortPipe} from "../../pipes/sort/sort";

@NgModule({
  declarations: [
    PersonalchatPage,
  ],
  imports: [
    SortPipe,

    IonicPageModule.forChild(PersonalchatPage),
  ],
})
export class PersonalchatPageModule {}
