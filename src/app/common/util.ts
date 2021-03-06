import {Observable} from "rxjs";

export function createHttpObservable<T>(url:string) : Observable<T>{
  return  new Observable(observer => {

    const abortController = new AbortController();
    const abortSignal = abortController.signal;

    fetch(url, {
      signal: abortSignal
    })
      .then(response => {
        return response.json();
      })
      .then(body => {
        observer.next(body);
        observer.complete();
      })
      .catch(err => {
        observer.error(err);
      });

    return () => abortController.abort();
  });
}


