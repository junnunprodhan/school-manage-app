import { FormEvent, useEffect, useRef, useState } from "react";
import { MainLayout } from "../../components/layouts";
import { InputField, ImageField, SelectField } from "../../components/ui/Field";
import tauriServices from "../../services/tauriServices";
import { classesToSelectOptions, classSectionsToSelectOptions } from "../../utils";
import { DataForm } from "../../components/ui";
import { IClass } from "../../services/tauriServices/classes";
import { useNavigate } from "react-router-dom";
import { GENDERS } from "../../constances";

export default function AddTeacherPage() {
  const { classes, ref, handleOnSubmit } = useAddTeacherPage();

  return (
    <MainLayout name="Add Teacher" back="/teachers">
      <DataForm.DataForm onSubmit={handleOnSubmit}>
        <DataForm.Section name="Teacher Info">
          <DataForm.SubSection>
            <ImageField label="Teacher Image" id={"teacherImg"} onUpload={(name) => ref.imgName.current = name} ref={ref.img} />
            <InputField label="Teacher Name" id="teacherName" required placeholder="Md Example" ref={ref.name} />
          </DataForm.SubSection>

          <DataForm.SubSection name="Class Info" variant="grid" className="hidden">
            <SelectField label="Class Name" id="className" options={classesToSelectOptions(classes)} ref={ref.classId} />
            <SelectField
              label="Section Name"
              id="sectionName"
              options={classSectionsToSelectOptions()}
              ref={ref.sectionId}
              hidden
            />
          </DataForm.SubSection>

          <DataForm.SubSection name="About Info" variant="grid">
            <SelectField label="Gender" id="teacherGender" options={GENDERS} required ref={ref.gender} />
            <InputField label="Date Of Birth" id="teacherBirth" type="date" required ref={ref.birth} />
          </DataForm.SubSection>

          <DataForm.SubSection name="Contact Info">
            <InputField label="Number" id="teacherNumber" required placeholder="+880 1234 567890" ref={ref.number} />
            <InputField label="Address" id="teacherAddress" required placeholder="Dhaka, Bangladesh" ref={ref.address} />
          </DataForm.SubSection>

          <DataForm.SubSection name="Login Info">
            <InputField label="Email" id="teacherEmail" required placeholder="example@mail.com" ref={ref.email} />
            <InputField label="Password" id="teacherPassword" type="password" required placeholder="*******" ref={ref.password} />
          </DataForm.SubSection>
        </DataForm.Section>

        <DataForm.Section>
          <DataForm.Button type="submit">Submit</DataForm.Button>
        </DataForm.Section>
      </DataForm.DataForm>
    </MainLayout>
  );
}

function useAddTeacherPage() {
  const navigation = useNavigate();
  const [classes, setClasses] = useState<IClass[]>([]);
  const ref = {
    name: useRef({} as HTMLInputElement),
    imgName: useRef(""),
    img: useRef({} as HTMLInputElement),

    classId: useRef({} as HTMLSelectElement),
    sectionId: useRef({} as HTMLSelectElement),
    studentId: useRef({} as HTMLSelectElement),

    gender: useRef({} as HTMLSelectElement),
    birth: useRef({} as HTMLInputElement),
    email: useRef({} as HTMLInputElement),
    number: useRef({} as HTMLInputElement),
    address: useRef({} as HTMLInputElement),
    password: useRef({} as HTMLInputElement),


  };

  const handleOnClassChange = () => {
    //
  };

  const handleOnSubmit = (e: FormEvent) => {
    e.preventDefault();

    let data = {
      name: ref.name.current.value,

      imgName: ref.imgName.current,
      img: ref.img.current.value,

      classId: Number(ref.classId.current.value),
      sectionId: Number(ref.sectionId.current.value),
      studentId: Number(ref.studentId.current.value),

      gender: ref.gender.current.value,
      birth: ref.birth.current.value,
      number: ref.number.current.value,
      address: ref.address.current.value,

      email: ref.email.current.value,
      password: ref.password.current.value,
    };

    // teacher img
    tauriServices.images.uploadImage(data.imgName, data.img)
      .then(filename => data.img = filename)
      // teacher data
      .then(() => tauriServices.teachers
        .addTeacher(data.name, data.img, data.birth, data.gender, data.address, data.number, data.email, data.password)
      )
      .then(() => navigation("/teachers"));
  };

  useEffect(() => handleOnClassChange(), [classes]);

  useEffect(() => {
    tauriServices.schoolClasses
      .getSchoolClasses()
      .then((data) => setClasses(data))
      .then(() => handleOnClassChange());
  }, []);

  return { classes, ref, handleOnSubmit };
}
