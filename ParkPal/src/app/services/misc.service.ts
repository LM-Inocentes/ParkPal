import { Injectable } from '@angular/core';
import { IFeedback } from '../shared/interfaces/IFeedback';
import { Feedback } from '../shared/models/feedback';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { DELETE_USER_FEEDBACK, GET_ALL_USER_FEEDBACK, GET_RECENT_USER_FEEDBACK, GET_USER_REPORTS, USER_FEEDBACK, USER_REPORT_AVAILABLE, USER_REPORT_UNAVAILABLE, USER_SUSPEND_ACCOUNT, USER_SUSPENSION, USER_UNSUSPEND_ACCOUNT, USER_WARNING} from '../shared/apiURLS/URLS';
import { NotificationsMsg } from '../shared/models/notifications';


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

  postReportAvailable(notificationmsg: NotificationsMsg ): Observable<NotificationsMsg>{
    return this.http.post<NotificationsMsg>(USER_REPORT_AVAILABLE, notificationmsg).pipe(
      tap({
        next: () => {
          this.toastrService.success(
            `User Reported For Not Recording Space is Occupied`,
            'Success'
          )
        },
        error: (errorResponse) => {
          this.toastrService.error(errorResponse.error, 'Error');
        }
      })
    );
  }

  postReportUnAvailable(notificationmsg: NotificationsMsg ): Observable<NotificationsMsg>{
    return this.http.post<NotificationsMsg>(USER_REPORT_UNAVAILABLE, notificationmsg).pipe(
      tap({
        next: () => {
          this.toastrService.success(
            `User Reported For Recording Space but not Occupied`,
            'Success'
          )
        },
        error: (errorResponse) => {
          this.toastrService.error(errorResponse.error, 'Error');
        }
      })
    );
  }

  postWarning(notificationmsg: NotificationsMsg ): Observable<NotificationsMsg>{
    return this.http.post<NotificationsMsg>(USER_WARNING, notificationmsg).pipe(
      tap({
        next: () => {
          this.toastrService.success(
            `Warning Sent`,
            'Success'
          )
        },
        error: (errorResponse) => {
          this.toastrService.error(errorResponse.error, 'Error');
        }
      })
    );
  }

  postSuspension(notificationmsg: NotificationsMsg ): Observable<NotificationsMsg>{
    return this.http.post<NotificationsMsg>(USER_SUSPENSION, notificationmsg);
  }

  suspendUser(userID: string): Observable<NotificationsMsg>{
    return this.http.patch<NotificationsMsg>(USER_SUSPEND_ACCOUNT, userID).pipe(
      tap({
        next: (user) => {
          this.toastrService.success(
            `Account Suspended`,
            'Success'
          )
        },
        error: (errorResponse) => {
          this.toastrService.error(errorResponse.error, 'Error');
        }
      })
    );
  }

  unsuspendUser(userID: string): Observable<NotificationsMsg>{
    return this.http.patch<NotificationsMsg>(USER_UNSUSPEND_ACCOUNT, userID).pipe(
      tap({
        next: (user) => {
          this.toastrService.success(
            `Account Unsuspended`,
            'Success'
          )
        },
        error: (errorResponse) => {
          this.toastrService.error(errorResponse.error, 'Error');
        }
      })
    );
  }
  getAllUserReports(userID: string): Observable<NotificationsMsg[]>{
    return this.http.get<NotificationsMsg[]>(GET_USER_REPORTS + userID);
  }
}
