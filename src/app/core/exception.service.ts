import { Injectable } from "@angular/core";
import { HttpResponse } from "@angular/common/http";
import { Observable, of } from "rxjs";

@Injectable()
export class ExceptionService {
  constructor() {}

  catchBadResponse: (errorResponse: any) => Observable<any> = (
    errorResponse: any
  ) => {
    let res = <HttpResponse<any>>errorResponse;
    let err = res || {};
    // let emsg = err
    //   ? err.error
    //     ? err.error
    //     : JSON.stringify(err)
    //   : res.statusText || "unknown error";
    console.log(`Error - Bad Response - `);
    return of(false);
  };
}
