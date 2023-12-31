import { Component, OnInit } from '@angular/core';
import {HeaderService} from "../services/header.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(private header: HeaderService) { }

  ngOnInit(): void {
  }

  dayView() {
    this.header.dayView();
  }

  weekView() {
    this.header.weekView();
  }

  monthView() {
    this.header.monthView();
  }

}
