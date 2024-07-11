import { FormEvent, useEffect, useRef, useState } from "react";
import { MainLayout } from "../../../components/layouts";
import { InputField, SelectField } from "../../../components/ui/Field";
import tauriServices from "../../../services/tauriServices";
import {
  classesToSelectOptions,
  classSectionsToSelectOptions,
} from "../../../utils";
import SelectedItem from "../../../components/ui/SelectedItem";
import { DataForm } from "../../../components/ui";
import { IClass } from "../../../services/tauriServices/classes";
import { useNavigate } from "react-router-dom";

export default function AddClassSubjectPage() {
  const {
    classes,
    subjects,
    ref,
    handleAddSubject,
    handleReomveSubject,
    handleOnSubmit,
  } = useAddClassSubjectPage();

  return (
    <MainLayout name="Add Class Subjects" back="/classes">
      <DataForm.DataForm onSubmit={handleOnSubmit}>
        <DataForm.Section name="Class Info">
          <DataForm.SubSection>
            <SelectField
              label="Class Name"
              id="className"
              options={classesToSelectOptions(classes)}
              required
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
        </DataForm.Section>

        <DataForm.Section name="Subject Info">
          <DataForm.SubSection name="Subject Info" variant="grid">
            <InputField
              label="Subject Name"
              id="subjectName"
              placeholder="Bengali"
              required
              ref={ref.subjectName}
            />
            <InputField
              label="Subject Code"
              id="subjectName"
              placeholder="155"
              required
              ref={ref.subjectCode}
            />
          </DataForm.SubSection>
          <DataForm.SubSection>
            <DataForm.Button type="button" onClick={handleAddSubject}>
              Add Subject
            </DataForm.Button>
          </DataForm.SubSection>
        </DataForm.Section>

        <DataForm.Section name="Selected Subjects">
          <DataForm.SubSection>
            <DataForm.SubSection>
              {subjects.length === 0 && <>No subject is selected.</>}

              {subjects.map((item) => (
                <SelectedItem
                  name={item.subjectName}
                  header={[
                    { id: "code", name: "Code: ", value: item.subjectCode },
                  ]}
                  onDelete={() => handleReomveSubject(item.subjectName)}
                  key={item.subjectName}
                />
              ))}
            </DataForm.SubSection>
          </DataForm.SubSection>
        </DataForm.Section>

        <DataForm.Section>
          <DataForm.Button type="button" onClick={handleOnSubmit}>Submit</DataForm.Button>
        </DataForm.Section>
      </DataForm.DataForm>
    </MainLayout>
  );
}

interface ISelectedSubject { subjectName: string; subjectCode: number }

function useAddClassSubjectPage() {
  const navigation = useNavigate();
  const [classes, setClasses] = useState<IClass[]>([]);
  const [subjects, setSubjects] = useState<ISelectedSubject[]>([]);

  const ref = {
    classId: useRef({} as HTMLSelectElement),
    sectionId: useRef({} as HTMLSelectElement),
    subjectName: useRef({} as HTMLInputElement),
    subjectCode: useRef({} as HTMLInputElement),
  };

  const handleAddSubject = () => {
    const data = {
      subjectName: ref.subjectName.current.value,
      subjectCode: Number(ref.subjectCode.current.value),
    };

    if (!data.subjectName || !data.subjectCode) return;

    setSubjects((pre) => [...pre, data]);
  };

  const handleReomveSubject = (subjectName: string) => {
    setSubjects((pre) =>
      pre.filter((item) => item.subjectName !== subjectName)
    );
  };

  const mappedSubjects = () => {
    return subjects.map((item) => [
      item.subjectName,
      item.subjectCode,
    ]) as [string, number][];
  }

  const handleOnSubmit = (e: FormEvent) => {
    e.preventDefault();

    const data = {
      classId: Number(ref.classId.current.value),
      subjects: mappedSubjects(),
    };

    tauriServices.classSubjects
      .addClassSubjects(data.subjects, data.classId)
      .then(() => navigation("/classes"));
  };

  useEffect(() => {
    tauriServices.schoolClasses
      .getSchoolClasses()
      .then((data) => setClasses(data));
  }, []);

  return {
    classes,
    ref,
    subjects,
    handleAddSubject,
    handleReomveSubject,
    handleOnSubmit,
  };
}
