import { useRef, useState, useEffect, FormEvent } from "react";
import { MainLayout } from "../../components/layouts";
import tauriServices from "../../services/tauriServices";
import { Table } from "../../components/ui";
import { isInvalidObject } from "../../utils/validation";
import { Filter, FilterSelectItem } from "../../components/ui/Filter";
import { IClass } from "../../services/tauriServices/classes";
import { IExamSubjectWithSubject } from "../../services/tauriServices/examSubjects";
import { IExamMarkWithSubject } from "../../services/tauriServices/examMarks";
import { IExam } from "../../services/tauriServices/exams";
import {
  classSectionsToSelectOptions,
  classesToSelectOptions,
} from "../../utils";
import { IStudent } from "../../services/tauriServices/students";
import { CustomDate } from "../../utils/date";

export default function GetStudentExamMarksPage() {
  const {
    classes,
    exams,
    subjects,
    students,
    examMarks,
    ref,
    handleOnClassChange,
    handleOnExamChange,
    handleOnSearch,
  } = useGetExamMarksPage();

  return (
    <MainLayout name={`Student Exam Marks`}>
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
          </Filter.SubSection>
        </Filter.Section>
        
        <Filter.Section>
          <Filter.SubSection>
            <FilterSelectItem
              label="Student"
              id="studentId"
              options={students.map((item) => ({
                name: item.name,
                value: item.id,
              }))}
              onChange={handleOnExamChange}
              ref={ref.studentId}
            />
          </Filter.SubSection>
          <Filter.SubSection>
            <Filter.Button type="submit" children="Search" />
          </Filter.SubSection>
        </Filter.Section>
      </Filter.Filter>


      <Table.Table
        head={["Subject", "Objective", "Subjective", "Practical", "Total Mark"]}
        data={examMarks}
        renderItem={(item, index) => (
          <Table.Row key={index}>
            <Table.Col key={"subject"}>{item.subject_name} ({item.subject_code})</Table.Col>
            <Table.Col key={"objective_mark"}>{item.objective_mark}</Table.Col>
            <Table.Col key={"subjective_mark"}>{item.subjective_mark}</Table.Col>
            <Table.Col key={"practical_mark"}>{item.practical_mark}</Table.Col>
            <Table.Col key={"total_mark"}>{item.objective_mark + item.subjective_mark + item.practical_mark}</Table.Col>
          </Table.Row>
        )}
      />

    </MainLayout>
  );
}

function useGetExamMarksPage() {
  const [classes, setClasses] = useState<IClass[]>([]);
  const [students, setStudents] = useState<IStudent[]>([]);
  const [exams, setExams] = useState<IExam[]>([]);
  const [subjects, setSubjects] = useState<IExamSubjectWithSubject[]>([]);
  const [examMarks, setExamMarks] = useState<IExamMarkWithSubject[]>(
    []
  );
  const ref = {
    classId: useRef({} as HTMLSelectElement),
    sectionId: useRef({} as HTMLSelectElement),
    examId: useRef({} as HTMLSelectElement),
    subjectId: useRef({} as HTMLSelectElement),
    studentId: useRef({} as HTMLSelectElement),
  };

  const handleOnClassChange = () => {
    const classId = Number(ref.classId.current.value);
    if (!classId) return;

    tauriServices.exams
      .getClassExams(classId)
      .then((data) => setExams(data));
    
    tauriServices.classStudents
    .getClassStudents(classId, new CustomDate().year())
    .then((data) => setStudents(data));
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

    setExamMarks([]);

    const data = {
      classId: Number(ref.classId.current.value),
      examId: Number(ref.examId.current.value),
      studentId: Number(ref.subjectId.current.value),
    };

    if (isInvalidObject(data)) return;

    tauriServices.examMarks
      .getStudentExamMarks(data.studentId, data.examId)
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
    students,
    exams,
    subjects,
    examMarks,
    ref,
    handleOnClassChange,
    handleOnExamChange,
    handleOnSearch,
  };
}
