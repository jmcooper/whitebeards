import { Injectable } from '@angular/core';
import { Observable, Subject, EMPTY, throwError } from 'rxjs';
import { delay } from 'rxjs/operators';

import { IUser } from '../services/user.model';
import { IClass, ICourse } from '../services/class.model';

@Injectable()
export class DataRepositoryService {
  currentUser: IUser | null = null;

  constructor() { }

  getCatalog(): Observable<IClass[]> {
    const subject = new Subject<IClass[]>();
    const classes = this.currentUser?.classes || [];
    const catalogWithEnrollmentStatus: IClass[] =
      COURSE_CATALOG.map(catalogClass => {
        return { ...catalogClass, enrolled: classes.includes(catalogClass.classId) };
      });
    setTimeout(() => { subject.next(catalogWithEnrollmentStatus); subject.complete(); }, 200);

    return subject;
  }

  saveUser(user: IUser): Observable<IUser> {
    user.classes = user.classes || [];
    this.currentUser = user;

    return EMPTY.pipe(delay(1000));
  }

  enroll(classId: string): Observable<any> {
    if (!this.currentUser)
      return throwError(() => new Error('User not signed in'));

    if (this.currentUser.classes.includes(classId))
      return throwError(() => new Error('Already enrolled'));

    this.currentUser.classes.push(classId);

    return EMPTY.pipe(delay(1000));
  }

  drop(classId: string): Observable<any> {
    if (!this.currentUser)
      return throwError(() => new Error('User not signed in'));

    if (!this.currentUser.classes.includes(classId))
      return throwError(() => new Error('Not enrolled'));

    this.currentUser.classes = this.currentUser.classes.filter((c: string) => c !== classId);

    return EMPTY.pipe(delay(3000));
  }

  signIn(credentials: any): Observable<any> {
    //Never, ever check credentials in client-side code.
    //This code is only here to supply a fake endpoint for signing in.
    if (credentials.email !== 'me@whitebeards.edu' || credentials.password !== 'super-secret')
      return throwError(() => new Error('Invalid login'));

    this.currentUser = {
      userId: 'e61aebed-dbc5-437a-b514-02b8380d8efc',
      firstName: 'Jim',
      lastName: 'Cooper',
      email: 'me@whitebeards.edu',
      classes: []
    };

    return EMPTY;
  }
}

const COURSES: ICourse[] = [{
  courseNumber: 'PO101',
  courseName: 'Intro to Potions',
  creditHours: 3,
  description: '...',
}, {
  courseNumber: 'HIS105',
  courseName: 'Ancient History of Magic',
  creditHours: 4,
  description: '...'
}, {
  courseNumber: 'CH101',
  courseName: 'Intro to Charms',
  creditHours: 2,
  description: '...'
}, {
  courseNumber: 'CH205',
  courseName: 'Creating Advanced Charms',
  creditHours: 4,
  description: '...'
}, {
  courseNumber: 'SP101',
  courseName: 'Intro Spell Casting',
  creditHours: 3,
  description: '...'
}, {
  courseNumber: 'SP201',
  courseName: 'Advanced Spell Casting',
  creditHours: 4,
  description: '...'
}];

const COURSE_CATALOG: IClass[] = [{
  classId: '24ab7b14-f935-44c1-b91b-8598123ea54a',
  course: COURSES[0],
  professor: 'Abramius Darksbayn',
  seatsAvailable: 23,
  days: 'MWF',
  time: '11:00 AM',
  processing: false,
  enrolled: false
}, {
  classId: 'cebbc5ba-f49a-4708-b3dc-51a346b3231e',
  course: COURSES[0],
  professor: 'Philosifus Siebrand',
  seatsAvailable: 9,
  days: 'MWF',
  time: '12:00 PM',
  processing: false,
  enrolled: false
}, {
  classId: '6130cdd4-071a-4559-8072-35f0fbec5516',
  course: COURSES[0],
  professor: 'Abramius Darksbayn',
  seatsAvailable: 14,
  days: 'THF',
  time: '2:00 PM',
  processing: false,
  enrolled: false
}, {
  classId: 'dd0343e9-50b2-4f1d-8b87-93c0b34f3d35',
  course: COURSES[1],
  professor: 'Antonia Clavell',
  seatsAvailable: 28,
  days: 'THF',
  time: '11:00 AM',
  processing: false,
  enrolled: false
}, {
  classId: '7277956e-795f-4c0f-9861-cf03635df5ea',
  course: COURSES[2],
  professor: 'Meriel Dufaux',
  seatsAvailable: 28,
  days: 'MW',
  time: '10:00 AM',
  processing: false,
  enrolled: false
}, {
  classId: '76d31fdc-e398-4d17-872b-e8222407e755',
  course: COURSES[3],
  professor: 'Adranus Klaus',
  seatsAvailable: 28,
  days: 'THF',
  time: '1:00 PM',
  processing: false,
  enrolled: false
}, {
  classId: 'd8bf81f4-3945-4a55-b5c4-663012246873',
  course: COURSES[4],
  professor: 'Ragnvald Graupnar',
  seatsAvailable: 28,
  days: 'MWF',
  time: '12:00 PM',
  processing: false,
  enrolled: false
}, {
  classId: 'c34b20fd-d2a0-4fb6-aeaa-2fc3a52e2e89',
  course: COURSES[5],
  professor: 'Philosifus Siebrand',
  seatsAvailable: 28,
  days: 'THF',
  time: '11:00 AM',
  processing: false,
  enrolled: false
}, {
  classId: 'c5e73546-5f3c-4de1-8819-fe5bd3b6ef7e',
  course: COURSES[2],
  professor: 'Phoebe Chabon',
  seatsAvailable: 28,
  days: 'WF',
  time: '2:00 PM',
  processing: false,
  enrolled: false
}, {
  classId: 'fcf0652f-58c0-4eeb-b040-3eddb29e49e3',
  course: COURSES[3],
  professor: 'Sycily Soule',
  seatsAvailable: 28,
  days: 'THF',
  time: '1:00 PM',
  processing: false,
  enrolled: false
}, {
  classId: 'bb0a6a48-062e-4927-8257-28eb5842c0a6',
  course: COURSES[4],
  professor: 'Heldebald Cincebeaux',
  seatsAvailable: 28,
  days: 'MTW',
  time: '10:00 AM',
  processing: false,
  enrolled: false
}, {
  classId: '996901ca-614e-4b92-887e-12528c88b880',
  course: COURSES[5],
  professor: 'Gerlinda Weinschroot',
  seatsAvailable: 28,
  days: 'THF',
  time: '11:00 AM',
  processing: false,
  enrolled: false
}];
