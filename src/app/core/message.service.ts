import { HttpBackend } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Subject } from "rxjs";

import { CONFIG } from "./config";

export interface ResetMessage {
  message: string;
}

@Injectable()
export class MessageService {
  private subject = new Subject<ResetMessage>();

  state = this.subject;

  constructor(private http: HttpClient) {}

  resetDb() {
    let msg = "Reset the Data Successfully";
    this.http.post(CONFIG.baseUrls.resetDb, null).subscribe(() => {
      this.subject.next({ message: msg });
    });
  }
}
