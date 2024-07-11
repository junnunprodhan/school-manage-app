import {
  BiUser,
  BiTime,
  BiInfoCircle,
  BiHome,
  BiChalkboard,
  BiBrain,
  BiBarChartAlt2
} from "react-icons/bi";

export const SIDEBAR_MENUS = [
  {
    name: "Home",
    icon: BiHome,
    paths: ["/"],
    menus: [{ name: "Dashboard", path: "/" }],
  },
  {
    name: "Teachers",
    icon: BiUser,
    paths: ["/teachers", "/teachers/add"],
    menus: [
      { name: "Teachers", path: "/teachers" },
      { name: "Add Teacher", path: "/teachers/add" }
    ],
  },
  {
    name: "Classes",
    icon: BiChalkboard,
    paths: ["/classes", "/classes/add", "/classes/subjects/add"],
    menus: [
      { name: "Classes", path: "/classes" },
      { name: "Add Class", path: "/classes/add"}
    ],
  },
  {
    name: "Students",
    icon: BiUser,
    paths: ["/students", "/students/add"],
    menus: [
      { name: "Students", path: "/students" },
      { name: "Add Student", path: "/students/add" }
    ],
  },
  {
    name: "Exams",
    icon: BiBrain,
    paths: ["/exams", "/exams/add", "/exams/subjects", "/exams/subjects/add"],
    menus: [
      { name: "Exams", path: "/exams" },
      { name: "Add Exam", path: "/exams/add" }
    ],
  },
  {
    name: "Marks",
    icon: BiBarChartAlt2,
    paths: ["/exam-marks", "/exam-marks/add", "/exam-marks/student"],
    menus: [
      { name: "Marks", path: "/exam-marks" },
      { name: "Add Marks", path: "/exam-marks/add" },
      { name: "Student Marks", path: "/exam-marks/student" },
    ],
  },
  {
    name: "Parents",
    icon: BiUser,
    paths: ["/parents", "/parents/add"],
    menus: [
      { name: "Parents", path: "/parents" },
      { name: "Add Parent", path: "/parents/add" },
      // { name: "Connect Student", path: "/parents/connect-with-student" }
    ],
  },
  {
    name: "Attendences",
    icon: BiTime,
    paths: [
      "/student-attendences",
      "/student-attendences/take",
      "/students-attendences/student",
    ],
    menus: [
      { name: "Attendence", path: "/student-attendences" },
      { name: "Take Attendence", path: "/student-attendences/take" },
      // { name: "Student Attedence", path: "/student-attendences/student" },
    ],
  },
  {
    name: "Settings",
    icon: BiInfoCircle,
    paths: ["/settings"],
    menus: [
      { name: "Logout", path: "/auth/logout" },
    ],
  },
  // {
  //   name: "Software",
  //   icon: BiInfoCircle,
  //   paths: ["/about", "/developer",],
  //   menus: [
  //     { name: "Developer", path: "/developer" },
  //     { name: "About", path: "/about" },
  //   ],
  // },
];

export const USER_TYPES = [
  { name: "Admin", value: "ADMIN" },
  { name: "Teacher", value: "TEACHER" },
  { name: "Student", value: "STUDENT" },
  { name: "Parent", value: "PARENT" },
];

export const GENDERS = [
  { name: "Male", value: "MALE" },
  { name: "Female", value: "FEMALE" },
  { name: "Not Prefer", value: "NONE" },
];
