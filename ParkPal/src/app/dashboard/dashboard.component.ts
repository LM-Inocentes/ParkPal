import { Component, NgModule } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { User } from '../shared/models/user';
import { MiscService } from '../services/misc.service';
import { Park } from '../shared/models/park';
import { forkJoin, switchMap, timer } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { ParkGreenModalComponent } from '../component/park-green-modal/park-green-modal.component';
import { ParkRedModalComponent } from '../component/park-red-modal/park-red-modal.component';
import { ParkYellowModalComponent } from '../component/park-yellow-modal/park-yellow-modal.component';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  user!:User;
  Firstname?: string;
  dashSuspended?: boolean;
  mapImagePath: string = 'assets/overall-map.png';
  mapState: number = 0;

  allParks!: Park[];
  AD1!: Park[];
  AD2!: Park[];
  AD3!: Park[];
  BD1!: Park[];
  BD2!: Park[];
  BD3!: Park[];
  CD1!: Park[];
  CD2!: Park[];
  CD3!: Park[];

  constructor( private authService:AuthService, private miscService:MiscService, private dialog: MatDialog, private toastr: ToastrService) {
    this.authService.userObservable.subscribe((newUser) => {
      this.user = newUser;
      if(this.isAuth){
        this.Firstname = this.user.Fullname.split(' ').at(0);
      }
    });
    if(this.user.Level == 1){
      this.authService.getRegisteredUsersByID(this.user.id).subscribe((user) => {
        this.dashSuspended = user.isSuspended;
      });
    }
    this.miscService.mapState$.subscribe((state) => {
      this.updateMapState(state);
    });
  }

  ngOnInit(): void {
    this.miscService.getAllParks().subscribe((parks) => {
      this.allParks = parks;
      // Use slice to get a subset of the array based on the start and end+1 indices
      this.AD1 = this.allParks.slice(0, 12);
      this.AD2 = this.allParks.slice(12, 24);
      this.AD3 = this.allParks.slice(24, 36);
      this.BD1 = this.allParks.slice(36, 47);
      this.BD2 = this.allParks.slice(47, 49);
      this.BD3 = this.allParks.slice(49, 63);
      this.CD1 = this.allParks.slice(63, 73);
      this.CD2 = this.allParks.slice(73, 75);
      this.CD3 = this.allParks.slice(75, 82);
    });
  }
  
  get isAuth(){
    return this.user.token;
  }

  updateMapState(state: number) {
    if (state == 0) {
      this.mapImagePath = 'assets/overall-map.png';
      this.mapState = 0;
    } else if (state == 1) {
      this.mapImagePath = 'assets/area1-map.png';
      this.mapState = 1;
    } else if (state == 2) {
      this.mapImagePath = 'assets/area2-map.png';
      this.mapState = 2;
    } else if (state == 3) {
      this.mapImagePath = 'assets/area3-map.png';
      this.mapState = 3;
    }
  }

  // createParks() {
  //   let Index = 82;
  //   for (let i = 0; i < Index; i++) {
  //     this.miscService.postParks(i.toString()).subscribe(
  //       (response) => {
  //         console.log(`Park ${i} created successfully:`, response);
  //       },
  //       (error) => {
  //         console.error(`Error creating park ${i}:`, error);
  //       }
  //     );
  
  //     // Introduce a delay between requests (e.g., 500 milliseconds)
  //     // Adjust the delay as needed based on your requirements.
  //     if (i < Index - 1) {
  //       timer(2000).subscribe();
  //     }
  //   }
  // }

  parkGreen(id: number, name: string){
    const park: Park = {
      id,
      parkerID: this.user.id,
      name: this.user.Fullname,
      PlateNo: this.user.VPlateNo!,
    }
    const dialogRef = this.dialog.open(ParkGreenModalComponent, {
      width: '250px',
      data: { 
        title: `Parking Space #${park.id!+1}`, 
        message: 'Select Option', 
        level: this.user.Level 
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result === 'park') {
        this.miscService.getIsAlreadyParked(this.user.id).subscribe(({isParked}) => {
          if (isParked) {
            this.toastr.error(
              `You Are Parked In Other Parking Spaces Or Reported (Contact Admin To Reset Parking)`,
              'Parking Failed'
            );
          } else {
            this.miscService.parkUser(park).subscribe(_ => {
              this.ngOnInit();
            });
          }
        });
      }else{
        //result is PlateNo here
        this.miscService.getRegisteredUsersByPlateNo(result).pipe(
          switchMap((user) => {
            if(!user && result){
              this.toastr.error(
                `No Matching Plate Number Found Among Users`,
                'Report Failed'
              );
            }
            const sendreport = {
              userID: user.id,
              parkID: id,
              reporterName: this.user.id,
            };
            const parkreport = {
              id,
              reporterName: this.user.id,
              name: user.id,
            };
            //forkJoin means run in parallel
            return forkJoin([
              this.miscService.postReportAvailable(sendreport),
              this.miscService.reportGreen(parkreport)
            ]);
          })
        ).subscribe(() => {
          this.ngOnInit();
        });
      }
    });
  }
  parkRed(park: Park){
    const dialogRef = this.dialog.open(ParkRedModalComponent, {
      width: '250px',
      data: { 
        title: `Parking Space #${park.id!+1}`, 
        message1: `ID number: ${park.parkerID}`, 
        message2: `Plate No: ${park.PlateNo}`,
        message3: `Time ${park.time}`,
        level: this.user.Level,
        isParker: (park.parkerID==this.user.id)  //boolean if user is parker
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result === 'unpark') {
        this.miscService.unparkUser(park).subscribe(_ => {
          this.ngOnInit();
        });
      }else if (result === 'report') {
        const sendreport = {
          userID: park.parkerID,
          parkID: park.id,
          reporterName: this.user.id,
        };
        const parkreport = {
          id: park.id,
          reporterName: this.user.id,
          name: park.parkerID,
        };
        forkJoin([
          this.miscService.postReportUnAvailable(sendreport),
          this.miscService.reportRed(parkreport)
        ]).subscribe(
          _ => {
            this.ngOnInit(); 
          }
        );
      }else if (result === 'reset') {
        //unpark and reset is the same
        this.miscService.unparkUser(park).subscribe(_ => {
          this.ngOnInit();
        });
      }
    });
  }

  parkYellow(park: Park){
    const dialogRef = this.dialog.open(ParkYellowModalComponent, {
      width: '250px',
      data: { 
        title: `Parking Space #${park.id!+1}`, 
        message: `${park.PlateNo}`,               //
        level: this.user.Level,
        isParker: (park.parkerID==this.user.id)  //boolean if user is parker
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result === 'unpark') {
        this.miscService.unparkUser(park).subscribe(_ => {
          this.ngOnInit();
        });
      }else if (result === 'reset') {
        //unpark and reset is the same
        this.miscService.unparkUser(park).subscribe(_ => {
          this.ngOnInit();
        });
      }
    });
  }

} 
