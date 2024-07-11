import { FormEvent, useEffect, useRef, useState } from "react";
import { MainLayout } from "../../components/layouts";
import { InputField, SelectField } from "../../components/ui/Field";
import tauriServices from "../../services/tauriServices";
import { classesToSelectOptions, classSectionsToSelectOptions } from "../../utils";
import { isInvalidObject } from "../../utils/validation";
import { DataForm } from "../../components/ui";
import { IClass } from "../../services/tauriServices/classes";
import { useNavigate } from "react-router-dom";

export default function AddExamPage() {
  const { classes, ref, handleOnSubmit } = useAddExamPage();

  return (
    <MainLayout name="Add Exam" back="/exams">
      <DataForm.DataForm onSubmit={handleOnSubmit}>
        <DataForm.Section name="Exam Info">
          <DataForm.SubSection>
            <InputField label="Exam Name" id="examName" required placeholder="Half Yearly" ref={ref.name} />
            <InputField label="Starting Date" id="examStarted" type="date" required placeholder="125" ref={ref.started} />
          </DataForm.SubSection>
        </DataForm.Section>

        <DataForm.Section name="Class Info">
          <DataForm.SubSection>
            <SelectField label="Class Name" id="className" options={classesToSelectOptions(classes)} required ref={ref.classId} />
            <SelectField
              label="Section Name"
              id="sectionName"
              options={classSectionsToSelectOptions()}
              ref={ref.sectionId}
              hidden
            />
          </DataForm.SubSection>
        </DataForm.Section>

        <DataForm.Section>
          <DataForm.Button type="submit">Submit</DataForm.Button>
        </DataForm.Section>
      </DataForm.DataForm>
    </MainLayout>
  );
}

function useAddExamPage() {
  const navigation = useNavigate();
  const [classes, setClasses] = useState<IClass[]>([]);
  const ref = {
    name: useRef({} as HTMLInputElement),
    started: useRef({} as HTMLInputElement),

    classId: useRef({} as HTMLSelectElement),
    sectionId: useRef({} as HTMLSelectElement),
  };

  const handleOnSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const data = {
      name: ref.name.current.value,
      started: ref.started.current.value,
      classId: Number(ref.classId.current.value),
    };

    if (isInvalidObject(data)) return;

    tauriServices.exams.createExam(data.name, data.started, data.classId).then(() => navigation("/exams"));
  };

  useEffect(() => {
    tauriServices.schoolClasses.getSchoolClasses().then((data) => setClasses(data));
  }, []);

  return { classes, ref, handleOnSubmit };
}
