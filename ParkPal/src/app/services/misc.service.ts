import { Injectable } from '@angular/core';
import { IFeedback } from '../shared/interfaces/IFeedback';
import { Feedback } from '../shared/models/feedback';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { CREATE_PARKS, DELETE_USER_FEEDBACK, GET_ALL_PARKS, GET_ALL_USER_FEEDBACK, GET_IS_PARKED_USER, GET_RECENT_USER_FEEDBACK, GET_REPORTED_USER_BY_PLATENO, GET_USER_REPORTS, PARK_USER, REPORT_GREEN, REPORT_RED, UNPARK_USER, USER_FEEDBACK, USER_REPORT_AVAILABLE, USER_REPORT_UNAVAILABLE, USER_SUSPEND_ACCOUNT, USER_SUSPENSION, USER_UNSUSPEND_ACCOUNT, USER_WARNING} from '../shared/apiURLS/URLS';
import { NotificationsMsg } from '../shared/models/notifications';
import { Park } from '../shared/models/park';
import { User } from '../shared/models/user';


@Injectable({
  providedIn: 'root'
})
  
export class MiscService {
  private mapStateSubject = new BehaviorSubject<number>(0);
  mapState$: Observable<number> = this.mapStateSubject.asObservable();
  
  constructor(private http:HttpClient, private toastrService: ToastrService) { }

  updateMapState(state: number) {
    this.mapStateSubject.next(state);
  }

  getMapState(): Observable<number> {
    return this.mapStateSubject.asObservable();
  }

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

  postReportAvailable(notificationmsg: any ): Observable<NotificationsMsg>{
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

  postSuspension(userID: string ): Observable<NotificationsMsg>{
    return this.http.post<NotificationsMsg>(USER_SUSPENSION, { userID });
  }

  suspendUser(userID: string): Observable<NotificationsMsg>{
    return this.http.patch<NotificationsMsg>(USER_SUSPEND_ACCOUNT, { userID }).pipe(
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
    return this.http.patch<NotificationsMsg>(USER_UNSUSPEND_ACCOUNT, { userID }).pipe(
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
  postParks(Index: string): Observable<Park>{
    return this.http.post<Park>(CREATE_PARKS, { Index });
  }
  getAllParks(): Observable<Park[]>{
    return this.http.get<Park[]>(GET_ALL_PARKS);
  }
  parkUser(park: Park): Observable<Park>{
    return this.http.patch<Park>(PARK_USER, park).pipe(
      tap({
        next: (park) => {
          this.toastrService.success(
            `Parked In Parking Space ${park.id!+1}`,
            'Parking Success'
          )
        },
        error: (errorResponse) => {
          this.toastrService.error(errorResponse.error, 'Error');
        }
      })
    );
  }
  unparkUser(park: Park): Observable<Park>{
    return this.http.patch<Park>(UNPARK_USER, park).pipe(
      tap({
        next: (park) => {
          this.toastrService.success(
            `Unparked In Parking Space ${park.id!+1}`,
            'Unparking Success'
          )
        },
        error: (errorResponse) => {
          this.toastrService.error(errorResponse.error, 'Error');
        }
      })
    );
  }
  reportGreen(park: any): Observable<Park>{
    return this.http.patch<Park>(REPORT_GREEN, park);
  }
  reportRed(park: Park): Observable<Park>{
    return this.http.patch<Park>(REPORT_RED, park);
  }
  getRegisteredUsersByPlateNo(PlateNo: string): Observable<User>{
    return this.http.get<User>(GET_REPORTED_USER_BY_PLATENO + PlateNo);
  } 
  getIsAlreadyParked(parkerID: string): Observable<Park>{
    return this.http.get<Park>(GET_IS_PARKED_USER + parkerID);
  } 
}
