import {Component, OnDestroy, OnInit} from '@angular/core';
import {
  from,
  fromEvent,
  interval,
  noop,
  Observable,
  of,
  Subscription,
  timer,
  concat,
  merge,
  asapScheduler,
  empty
} from "rxjs";
import {concatMap, delay, map, takeUntil, takeWhile} from "rxjs/operators";
import {createHttpObservable} from "../common/util";

@Component({
  selector: 'about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit, OnDestroy {

  private t = false;
  ngOnDestroy() {
    this.t = true;
  }

  constructor() {
  }

  ngOnInit() {

    // abortable http

    const http$ = createHttpObservable('/api/courses')

   const sub1 = http$
      .subscribe((val) => {
          console.log(val);
      });

    setTimeout(() => {
      sub1.unsubscribe();
    }, 0);


    // unsubscription -

    const intervalSwitchMap$ = interval(1000);

    const sub: Subscription = intervalSwitchMap$
      .subscribe((val) => console.log("SwitchMap val: " + val));

    setTimeout(() => sub.unsubscribe(),5000);

    this.t = false;
    // concatMap

    const o1$ = from([1,2,3,4]);
    const concated$ = o1$.pipe(concatMap((val) => {
      return of(val * 10);
    }));

    concated$
      .pipe(takeWhile(() => !this.t))
      .subscribe((val) => {
        console.log("concatMap: " + val);
      });

    // merge -- subscribes to all the streams you pass to it and
    // emits every value from every observable at the same time
    // the merge operator completes emittion only when all of the observables
    // complete

    const interval1$ = interval(1000);
    const interval2$ = interval1$.pipe(map((val) => {
      return val * 10;
    }), delay(1000));

    const resultMerge = merge(
      interval1$.pipe(map((v) => `stream 1: ${v}`)), interval2$.pipe(map((v) => `stream 2: ${v}`))
    );
    resultMerge
      .pipe(takeWhile(() => !this.t))
      .subscribe((val) => {
        console.log("merge: " + val);
      });



    // concat operator - concats any number of streams,
    // it subscribes to first wait to it's completion and only when
    // subscribes to next stream.
    const source1$ = of(1, 2, 3);
    const source2$ = of(4, 5, 6);
    const source3$ = of(7, 8, 9);

    const result$ = concat(source1$, source2$, source3$);

    result$
      .pipe(takeWhile(() => !this.t))
      .subscribe((e) => console.log(e));

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

