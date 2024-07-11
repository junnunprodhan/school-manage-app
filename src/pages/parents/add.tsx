import { FormEvent, useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { MainLayout } from "../../components/layouts";
import { InputField, ImageField, SelectField } from "../../components/ui/Field";
import tauriServices from "../../services/tauriServices";
import {
  classesToSelectOptions,
  classSectionsToSelectOptions,
} from "../../utils";
import { isInvalidObject } from "../../utils/validation";
import { DataForm } from "../../components/ui";
import { IClass } from "../../services/tauriServices/classes";
import { IStudent } from "../../services/tauriServices/students";
import { GENDERS } from "../../constances";
import { CustomDate } from "../../utils/date";

export default function AddParentPage() {
  const { classes, students, ref, handleOnClassChange, handleOnSubmit } = useAddParentPage();

  return (
    <MainLayout name="Add Parent" back="/parents">
      <DataForm.DataForm onSubmit={handleOnSubmit}>
        <DataForm.Section name="Parent Info">
          <DataForm.SubSection>
            <ImageField label="Parent Image" id={"parentImg"} onUpload={(name) => ref.imgName.current = name} ref={ref.img} />
            <InputField
              label="Parent Name"
              id="parentName"
              placeholder="Md Example"
              required
              ref={ref.name}
            />
            <InputField
              label="Parent Profession"
              id="parentProfession"
              placeholder="Programmer"
              required
              ref={ref.profession}
            />
          </DataForm.SubSection>
          <DataForm.SubSection name="Student Info" variant="grid">
            <SelectField
              label="Class Name"
              id="className"
              options={classesToSelectOptions(classes)}
              onChange={handleOnClassChange}
              required
              ref={ref.classId}
            />
            <SelectField
              label="Section Name"
              id="sectionName"
              options={classSectionsToSelectOptions()}
              required
              ref={ref.sectionId}
              hidden
            />
            <SelectField
              label="Student Name"
              id="studentName"
              options={students.map((item) => ({
                name: item.name,
                value: item.id,
              }))}
              required
              ref={ref.studentId}
            />
          </DataForm.SubSection>
          <DataForm.SubSection name="About Info" variant="grid">
            <SelectField
              label="Gender"
              id="parentGender"
              options={GENDERS}
              required
              ref={ref.gender}
            />
            <InputField
              label="Date Of Birth"
              id="parentBirth"
              type="date"
              required
              ref={ref.birth}
            />
          </DataForm.SubSection>
          <DataForm.SubSection name="Contact Info">
            <InputField
              label="Number"
              id="parentNumber"
              placeholder="+880 1234 567890"
              required
              ref={ref.number}
            />
            <InputField
              label="Address"
              id="parentAddress"
              placeholder="Dhaka, Bangladesh"
              required
              ref={ref.address}
            />
          </DataForm.SubSection>
          <DataForm.SubSection name="Login Info">
            <InputField
              label="Email"
              id="parentEmail"
              placeholder="example@mail.com"
              required
              ref={ref.email}
            />
            <InputField
              label="Password"
              id="parentPassword"
              type="password"
              placeholder="*******"
              required
              ref={ref.password}
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

function useAddParentPage() {
  const navigation = useNavigate();
  const [classes, setClasses] = useState<IClass[]>([]);
  const [students, setStudents] = useState<IStudent[]>([]);
  const ref = {
    name: useRef({} as HTMLInputElement),
    imgName: useRef(""),
    img: useRef({} as HTMLInputElement),
    profession: useRef({} as HTMLInputElement),

    classId: useRef({} as HTMLSelectElement),
    sectionId: useRef({} as HTMLSelectElement),
    studentId: useRef({} as HTMLSelectElement),

    birth: useRef({} as HTMLInputElement),
    gender: useRef({} as HTMLSelectElement),
    address: useRef({} as HTMLInputElement),
    number: useRef({} as HTMLInputElement),

    email: useRef({} as HTMLInputElement),
    password: useRef({} as HTMLInputElement),
  };

  const handleOnClassChange = () => {
    if (!ref.classId.current.value) return;

    tauriServices.classStudents
      .getClassStudents(
        Number(ref.classId.current.value),
        new CustomDate().year()
      )
      .then((data) => setStudents(data));
  };

  const handleOnSubmit = (e: FormEvent) => {
    e.preventDefault();

    let data = {
      name: ref.name.current.value,
      imgName: ref.imgName.current,
      img: ref.img.current.value,
      profession: ref.profession.current.value,

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

    if (isInvalidObject(data)) return;
    

    // parent img
    tauriServices.images.uploadImage(data.imgName, data.img)
      .then(filename =>  data.img = filename)
      // parent data
      .then(() => tauriServices.parents
        .addParent(
          data.name,
          data.img,
          data.profession,
          data.birth,
          data.gender,
          data.address,
          data.number,
          data.email,
          data.password,
          data.studentId
        )
      )
      .then(() => navigation("/parents"));
  };

  useEffect(() => handleOnClassChange(), [classes]);

  useEffect(() => {
    tauriServices.schoolClasses
      .getSchoolClasses()
      .then((data) => setClasses(data));
  }, []);

  return { classes, students, ref, handleOnClassChange, handleOnSubmit };
}
