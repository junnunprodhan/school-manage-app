import { useState, useEffect } from "react";
import { MainLayout } from "../../components/layouts";
import { InputField, ImageField } from "../../components/ui/Field";
import tauriServices from "../../services/tauriServices";
import { Link, useParams } from "react-router-dom";
import { DataForm } from "../../components/ui";
import { IStudent } from "../../services/tauriServices/students";
import { IStudentClass } from "../../services/tauriServices/classStudents";
import { IAbout } from "../../services/tauriServices/abouts";
import { CustomDate } from "../../utils/date";

export default function GetStudentPage() {
  const params = useParams<any>();
  const { student, about, classData } = useGetStudentPage(Number(params.studentId));

  return (
    <MainLayout name={student?.name} back="/students">
      <DataForm.DataForm>
        <DataForm.Section name="Student Info">
          <DataForm.SubSection name="">
            <ImageField label="Student Image" id={"studentImg"} src={student?.img} disabled />
            <InputField label="Student Name" id={"studentName"} placeholder="Md Example" value={student?.name} disabled />
          </DataForm.SubSection>
          <DataForm.SubSection name="Class Info" variant="grid">
            <InputField label="Class Name" id={"className"} value={classData?.name} disabled />
            <InputField label="Section Name" id={"sectionName"} value={classData?.section} disabled hidden />
            <InputField label="Class Roll" id="classRoll" type="number" placeholder="10" value={classData?.roll} disabled />
            <InputField
              label="Section Roll"
              id="sectionRoll"
              type="number"
              placeholder="10"
              value={classData?.section_roll}
              disabled
              hidden
            />
          </DataForm.SubSection>
          <DataForm.SubSection name="About Info" variant="grid">
            <InputField label="Gender" id="studentGender" value={about?.gender} disabled />
            <InputField label="Date Of Birth" id="studentBirth" type="date" value={about && CustomDate.to_input(about.birth)} disabled />
          </DataForm.SubSection>
          <DataForm.SubSection name="Contact Info">
            <InputField label="Number" id="studentNumber" placeholder="+880 1234 567890" value={about?.number} disabled />
            <InputField label="Address" id="studentAddress" placeholder="Dhaka, Bangladesh" value={about?.address} disabled />
          </DataForm.SubSection>
          <DataForm.SubSection name="Login Info">
            <InputField label="Email" id="studentEmail" placeholder="example@mail.com" value={about?.email} disabled />
          </DataForm.SubSection>
        </DataForm.Section>
        <DataForm.Section name="Parent Info">
          <DataForm.SubSection name="">
            <Link to={`/parents/student/${student?.id}`}>View Parent</Link>
          </DataForm.SubSection>
        </DataForm.Section>
      </DataForm.DataForm>
    </MainLayout>
  );
}

function useGetStudentPage(studentId: number) {
  const [student, setStudent] = useState<IStudent | undefined>();
  const [classData, setClassData] = useState<IStudentClass | undefined>();
  const [about, setAbout] = useState<IAbout | undefined>();

  useEffect(() => {
    tauriServices.students
      .getStudent(studentId)
      .then((data) => {
        setStudent(data);
        return tauriServices.abouts.getAbout(data.about_id);
      })
      .then((data) => setAbout(data));

    tauriServices.classStudents
      .getStudentClass(studentId, new CustomDate().year())
      .then((data) => setClassData(data));
  }, []);

  return { student, classData, about };
}
