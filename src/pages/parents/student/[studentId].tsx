import { useState, useEffect } from "react";
import { MainLayout } from "../../../components/layouts";
import tauriServices from "../../../services/tauriServices";
import { Link, useParams } from "react-router-dom";
import { Avater } from "../../../components/ui";
import { IParent } from "../../../services/tauriServices/parents";

export default function GetStudentParentsPage() {
  const params = useParams<any>();
  const { parents } = useGetStudentParentsPage(Number(params.studentId));

  return (
    <MainLayout name="Student's Parents" back="/parents">
      <div className="flex flex-wrap items-center justify-center gap-4">
        {parents.map((parent) => (
          <div className="w-[15rem] px-4 py-6 flex flex-col items-center gap-4 border-2 rounded-md shadow-md" key={parent.id}>
            <Avater src={parent.img} variant="big" />
            <div className="text-center">
              <h3 className="font-semibold">{parent.name}</h3>
              <span className="text-sm">{parent?.profession || "No profession."}</span>
            </div>
            <div className="flex items-center justify-center gap-4">
              <Link
                className="h-8 px-6 grid place-items-center font-semibold text-sm bg-slate-400 rounded-md"
                to={`/parents/${parent.id}`}
              >
                View
              </Link>
            </div>
          </div>
        ))}
      </div>
    </MainLayout>
  );
}

function useGetStudentParentsPage(studentId: number) {
  const [parents, setParents] = useState<IParent[]>([]);

  useEffect(() => {
    tauriServices.studentParents
      .getStudentParents(studentId)
      .then((data) => setParents(data));
  }, []);

  return { parents };
}
