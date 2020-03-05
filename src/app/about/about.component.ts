import {Component, OnInit} from '@angular/core';
import {fromEvent, interval, noop, Observable, Subscription, timer} from "rxjs";
import {map} from "rxjs/operators";
import {createHttpObservable} from "../common/util";

@Component({
  selector: 'about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {

  constructor() {
  }

  ngOnInit() {


    //    // emits values every x seconds
    // const interval$ = interval(1000);
    //
    // // emits values every x seconds after delay of first emition of y seconds
    // const timer$ = timer(3000, 1000);
    //
    // const click$ = fromEvent(document, 'click');
    //
    // const sub: Subscription = timer$.subscribe(e => console.log("stream 1 => " + e));
    //
    // setTimeout(() => sub.unsubscribe(), 5000);
    //
    // click$.subscribe(
    //   evt => console.log(evt),
    //   err => console.log(err),
    //   () => console.log('completed')
    // );


    // interval$.subscribe((e) => {
    //   console.log("stream 2: " + e);
    // });
    //
    // interval$.subscribe((e) => {
    //   console.log("stream 3: " + e);
    // });

    // document.addEventListener('click', (evt) => {
    //   console.log(evt);
    //   setTimeout(() => {
    //     console.log('finished...');
    //     let counter = 0;
    //     setInterval(() => {
    //       console.log(counter);
    //       counter++;
    //     }, 1000);
    //   } ,3000);
    // });


  }
}

