import { useState } from "react";
import tauriServices from "../../services/tauriServices";
import { Details, Table } from "../ui";
import { Link } from "react-router-dom";
import { IExamWithClass } from "../../services/tauriServices/exams";
import { IExamSubjectWithSubject } from "../../services/tauriServices/examSubjects";

export default function ExamSummary({ exam }: { exam: IExamWithClass }) {
  const [subjects, setSubjects] = useState<IExamSubjectWithSubject[]>([]);

  const handleOnClick = () => {
    if (subjects.length !== 0) return;

    tauriServices.examSubjects
      .getExamSubjects(exam.id)
      .then((data) => setSubjects(data));
  };

  return (
    <Details.Details>
      <Details.Summary onClick={handleOnClick}>
        {exam.name} - {exam.class_name} - 20/01/2024
      </Details.Summary>

      <Details.Content>
        <Details.Header>
          <Link className="btn btn-transparent" to="/exams/subjects/add">
            Add Subject
          </Link>
        </Details.Header>

        <Table.Table
          head={["Subject", "Marks", "Date Time"]}
          data={subjects}
          renderItem={(item, index) => (
            <Table.Row key={index}>
              <Table.Col key={"subject"}>
                {item.subject_name} ({item.subject_code})
              </Table.Col>
              <Table.Col key={"marks"}>
                <div className="flex flex-col">
                  <div className="flex items-center justify-between" key={"marks-objective"}>
                    <p className="text-xs font-semibold">Objective:</p>
                    <span className="text-sm">{item.objective_mark}</span>
                  </div>
                  <div className="flex items-center justify-between" key={"marks-subjective"}>
                    <p className="text-xs font-semibold">Subjective:</p>
                    <span className="text-sm">{item.subjective_mark}</span>
                  </div>
                  <div className="flex items-center justify-between" key={"marks-practical"}>
                    <p className="text-xs font-semibold">Practical:</p>
                    <span className="text-sm">{item.practical_mark}</span>
                  </div>
                </div>
              </Table.Col>
              <Table.Col key={"date"}>
                <div className="flex flex-col">
                  <div className="flex items-center justify-between" key={"date-date"}>
                    <p className="text-xs font-semibold">Date:</p>
                    <span className="text-sm">{"23-04-03"}</span>
                  </div>
                  <div className="flex items-center justify-between" key={"date-form"}>
                    <p className="text-xs font-semibold">From:</p>
                    <span className="text-sm">{"10:00"}</span>
                  </div>
                  <div className="flex items-center justify-between" key={"date-to"}>
                    <p className="text-xs font-semibold">To:</p>
                    <span className="text-sm">{"12:00"}</span>
                  </div>
                </div>
              </Table.Col>
            </Table.Row>
          )}
        />
      </Details.Content>
    </Details.Details>
  );
}
