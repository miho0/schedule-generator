import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {MainCalendarComponent} from "./main-calendar/main-calendar.component";
import {TestComponent} from "./test/test.component";

const routes: Routes = [
  { path: 'main-calendar', component: MainCalendarComponent },
  { path: 'test', component: TestComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

