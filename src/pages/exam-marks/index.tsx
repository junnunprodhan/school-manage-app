import { useRef, useState, useEffect, FormEvent } from "react";
import { MainLayout } from "../../components/layouts";
import tauriServices from "../../services/tauriServices";
import { ButtonResponsive, EmptyData, Table } from "../../components/ui";
import { isInvalidObject } from "../../utils/validation";
import { Filter, FilterSelectItem } from "../../components/ui/Filter";
import { BiPlus } from "react-icons/bi";
import { IClass } from "../../services/tauriServices/classes";
import { IExamSubjectWithSubject } from "../../services/tauriServices/examSubjects";
import { IExamMarkWithStudentAndSubject } from "../../services/tauriServices/examMarks";
import { IExam } from "../../services/tauriServices/exams";
import {
  classSectionsToSelectOptions,
  classesToSelectOptions,
} from "../../utils";
import { Link } from "react-router-dom";
import { UserItem } from "../../components/common";

export default function GetExamMarksPage() {
  const {
    classes,
    exams,
    subjects,
    examMarks,
    isMarksAdded,
    ref,
    handleOnClassChange,
    handleOnExamChange,
    handleOnSearch,
  } = useGetExamMarksPage();

  return (
    <MainLayout
      name="Exam Marks"
      renderRight={() => {
        return (
          <>
            <ButtonResponsive
              to="/exam-marks/add"
              icon={BiPlus}
              text="Add Marks"
            />
          </>
        );
      }}
    >
      <Filter.Filter onSubmit={handleOnSearch}>
        <Filter.Section>
          <Filter.SubSection>
            <FilterSelectItem
              label="Class Name"
              id="className"
              options={classesToSelectOptions(classes)}
              onChange={handleOnClassChange}
              ref={ref.classId}
            />
            <FilterSelectItem
              label="Section Name"
              id="sectionName"
              options={classSectionsToSelectOptions()}
              ref={ref.sectionId}
              hidden
            />
          </Filter.SubSection>
          <Filter.SubSection></Filter.SubSection>
        </Filter.Section>
        <Filter.Section>
          <Filter.SubSection>
            <FilterSelectItem
              label="Exam Name"
              id="examName"
              options={exams.map((item) => ({
                name: item.name,
                value: item.id,
              }))}
              onChange={handleOnExamChange}
              ref={ref.examId}
            />
            <FilterSelectItem
              label="Subject Name"
              id="subjectName"
              options={subjects.map((item) => ({
                name: item.subject_name,
                value: item.id,
              }))}
              ref={ref.subjectId}
            />
          </Filter.SubSection>
          <Filter.SubSection>
            <Filter.Button type="submit" children="Search" />
          </Filter.SubSection>
        </Filter.Section>
      </Filter.Filter>


      {!isMarksAdded ? (
        <EmptyData name="NotAdded" describtion="Add exam marks.">
          <Link className="btn btn-success" to="/exam-marks/add">
            Add Marks
          </Link>
        </EmptyData>
      ) : (
        <Table.Table
          head={["ID", "Student", "Mark"]}
          data={examMarks}
          renderItem={(item, index) => (
            <Table.Row key={index}>
              <Table.Col key={"studentId"}>{item.student_id}</Table.Col>
              <Table.Col key={"student"}>
                <UserItem
                  name={item.student_name}
                  img={item.student_img}
                  href={`students/${item.student_id}`}
                />
              </Table.Col>
              <Table.Col key={"marks"}>
                <div className="flex flex-col">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold">Objective:</span>
                    <span className="text-sm">{item.objective_mark}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold">Subjective:</span>
                    <span className="text-sm">{item.subjective_mark}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold">Practical:</span>
                    <span className="text-sm">{item.practical_mark}</span>
                  </div>
                </div>
              </Table.Col>
            </Table.Row>
          )}
        />
      )}
    </MainLayout>
  );
}

function useGetExamMarksPage() {
  const [isMarksAdded, setIsMarksAdded] = useState(true);
  const [classes, setClasses] = useState<IClass[]>([]);
  const [exams, setExams] = useState<IExam[]>([]);
  const [subjects, setSubjects] = useState<IExamSubjectWithSubject[]>([]);
  const [examMarks, setExamMarks] = useState<IExamMarkWithStudentAndSubject[]>(
    []
  );
  const ref = {
    classId: useRef({} as HTMLSelectElement),
    sectionId: useRef({} as HTMLSelectElement),
    examId: useRef({} as HTMLSelectElement),
    subjectId: useRef({} as HTMLSelectElement),
  };

  const handleOnClassChange = () => {
    const classId = Number(ref.classId.current.value);
    if (!classId) return;

    tauriServices.exams
      .getClassExams(classId)
      .then((data) => setExams(data));
  };
  const handleOnExamChange = () => {
    const examId = Number(ref.examId.current.value);
    if (!examId) return;

    tauriServices.examSubjects
      .getExamSubjects(examId)
      .then((data) => setSubjects(data));
  };

  const handleOnSearch = async (e: FormEvent) => {
    e.preventDefault();

    setIsMarksAdded(true);
    setExamMarks([]);

    const data = {
      classId: Number(ref.classId.current.value),
      examId: Number(ref.examId.current.value),
      subjectId: Number(ref.subjectId.current.value),
    };

    if (isInvalidObject(data)) return;

    const isAdded = await tauriServices.examMarks.isClassSubjectExamMarksAdded(
      data.classId,
      data.subjectId,
      data.examId
    );

    setIsMarksAdded(isAdded);

    if (!isAdded) return;

    tauriServices.examMarks
      .getClassSubjectExamMarks(data.subjectId, data.examId)
      .then((data) => setExamMarks(data));
  };

  useEffect(() => handleOnExamChange(), [exams]);

  useEffect(() => handleOnClassChange(), [classes]);

  useEffect(() => {
    tauriServices.schoolClasses
      .getSchoolClasses()
      .then((data) => setClasses(data));
  }, []);

  return {
    classes,
    exams,
    subjects,
    examMarks,
    isMarksAdded,
    ref,
    handleOnClassChange,
    handleOnExamChange,
    handleOnSearch,
  };
}
