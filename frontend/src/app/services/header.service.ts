import { Injectable } from '@angular/core';
import {CalendarView} from "angular-calendar";

@Injectable({
  providedIn: 'root'
})
export class HeaderService {
  view: CalendarView = CalendarView.Week;

  constructor() { }

  dayView() {
    this.view = CalendarView.Day;
  }

  weekView() {
    this.view = CalendarView.Week;
  }

  monthView() {
    this.view = CalendarView.Month;
  }

  getCurrentView() {
    return this.view;
  }
}
