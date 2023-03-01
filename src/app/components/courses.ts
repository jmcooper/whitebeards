import { Component } from '@angular/core';

import { DataRepositoryService } from "../services/data-repository"
import { IClass } from '../services/class.model';

@Component({
  styleUrls: ['../styles/catalog.css'],
  templateUrl: '../templates/catalog.html'
})
export class CoursesComponent {
  classes: IClass[] = [];
  visibleClasses: IClass[] = [];

  constructor(public dataRepository: DataRepositoryService) { }

  ngOnInit() {
    this.dataRepository.getCatalog()
      .subscribe((classes: IClass[]) => { this.classes = classes; this.applyFilter('') });
  }

  enroll(classToEnroll: IClass) {
    classToEnroll.processing = true;
    this.dataRepository.enroll(classToEnroll.classId)
      .subscribe({
        error: (err) => { console.error(err); classToEnroll.processing = false },
        complete: () => { classToEnroll.processing = false; classToEnroll.enrolled = true; },
      });
  }

  drop(classToDrop: IClass) {
    classToDrop.processing = true;
    this.dataRepository.drop(classToDrop.classId)
      .subscribe({
        error: (err) => { console.error(err); classToDrop.processing = false },
        complete: () => { classToDrop.processing = false; classToDrop.enrolled = false; }
      });
  }

  applyFilter(filter: string) {
    if (!filter) {
      this.visibleClasses = this.classes;
      return;
    }

    if (filter === 'GEN') {
      this.visibleClasses = this.classes.filter(c =>
        !c.course.courseNumber.startsWith('CH') &&
        !c.course.courseNumber.startsWith('PO') &&
        !c.course.courseNumber.startsWith('SP'));
    } else {
      this.visibleClasses = this.classes.filter(c => c.course.courseNumber.startsWith(filter));
    }
  }
}
