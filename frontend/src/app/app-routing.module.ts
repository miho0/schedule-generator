import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {MainCalendarComponent} from "./main-calendar/main-calendar.component";
import {TestComponent} from "./test/test.component";
import {ConfigurationComponent} from "./configuration/configuration.component";
import {HeaderComponent} from "./header/header.component";

const routes: Routes = [
  { path: 'main-calendar', component: MainCalendarComponent },
  { path: 'test', component: TestComponent },
  { path: "configurations", component: ConfigurationComponent},
  { path: "", component: HeaderComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

