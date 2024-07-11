import { useEffect, useState } from "react";
import { BiUser, BiChalkboard, BiBrain } from "react-icons/bi";
import tauriServices from "../../services/tauriServices";
import { MainLayout } from "../layouts";
import StatusCard, { IStatusCard } from "./StatusCard";

async function get_status_counts(): Promise<IStatusCard[]> {
  const [teachers, students, classes, exams] = await Promise.all([
    tauriServices.schoolTeachers.getSchoolTeachersCount(),
    tauriServices.schoolStudents.getSchoolStudentsCount(),
    tauriServices.schoolClasses.getSchoolClassesCount(),

    tauriServices.exams.getSchoolExamsCount(),
  ]);
  
  return [
    { name: "Teachers", icon: BiUser, value: teachers, style: "bg-orange-500/50 border-orange-500/75" } ,
    { name: "Students", icon: BiUser, value: students, style: "bg-blue-500/50 border-blue-500/75" } ,
    // { name: "Parents", icon: BiUser, value: 120, style: "bg-yellow-500/50 border-yellow-500/75" },
    
    { name: "Classes",  icon: BiChalkboard, value: classes, style: "bg-violet-500/50 border-violet-500/75" } ,
    // { name: "Subjects", icon: BiBookOpen, value: 38, style: "bg-pink-500/50 border-pink-500/75" },
    { name: "Exams", icon: BiBrain, value: exams, style: "bg-gray-500/50 border-gray-500/75" } ,
    
    // { name: "Students Attdences", icon: BiTime, value: 120, style: "bg-green-500/50 border-green-500/75" },
    // { name: "Absent Students", icon: BiTime, value: 50, style: "bg-red-500/50 border-red-500/75" },
    
  ];
}

export default function Dashboard() {
  const [data, setData] = useState<IStatusCard[]>([]);

  useEffect(() => {
    get_status_counts().then(data => setData(data)); 
  }, []);
  
  return (
    <MainLayout hideNavigation>
      <div className="px-4 grid gird-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
        {data.map(item => <StatusCard {...item} key={item.name}/>)}
      </div>
    </MainLayout>
  )
}

