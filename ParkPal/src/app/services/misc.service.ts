import { Injectable } from '@angular/core';
import { IFeedback } from '../shared/interfaces/IFeedback';
import { Feedback } from '../shared/models/feedback';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { DELETE_USER_FEEDBACK, GET_ALL_USER_FEEDBACK, GET_RECENT_USER_FEEDBACK, USER_FEEDBACK } from '../shared/apiURLS/URLS';


@Injectable({
  providedIn: 'root'
})
export class MiscService {

  constructor(private http:HttpClient, private toastrService: ToastrService) { }

  postFeedback(Ifeedback: IFeedback): Observable<Feedback>{
    return this.http.post<Feedback>(USER_FEEDBACK, Ifeedback).pipe(
      tap({
        next: () => {
          this.toastrService.success(
            `Feedback Posted`,
            'Success'
          )
        },
        error: (errorResponse) => {
          this.toastrService.error(errorResponse.error, 'Error');
        }

      })
    );
  }

  getRecentFeedback(): Observable<Feedback[]>{
    return this.http.get<Feedback[]>(GET_RECENT_USER_FEEDBACK);
  }

  getallFeedbacks(): Observable<Feedback[]>{
    return this.http.get<Feedback[]>(GET_ALL_USER_FEEDBACK);
  }

  deleteFeedback(id:string)
  {
    return this.http.delete( DELETE_USER_FEEDBACK +id);
  }

}
