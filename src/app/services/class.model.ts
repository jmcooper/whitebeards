export interface ICourse {
  courseNumber: string
  courseName: string
  creditHours: number
  description: string
}

export interface IClass {
  classId: string
  course: ICourse
  professor: string
  days: string
  time: string
  seatsAvailable: number
  processing: boolean
  enrolled: boolean
}