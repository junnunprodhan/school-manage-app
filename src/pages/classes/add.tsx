import { FormEvent, useRef, useState } from "react";
import { MainLayout } from "../../components/layouts";
import { InputField } from "../../components/ui/Field";
import SelectedItem from "../../components/ui/SelectedItem";
import { DataForm } from "../../components/ui";
import tauriServices from "../../services/tauriServices";
import { useNavigate } from "react-router-dom";

export default function AddClassPage() {
  const { ref, sections, handleAddSection, handleReomveSection, handleOnSubmit } = useAddClassPage();

  return (
    <MainLayout name="Add Class" back="/classes">
      <DataForm.DataForm onSubmit={handleOnSubmit}>
        <DataForm.Section name="Class Info">
          <DataForm.SubSection>
            <InputField label="Class Name" id="className" required placeholder="Class Ten" ref={ref.className} />
          </DataForm.SubSection>
        </DataForm.Section>

        <DataForm.Section name="Section Info" className="hidden">
          <DataForm.SubSection>
            <InputField label="Section Name" id="sectionName" placeholder="Section A" ref={ref.sectionName} />
          </DataForm.SubSection>
          <DataForm.SubSection>
            <DataForm.Button type="button" onClick={handleAddSection}>
              Add Section
            </DataForm.Button>
          </DataForm.SubSection>
        </DataForm.Section>

        <DataForm.Section name="Selected Sections" className="hidden">
          <DataForm.SubSection>
            {sections.map((item) => (
              <SelectedItem name={item} onDelete={() => handleReomveSection(item)} key={item} />
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

function useAddClassPage() {
  const navigation = useNavigate();
  const [sections, setSections] = useState<Array<string>>([]);
  const ref = {
    className: useRef({} as HTMLInputElement),
    sectionName: useRef({} as HTMLInputElement),
  };

  const handleAddSection = () => {
    const data = ref.sectionName.current.value;

    if (!data) return;

    setSections((pre) => [...pre, data]);
  };

  const handleReomveSection = (sectionName: string) => {
    setSections((pre) => pre.filter((item) => item !== sectionName));
  };

  const handleOnSubmit = (e: FormEvent) => {
    e.preventDefault();

    const data = {
      name: ref.className.current.value,
    };

    tauriServices.classes.addClass(data.name).then(() => navigation("/classes"));
  };

  return { ref, sections, handleAddSection, handleReomveSection, handleOnSubmit };
}
