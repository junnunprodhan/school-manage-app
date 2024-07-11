import { useState, useEffect } from "react";
import { MainLayout } from "../../components/layouts";
import { InputField, ImageField } from "../../components/ui/Field";
import tauriServices from "../../services/tauriServices";
import { useParams } from "react-router-dom";
import { DataForm } from "../../components/ui";
import { ITeacher } from "../../services/tauriServices/teachers";
import { IAbout } from "../../services/tauriServices/abouts";
import { CustomDate } from "../../utils/date";

export default function GetTeacherPage() {
  const params = useParams<any>();
  const { teacher, about } = useGetTeacherPage(Number(params.teacherId));

  return (
    <MainLayout name={teacher?.name} back={"/teachers"}>
      <DataForm.DataForm>
        <DataForm.Section name="Teacher Info">
          <DataForm.SubSection>
            <ImageField
              label="Teacher Image"
              id={"teacherImg"}
              src={teacher?.img}
              disabled
            />
            <InputField
              label="Teacher Name"
              id="teacherName"
              placeholder="Md Example"
              value={teacher?.name}
              disabled
            />
          </DataForm.SubSection>
          <DataForm.SubSection
            name="Teacher Info"
            variant="grid"
            className="hidden"
          >
            <InputField
              label="Class Name"
              id="className"
              value="---"
              disabled
            />
            <InputField
              label="Section Name"
              id="sectionName"
              value={"---"}
              disabled
            />
          </DataForm.SubSection>
          <DataForm.SubSection name="About Info" variant="grid">
            <InputField
              label="Gender"
              id="teacherGender"
              value={about?.gender}
              disabled
            />
            <InputField
              label="Date Of Birth"
              id="teacherBirth"
              type="date"
              value={about && CustomDate.to_input(about.birth)}
              disabled
            />
          </DataForm.SubSection>
          <DataForm.SubSection name="Contact Info">
            <InputField
              label="Number"
              id="teacherNumber"
              placeholder="+880 1234 567890"
              value={about?.number}
              disabled
            />
            <InputField
              label="Address"
              id="teacherAddress"
              placeholder="Dhaka, Bangladesh"
              value={about?.address}
              disabled
            />
          </DataForm.SubSection>
          <DataForm.SubSection name="Login Info">
            <InputField
              label="Email"
              id="teacherEmail"
              placeholder="example@mail.com"
              value={about?.email}
              disabled
            />
          </DataForm.SubSection>
        </DataForm.Section>
      </DataForm.DataForm>
    </MainLayout>
  );
}

function useGetTeacherPage(teacherId: number) {
  const [teacher, setTeacher] = useState<ITeacher | undefined>();
  const [about, setAbout] = useState<IAbout | undefined>();

  useEffect(() => {
    tauriServices.teachers
      .getTeacher(teacherId)
      .then((data) => {
        setTeacher(data);
        return tauriServices.abouts.getAbout(data.about_id);
      })
      .then((data) => setAbout(data));
  }, []);

  return { teacher, about };
}
