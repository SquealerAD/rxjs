import {AfterViewInit, Component, ElementRef, Inject, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import {Course} from "../model/course";
import {FormBuilder, Validators, FormGroup} from "@angular/forms";
import * as moment from 'moment';
import {concat, fromEvent, Observable, of} from 'rxjs';
import {
  concatMap,
  debounce,
  debounceTime,
  distinctUntilChanged,
  exhaustMap,
  filter,
  map,
  mergeMap
} from 'rxjs/operators';
import {fromPromise} from 'rxjs/internal-compatibility';

@Component({
    selector: 'course-dialog',
    templateUrl: './course-dialog.component.html',
    styleUrls: ['./course-dialog.component.css']
})
export class CourseDialogComponent implements OnInit, AfterViewInit {

    form: FormGroup;
    course:Course;

    @ViewChild('saveButton', { static: true }) saveButton: ElementRef;

    @ViewChild('searchInput', { static: true }) searchInput : ElementRef;

    constructor(
        private fb: FormBuilder,
        private dialogRef: MatDialogRef<CourseDialogComponent>,
        @Inject(MAT_DIALOG_DATA) course:Course ) {

        this.course = course;

        this.form = fb.group({
            description: [course.description, Validators.required],
            category: [course.category, Validators.required],
            releasedAt: [moment(), Validators.required],
            longDescription: [course.longDescription,Validators.required]
        });

    }

    ngOnInit() {

       // concatMap - creates & subscribes to higher order observable
       // only when a previous inner observable completes.
      // the higher order observable creates inner observable and emits values from it.


      // mergeMap - creates & subscribes to all higher order observables
      // in the map inner function it creates inner observable and emits vales
      // from it
        this.form.valueChanges
          .pipe(filter(() => this.form.valid),
                concatMap((changes) => {
                  return this.saveCourse(changes);
                }))
          .subscribe((res) => {
            console.log(res);
          })
    }

    saveCourse(changes): Observable<any> {
      return fromPromise(fetch(`/api/courses/${this.course.id}`, {
        method: "PUT",
        body: JSON.stringify(changes),
        headers: {
          'content-type': 'application/json'
        }
      }))
    }


    ngAfterViewInit() {
      fromEvent(this.saveButton.nativeElement, 'click')
        .pipe(exhaustMap(() => {
          return this.saveCourse(this.form.value);
        }))
        .subscribe((response) => {
          console.log(response);
        })
    }



    close() {
        this.dialogRef.close();
    }

}
