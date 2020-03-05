import {Component, OnInit} from '@angular/core';
import {Course} from "../model/course";
import {from, interval, noop, Observable, of, timer} from 'rxjs';
import {catchError, delayWhen, filter, map, retryWhen, share, shareReplay, tap} from 'rxjs/operators';
import {createHttpObservable} from "../common/util";
import {fromPromise} from "rxjs/internal-compatibility";


@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  // beginnerCourses: Array<Course> = [];
  // advancedCourses: Array<Course> = [];

  beginnerCourses$: Observable<Array<Course>>;
  advancedCourses$: Observable<Array<Course>>;

  bg: Observable<Array<Course>>;


  constructor() {

  }

  ngOnInit() {

    const http$ : Observable<Array<Course>> = createHttpObservable('/api/courses');

    const courses$ = http$.pipe(
      map(res => res["payload"])
    );

    this.beginnerCourses$ = courses$
      .pipe(
        map((courses: Array<Course>) => courses
          .filter(course => course.category === 'BEGINNER')),
      );

    this.advancedCourses$ = courses$
      .pipe(
        map((courses: Array<Course>) => courses
          .filter(course => course.category === 'ADVANCED')),
      );

    // const http$: Observable<any> = createHttpObservable('/api/courses');
    //
    // const courses$ = http$
    //   .pipe(
    //     map(res => res.payload)
    //   );


    // courses$.subscribe(
    //   (courses: Array<Course>) => {
    //
    //     this.beginnerCourses = courses.filter((course: Course) => {
    //       return course.category === 'BEGINNER';
    //     });
    //
    //     this.advancedCourses = courses.filter((course: Course) => {
    //       return course.category === 'ADVANCED';
    //     })
    //
    //   },
    //   noop,
    //   () => console.log('completed')
    // );


  }

}
