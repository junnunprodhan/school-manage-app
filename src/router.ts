// Generouted, changes to this file will be overriden
/* eslint-disable */

import { components, hooks, utils } from '@generouted/react-router/client'

export type Path =
  | `/`
  | `/about`
  | `/auth/login`
  | `/auth/logout`
  | `/auth/signup`
  | `/classes`
  | `/classes/add`
  | `/classes/subjects/add`
  | `/developer`
  | `/exam-marks`
  | `/exam-marks/add`
  | `/exam-marks/student`
  | `/exams`
  | `/exams/add`
  | `/exams/subjects/add`
  | `/parents`
  | `/parents/:parentId`
  | `/parents/add`
  | `/parents/connect-with-student`
  | `/parents/student/:studentId`
  | `/student-attendences`
  | `/student-attendences/student`
  | `/student-attendences/take`
  | `/students`
  | `/students/:studentId`
  | `/students/add`
  | `/teachers`
  | `/teachers/:teacherId`
  | `/teachers/add`

export type Params = {
  '/parents/:parentId': { parentId: string }
  '/parents/student/:studentId': { studentId: string }
  '/students/:studentId': { studentId: string }
  '/teachers/:teacherId': { teacherId: string }
}

export type ModalPath = never

export const { Link, Navigate } = components<Path, Params>()
export const { useModals, useNavigate, useParams } = hooks<Path, Params, ModalPath>()
export const { redirect } = utils<Path, Params>()
