import { FormEvent, useEffect, useRef, useState } from "react";
import { MainLayout } from "../../components/layouts";
import tauriServices from "../../services/tauriServices";
import { EmptyData, Table } from "../../components/ui";
import { Filter, FilterSelectItem } from "../../components/ui/Filter";
import { IClass } from "../../services/tauriServices/classes";
import { IExam } from "../../services/tauriServices/exams";
import { IStudent } from "../../services/tauriServices/students";
import {
  classSectionsToSelectOptions,
  classesToSelectOptions,
} from "../../utils";
import { IExamSubjectWithSubject } from "../../services/tauriServices/examSubjects";
import { CustomDate } from "../../utils/date";
import { isInvalidObject } from "../../utils/validation";
import { useNavigate } from "react-router-dom";

export default function AddExamMarksPage() {
  const {
    classes,
    exams,
    subjects,
    students,
    isMarksAdded,
    isUpdateMarks,
    marks,
    ref,
    handleOnClassChange,
    handleOnExamChange,
    handleOnSearch,
    handleOnAddMarks,
    handleOnUpdateMarks,
    handleWantToUpdateMarks,
  } = useAddExamMarksPage();

  return (
    <MainLayout name="Add Exam Marks" back="/exam-marks">
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


      {isMarksAdded && !isUpdateMarks ? (
        <EmptyData name="Already Added">
          <button
            type="button"
            className="btn btn-success"
            onClick={handleWantToUpdateMarks}
          >
            Update Marks
          </button>
        </EmptyData>
      ) : (
        <>
          <Table.Table
            data={students}
            head={[
              "Id",
              "Student Name",
              "Objective Mark",
              "Subjective Mark",
              "Practical Mark",
            ]}
            renderItem={(item) => (
              <Table.Row key={item.id}>
                <Table.Col key={"studetnId"}>{item.id}</Table.Col>
                <Table.Col key={"studentName"}>{item.name}</Table.Col>
                <Table.Col key={"objectiveMark"}>
                  <input
                    className="w-full h-9 px-2 bg-transparent outline-none rounded-md hover:bg-white/30 focus-within:bg-white/30"
                    placeholder="Mark"
                    defaultValue={marks.current[item.id].objectiveMark}
                    min={0}
                    max={100}
                    onChange={(e) => {
                      marks.current[item.id]["objectiveMark"] = Number(e.currentTarget.value);
                    }}
                  />
                </Table.Col>
                <Table.Col key={"subjectiveMark"}>
                  <input
                    className="w-full h-9 px-2 bg-transparent outline-none rounded-md hover:bg-white/30 focus-within:bg-white/30"
                    placeholder="Mark"
                    defaultValue={marks.current[item.id].subjectiveMark}
                    min={0}
                    max={100}
                    onChange={(e) => {
                      marks.current[item.id]["subjectiveMark"] = Number(e.currentTarget.value);
                    }}
                  />
                </Table.Col>
                <Table.Col key={"practicalMark"}>
                  <input
                    className="w-full h-9 px-2 bg-transparent outline-none rounded-md hover:bg-white/30 focus-within:bg-white/30"
                    placeholder="Mark"
                    defaultValue={marks.current[item.id].practicalMark}
                    min={0}
                    max={100}
                    onChange={(e) => {
                      marks.current[item.id]["practicalMark"] = Number(e.currentTarget.value);
                    }}
                  />
                </Table.Col>
                
              </Table.Row>
            )}
          />
          

          <div className="flex items-center justify-center">
            {isUpdateMarks ? (
              <button
                type="button"
                className="btn btn-transparent"
                onClick={handleOnUpdateMarks}
              >
                Update Marks
              </button>
            ) : students.length !== 0 ? (
              <button
                type="button"
                className="btn btn-transparent"
                onClick={handleOnAddMarks}
              >
                Add Marks
              </button>
            ) : null}
          </div>
        </>
      )}
    </MainLayout>
  );
}

interface IStudentExamMarkInput {
  objectiveMark: number;
  subjectiveMark: number;
  practicalMark: number;
}

function useAddExamMarksPage() {
  const navigation = useNavigate();
  const [isMarksAdded, setIsMarksAdded] = useState(false);
  const [isUpdateMarks, setIsUpdateMarks] = useState(false);
  const [classes, setClasses] = useState<IClass[]>([]);
  const [exams, setExams] = useState<IExam[]>([]);
  const [students, setStudents] = useState<IStudent[]>([]);
  const [subjects, setSubjects] = useState<IExamSubjectWithSubject[]>([]);
  const marks = useRef<Record<number, IStudentExamMarkInput>>({});

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

  const handleWantToUpdateMarks = () => {
    setIsUpdateMarks(true);
  };

  const handleOnSearch = async (e: FormEvent) => {
    e.preventDefault();

    setIsMarksAdded(false);
    setIsUpdateMarks(false);
    setStudents([]);

    const data = {
      classId: Number(ref.classId.current.value),
      subjectId: Number(ref.subjectId.current.value),
      examId: Number(ref.examId.current.value),
      year: new CustomDate().year(),
    };

    if (!data.classId) return;

    const isAdded = await tauriServices.examMarks.isClassSubjectExamMarksAdded(
      data.classId,
      data.subjectId,
      data.examId
    );

    setIsMarksAdded(isAdded);

    if (isAdded) return;

    tauriServices.classStudents
      .getClassStudents(data.classId, data.year)
      .then((data) => {
        marks.current = {};

        data.forEach((item) => {
          marks.current[item.id] = { objectiveMark: 0, subjectiveMark: 0, practicalMark: 0 };
        });

        setStudents(data);
      });
  };

  const mappedMarks = () => {
    return Object.entries(marks.current).map(([studentId, item]) => [
      Number(item.objectiveMark),
      Number(item.subjectiveMark),
      Number(item.practicalMark),
      Number(studentId),
    ]) as [number, number, number, number][];
  }

  const handleOnAddMarks = () => {
    const data = {
      classId: Number(ref.classId.current.value),
      examId: Number(ref.examId.current.value),
      subjectId: Number(ref.subjectId.current.value),
      marks: mappedMarks(),
    };

    if (isInvalidObject(data)) return;

    tauriServices.examMarks
      .addClassSubjectExamMarks(data.marks, data.subjectId, data.examId)
      .then(() => navigation("/exam-marks"));
  };

  const handleOnUpdateMarks = () => {
    const data = {
      classId: Number(ref.classId.current.value),
      examId: Number(ref.examId.current.value),
      subjectId: Number(ref.subjectId.current.value),
      marks: mappedMarks(),
    };

    tauriServices.examMarks
      .updateClassSubjectExamMarks(data.marks, data.subjectId, data.examId)
      .then(() => navigation("/exam-marks"));
  };

  useEffect(() => {
    if (!isUpdateMarks) return;

    const data = {
      classId: Number(ref.classId.current.value),
      subjectId: Number(ref.subjectId.current.value),
      examId: Number(ref.examId.current.value),
      year: new CustomDate().year(),
    };

    if (isInvalidObject(data)) return;

    // Get previous marks value
    tauriServices.examMarks
      .getClassSubjectExamMarks(data.subjectId, data.examId)
      // previous marks
      .then((data) => {
        marks.current = {};

        data.forEach((item) => {
          marks.current[item.student_id] = {
            objectiveMark: item.objective_mark,
            subjectiveMark: item.subjective_mark,
            practicalMark: item.practical_mark,
          };
        });
      })
      // after marks had taken, if there is new students, their marks will be 0
      .then(() =>
        tauriServices.classStudents.getClassStudents(data.classId, data.year)
      )
      .then((data) => {
        // For if there is new studnets
        data.forEach((item) => {
          if (marks.current[item.id]) return;
          
          marks.current[item.id] = {
            objectiveMark: 0,
            subjectiveMark: 0,
            practicalMark: 0,
          };
        });

        setStudents(data);
      });
  }, [isUpdateMarks]);

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
    students,
    isMarksAdded,
    isUpdateMarks,
    marks,
    ref,
    handleOnClassChange,
    handleOnExamChange,
    handleWantToUpdateMarks,
    handleOnSearch,
    handleOnAddMarks,
    handleOnUpdateMarks,
  };
}
