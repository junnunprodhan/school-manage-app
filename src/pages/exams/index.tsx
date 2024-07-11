import { useEffect, useState } from "react";
import { MainLayout } from "../../components/layouts";
import tauriServices from "../../services/tauriServices";
import { ExamSummary } from "../../components/exams";
import { ButtonResponsive, EmptyData } from "../../components/ui";
import { BiPlus } from "react-icons/bi";
import { IExamWithClass } from "../../services/tauriServices/exams";

export default function GetSchoolExamsPage() {
  const { exams } = useGetSchoolExamsPage();

  return (
    <MainLayout
      name="Exam List"
      renderRight={() => {
        return (
          <>
            <ButtonResponsive to="/exams/add" icon={BiPlus} text="Add Exam" />
          </>
        );
      }}
    >
      {exams.length === 0 && <EmptyData name="Nothing to Show." describtion="Add some exams." />}

      <div className="px-4 md:py-4 flex flex-col gap-4">
        {exams.map((exam) => (
          <ExamSummary exam={exam} key={exam.id} />
        ))}
      </div>
    </MainLayout>
  );
}

function useGetSchoolExamsPage() {
  const [exams, setExams] = useState<IExamWithClass[]>([]);

  useEffect(() => {
    tauriServices.exams.getSchoolExams().then((data) => setExams(data));
  }, []);

  return { exams };
}
