import {
  Component,
  ChangeDetectionStrategy,
  ViewChild,
  TemplateRef, OnInit,
} from '@angular/core';
import {
  startOfDay,
  endOfDay,
  isSameDay,
  isSameMonth,
} from 'date-fns';
import { Subject } from 'rxjs';
import {
  CalendarEvent,
  CalendarEventAction,
  CalendarEventTimesChangedEvent,
  CalendarView, DAYS_OF_WEEK,
} from 'angular-calendar';
import { EventColor } from 'calendar-utils';
import {HttpService} from "../services/http.service";
import {ScheduleEvent} from "../models/ScheduleEvent";
import {ScheduleEventsApiResponse} from "../models/ScheduleEventsApiResponse";
import {HeaderService} from "../services/header.service";

const colors: Record<string, EventColor> = {
  red: {
    primary: '#ad2121',
    secondary: '#FAE3E3',
  },
  blue: {
    primary: '#1e90ff',
    secondary: '#D1E8FF',
  },
  yellow: {
    primary: '#e3bc08',
    secondary: '#FDF1BA',
  },
};

const typeToColor: Record<string, string> = {
  PR: 'red',
  RV: 'blue',
  SV: 'yellow'
}

@Component({
  selector: 'app-main-calendar',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styles: [
    `
      h3 {
        margin: 0 0 10px;
      }

      pre {
        background-color: #f5f5f5;
        padding: 15px;
      }
    `,
  ],
  templateUrl: 'main-calendar.component.html',
})
export class MainCalendarComponent implements OnInit {
  @ViewChild('modalContent', { static: true }) modalContent?: TemplateRef<any>;

  isLoading : boolean = true;

  CalendarView = CalendarView;

  viewDate: Date = new Date();


  modalData?: {
    action: string;
    event: CalendarEvent;
  };

  actions: CalendarEventAction[] = [
    {
      label: '<i class="fas fa-fw fa-pencil-alt"></i>',
      a11yLabel: 'Edit',
      onClick: ({ event }: { event: CalendarEvent }): void => {
        this.handleEvent('Edited', event);
      },
    },
    {
      label: '<i class="fas fa-fw fa-trash-alt"></i>',
      a11yLabel: 'Delete',
      onClick: ({ event }: { event: CalendarEvent }): void => {
        this.events = this.events.filter((iEvent) => iEvent !== event);
        this.handleEvent('Deleted', event);
      },
    },
  ];

  refresh = new Subject<void>();

  events: CalendarEvent[] = [];

  activeDayIsOpen: boolean = true;

  constructor(private http: HttpService, public header: HeaderService) {}

  ngOnInit(): void {
    this.isLoading = true; // Set isLoading to true initially

    this.http.getSchedule().subscribe(
      (data: ScheduleEventsApiResponse) => {
        data.result.forEach((item) => {
          const startingTime : Date = this.getStartingTime(item);
          const endTime : Date = this.getStartingTime(item);
          endTime.setHours(startingTime.getHours() + 2);
          this.events.push({
            id: item._id,
            start: this.getStartingTime(item),
            end: endTime,
            title: `${item.subject} \n ${item.professor} \n ${item.classroom} \n ${item.type}`,
            color: colors[typeToColor[item.type]]
          });
        });

        this.isLoading = false; // Set isLoading to false after the data is loaded
        console.log(this.events);
      },
      (error) => {
        // Handle errors if needed
        console.error('Error loading schedule:', error);
        this.isLoading = false; // Make sure isLoading is set to false even in case of an error
      }
    );
  }

  getStartingTime(scheduleEvent: ScheduleEvent) : Date {
    const startingTime = new Date();
    const dayDiff = scheduleEvent.day - startingTime.getDay();
    startingTime.setDate(startingTime.getDate() + dayDiff + 1);
    startingTime.setHours(scheduleEvent.time);
    return startingTime;
  }

  dayClicked({ date, events }: { date: Date; events: CalendarEvent[] }): void {
    if (isSameMonth(date, this.viewDate)) {
      if (
        (isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) ||
        events.length === 0
      ) {
        this.activeDayIsOpen = false;
      } else {
        this.activeDayIsOpen = true;
      }
      this.viewDate = date;
    }
  }

  eventTimesChanged({
                      event,
                      newStart,
                      newEnd,
                    }: CalendarEventTimesChangedEvent): void {
    this.events = this.events.map((iEvent) => {
      if (iEvent === event) {
        return {
          ...event,
          start: newStart,
          end: newEnd,
        };
      }
      return iEvent;
    });
    this.handleEvent('Dropped or resized', event);
  }

  handleEvent(action: string, event: CalendarEvent): void {
    this.modalData = { event, action };
  }

  addEvent(): void {
    this.events = [
      ...this.events,
      {
        title: 'New event',
        start: startOfDay(new Date()),
        end: endOfDay(new Date()),
        color: colors['red'],
        draggable: true,
        resizable: {
          beforeStart: true,
          afterEnd: true,
        },
      },
    ];
  }

  deleteEvent(eventToDelete: CalendarEvent) {
    this.events = this.events.filter((event) => event !== eventToDelete);
  }

  closeOpenMonthViewDay() {
    this.activeDayIsOpen = false;
  }

  excludeDays: number[] = [0, 6];
  filterDays() : number[] {
    return this.excludeDays;
  }

}
