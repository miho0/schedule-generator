import { Component, OnInit } from '@angular/core';
import {HttpService} from "../services/http.service";

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss']
})
export class TestComponent implements OnInit {

  constructor(private http: HttpService) { }

  ngOnInit(): void {
  }


  public getSchedule() {
    return this.http.getSchedule().subscribe(
      data => {
        console.log(data);
      }
    )
  }

}
