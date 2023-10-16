import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {ScheduleEvent} from "../models/ScheduleEvent";
import {ScheduleEventsApiResponse} from "../models/ScheduleEventsApiResponse";

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  baseUrl = 'http://localhost:3080';

  constructor(private http: HttpClient) { }

  public getSchedule(): Observable<ScheduleEventsApiResponse> {
    return this.http.get<ScheduleEventsApiResponse>(this.baseUrl + '/schedule/getFull', {withCredentials: true});
  }
}
