import { FormEvent, useEffect, useRef, useState } from "react";
import { MainLayout } from "../../../components/layouts";
import { InputField, SelectField } from "../../../components/ui/Field";
import tauriServices from "../../../services/tauriServices";
import {
  classesToSelectOptions,
  classSectionsToSelectOptions,
} from "../../../utils";
import { isInvalidObject } from "../../../utils/validation";
import SelectedItem from "../../../components/ui/SelectedItem";
import { DataForm } from "../../../components/ui";
import { IClass } from "../../../services/tauriServices/classes";
import { IExam } from "../../../services/tauriServices/exams";
import { IClassSubject } from "../../../services/tauriServices/classSubjects";
import { useNavigate } from "react-router-dom";

export default function AddExamSubjectPage() {
  const {
    classes,
    exams,
    subjects,
    selectedSubjects,
    ref,
    handleAddExamSubject,
    handleReomveExamSubject,
    handleOnClassChange,
    handleOnSubmit,
  } = useAddExamSubjectPage();

  return (
    <MainLayout name="Add Exam Subjects" back="/exams">
      <DataForm.DataForm onSubmit={handleOnSubmit}>
        <DataForm.Section name="Exam Info">
          <DataForm.SubSection name="Class Info">
            <SelectField
              label="Class Name"
              id="className"
              options={classesToSelectOptions(classes)}
              required
              onChange={handleOnClassChange}
              ref={ref.classId}
            />
            <SelectField
              label="Section Name"
              id="sectionName"
              options={classSectionsToSelectOptions()}
              ref={ref.sectionId}
              hidden
            />
          </DataForm.SubSection>
          <DataForm.SubSection name="Exam Info">
            <SelectField
              label="Exam Name"
              id="examName"
              options={exams.map((item) => ({
                name: item.name,
                value: item.id,
              }))}
              required
              ref={ref.examId}
            />
          </DataForm.SubSection>
        </DataForm.Section>

        <DataForm.Section name="Subject Info">
          <DataForm.SubSection name="Subject Info">
            <SelectField
              label="Subject Name"
              id="subjectName"
              options={subjects.map((item) => ({
                name: item.name,
                value: item.id,
              }))}
              required
              ref={ref.subjectId}
            />
          </DataForm.SubSection>
          <DataForm.SubSection name="Marks Info" variant="grid">
            <InputField
              label="Objective Mark"
              id="objectiveMark"
              required
              placeholder="155"
              ref={ref.objectiveMark}
            />
            <InputField
              label="Subjective Mark"
              id="subjectiveMark"
              required
              placeholder="155"
              ref={ref.subjectiveMark}
            />
            <InputField
              label="Practical Mark"
              id="practicalMark"
              required
              placeholder="155"
              ref={ref.practicalMark}
            />
          </DataForm.SubSection>
          <DataForm.SubSection name="Date Info" variant="grid">
            <InputField label="From" id="subjectFrom" type="time" required />
            <InputField label="To" id="subjectTo" type="time" required />
            <InputField
              label="Started At"
              id="subjectStartedAt"
              type="date"
              required
              ref={ref.started}
            />
          </DataForm.SubSection>
          <DataForm.SubSection>
            <DataForm.Button type="button" onClick={handleAddExamSubject}>
              Add Subject
            </DataForm.Button>
          </DataForm.SubSection>
        </DataForm.Section>

        <DataForm.Section name="Selected Subjects">
          <DataForm.SubSection>
            {selectedSubjects.map((item) => (
              <SelectedItem
                name={item.subjectName}
                header={[
                  {
                    id: "objectiveMark",
                    name: "Objective:",
                    value: item.objectiveMark,
                  },
                  {
                    id: "subjectiveMark",
                    name: "Subjective:",
                    value: item.subjectiveMark,
                  },
                  {
                    id: "practicalMark",
                    name: "Practical:",
                    value: item.practicalMark,
                  },
                ]}
                footer={[
                  { id: "date", name: "Started:", value: "2024/05/12" },
                  { id: "time", name: "Time:", value: "10:00 - 12:00" },
                ]}
                onDelete={() => handleReomveExamSubject(item.subjectId)}
                key={item.subjectId}
              />
            ))}
          </DataForm.SubSection>
        </DataForm.Section>

        <DataForm.Section>
          <DataForm.Button type="submit">Submit</DataForm.Button>
        </DataForm.Section>
      </DataForm.DataForm>
    </MainLayout>
  );
}

interface ISelectedExamSubject {
  subjectName: string;
  subjectId: number;
  objectiveMark: number;
  subjectiveMark: number;
  practicalMark: number;
}

function useAddExamSubjectPage() {
  const navigation = useNavigate();
  const [classes, setClasses] = useState<IClass[]>([]);
  const [exams, setExams] = useState<IExam[]>([]);
  const [subjects, setSubjects] = useState<IClassSubject[]>([]);
  const [selectedSubjects, setSelectedSubjects] = useState<
    ISelectedExamSubject[]
  >([]);
  const ref = {
    classId: useRef({} as HTMLSelectElement),
    examId: useRef({} as HTMLSelectElement),
    sectionId: useRef({} as HTMLSelectElement),
    subjectId: useRef({} as HTMLSelectElement),

    objectiveMark: useRef({} as HTMLInputElement),
    subjectiveMark: useRef({} as HTMLInputElement),
    practicalMark: useRef({} as HTMLInputElement),
    started: useRef({} as HTMLInputElement),
  };

  const handleAddExamSubject = () => {
    const data = {
      subjectName: subjects.find(
        (item) => item.id === Number(ref.subjectId.current.value)
      )!.name,
      subjectId: Number(ref.subjectId.current.value),
      objectiveMark: Number(ref.objectiveMark.current.value),
      subjectiveMark: Number(ref.subjectiveMark.current.value),
      practicalMark: Number(ref.practicalMark.current.value),
    };

    if (
      data.subjectName === "" ||
      (data.objectiveMark === 0 &&
        data.subjectiveMark === 0 &&
        data.practicalMark === 0)
    )
      return;

    setSelectedSubjects((pre) => [...pre, data]);
  };

  const handleReomveExamSubject = (subjectId: number) => {
    setSelectedSubjects((pre) =>
      pre.filter((item) => item.subjectId !== subjectId)
    );
  };

  const handleOnClassChange = () => {
    const data = {
      classId: Number(ref.classId.current.value),
    };

    if (!data.classId) return;

    tauriServices.exams
      .getClassExams(data.classId)
      .then((data) => setExams(data));

    tauriServices.classSubjects
      .getClassSubjects(data.classId)
      .then((data) => setSubjects(data));
  };

  const handleOnSubmit = (e: FormEvent) => {
    e.preventDefault();

    const mappedSelectedSubjects = selectedSubjects.map((item) => [
      item.objectiveMark,
      item.subjectiveMark,
      item.practicalMark,
      item.subjectId,
    ]) as [number, number, number, number][];

    const data = {
      classId: Number(ref.classId.current.value),
      examId: Number(ref.examId.current.value),
      subjectId: Number(ref.subjectId.current.value),
      objectiveMark: Number(ref.objectiveMark.current.value),
      subjectiveMark: Number(ref.subjectiveMark.current.value),
      practicalMark: Number(ref.practicalMark.current.value),
      started: Number(ref.started.current.value),

      selectedSubjects: mappedSelectedSubjects,
    };

    if (isInvalidObject(data)) return;

    tauriServices.examSubjects
      .addExamSubjects(data.selectedSubjects, data.examId)
      .then(() => navigation("/exams"));
  };

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
    selectedSubjects,
    ref,
    handleAddExamSubject,
    handleReomveExamSubject,
    handleOnClassChange,
    handleOnSubmit,
  };
}
