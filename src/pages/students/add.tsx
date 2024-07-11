import { FormEvent, useRef, useState, useEffect } from "react";
import { MainLayout } from "../../components/layouts";
import { InputField, ImageField, SelectField } from "../../components/ui/Field";
import tauriServices from "../../services/tauriServices";
import { classesToSelectOptions, classSectionsToSelectOptions } from "../../utils";
import { DataForm } from "../../components/ui";
import { IClass } from "../../services/tauriServices/classes";
import { useNavigate } from "react-router-dom";
import { GENDERS } from "../../constances";

export default function AddStudentPage() {
  const { classes, ref, handleOnSubmit } = useAddStudentPage();

  return (
    <MainLayout name="Add Student" back="/students">
      <DataForm.DataForm onSubmit={handleOnSubmit}>
        <DataForm.Section name="Student Info">
          <DataForm.SubSection name="">
            <ImageField label="Student Image" id={"studentImg"} onUpload={(name) => ref.imgName.current = name} ref={ref.img} />
            <InputField label="Student Name" id={"studentName"} required placeholder="Md Example" ref={ref.name} />
          </DataForm.SubSection>
          <DataForm.SubSection name="Class Info" variant="grid">
            <SelectField
              label="Class Name"
              id={"className"}
              options={classesToSelectOptions(classes)}
              required
              ref={ref.classId}
            />
            <SelectField
              label="Section Name"
              id={"sectionName"}
              options={classSectionsToSelectOptions()}
              ref={ref.sectionId}
              hidden
            />
            <InputField label="Class Roll" id="classRoll" type="number" placeholder="10" required ref={ref.classRoll} />
            <InputField label="Section Roll" id="sectionRoll" type="number" placeholder="10" ref={ref.sectionRoll} hidden />
          </DataForm.SubSection>
          <DataForm.SubSection name="About Info" variant="grid">
            <SelectField label="Gender" id="studentGender" options={GENDERS} required ref={ref.gender} />
            <InputField label="Date Of Birth" id="studentBirth" type="date" required ref={ref.birth} />
          </DataForm.SubSection>
          <DataForm.SubSection name="Contact Info">
            <InputField label="Number" id="studentNumber" required placeholder="+880 1234 567890" ref={ref.number} />
            <InputField label="Address" id="studentAddress" required placeholder="Dhaka, Bangladesh" ref={ref.address} />
          </DataForm.SubSection>
          <DataForm.SubSection name="Login Info">
            <InputField label="Email" id="studentEmail" required placeholder="example@mail.com" ref={ref.email} />
            <InputField label="Password" id="studentPassword" required type="password" placeholder="*******" ref={ref.password} />
          </DataForm.SubSection>
        </DataForm.Section>

        <DataForm.Section name="Parent Info">
          <DataForm.SubSection name="">
            <ImageField label="Parent Image" id={"parentImg"} onUpload={(name) => ref.parentImgName.current = name} ref={ref.parentImg} />
            <InputField label="Parent Name" id="parentName" required placeholder="Md Example" ref={ref.parentName} />
            <InputField
              label="Parent Profession"
              id="parentProfession"
              required
              placeholder="Programmer"
              ref={ref.parentProfession}
            />
          </DataForm.SubSection>
          <DataForm.SubSection name="About Info" variant="grid">
            <SelectField
              label="Gender"
              id="parentGender"
              options={[
                { name: "Male", value: "MALE" },
                { name: "Female", value: "FEMALE" },
                { name: "Not Prefer", value: "NONE" },
              ]}
              required
              ref={ref.parentGender}
            />
            <InputField label="Date Of Birth" id="parentBirth" type="date" required ref={ref.parentBirth} />
          </DataForm.SubSection>
          <DataForm.SubSection name="Contact Info">
            <InputField label="Number" id="parentNumber" required placeholder="+880 1234 567890" ref={ref.parentNumber} />
            <InputField label="Address" id="parentAddress" required placeholder="Dhaka, Bangladesh" ref={ref.parentAddress} />
          </DataForm.SubSection>
          <DataForm.SubSection name="Login Info">
            <InputField label="Email" id="parentEmail" required placeholder="example@mail.com" ref={ref.parentEmail} />
            <InputField
              label="Password"
              id="parentPassword"
              type="password"
              required
              placeholder="*******"
              ref={ref.parentPassword}
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

function useAddStudentPage() {
  const navigation = useNavigate();
  const [classes, setClasses] = useState<IClass[]>([]);
  const ref = {
    name: useRef({} as HTMLInputElement),
    imgName: useRef(""),
    img: useRef({} as HTMLInputElement),
    classId: useRef({} as HTMLSelectElement),
    sectionId: useRef({} as HTMLSelectElement),
    classRoll: useRef({} as HTMLInputElement),
    sectionRoll: useRef({} as HTMLInputElement),
    gender: useRef({} as HTMLSelectElement),
    birth: useRef({} as HTMLInputElement),
    email: useRef({} as HTMLInputElement),
    number: useRef({} as HTMLInputElement),
    address: useRef({} as HTMLInputElement),
    password: useRef({} as HTMLInputElement),

    parentName: useRef({} as HTMLInputElement),
    parentImgName: useRef(""),
    parentImg: useRef({} as HTMLInputElement),
    parentProfession: useRef({} as HTMLInputElement),
    parentGender: useRef({} as HTMLSelectElement),
    parentBirth: useRef({} as HTMLInputElement),
    parentEmail: useRef({} as HTMLInputElement),
    parentNumber: useRef({} as HTMLInputElement),
    parentAddress: useRef({} as HTMLInputElement),
    parentPassword: useRef({} as HTMLInputElement),
  };

  const handleOnSubmit = (e: FormEvent) => {
    e.preventDefault();

    let studentData = {
      name: ref.name.current.value,
      imgName: ref.imgName.current,
      img: ref.img.current.value,

      classRoll: Number(ref.classRoll.current.value),
      classId: Number(ref.classId.current.value),
      sectionId: ref.sectionId.current.value,
      sectionRoll: Number(ref.sectionRoll.current.value),
      year: new Date().getFullYear(),

      birth: ref.birth.current.value,
      gender: ref.gender.current.value,
      address: ref.address.current.value,
      number: ref.number.current.value,

      email: ref.email.current.value,
      password: ref.password.current.value,
    };

    let parentData = {
      name: ref.parentName.current.value,
      imgName: ref.parentImgName.current,
      img: ref.parentImg.current.value,
      profession: ref.parentProfession.current.value,

      birth: ref.parentBirth.current.value,
      gender: ref.parentGender.current.value,
      address: ref.parentAddress.current.value,
      number: ref.parentNumber.current.value,

      email: ref.parentEmail.current.value,
      password: ref.parentPassword.current.value,
    };


    // student img
    tauriServices.images.uploadImage(studentData.imgName, studentData.img)
      .then(filename => studentData.img = filename)
      // parent img
      .then(() => tauriServices.images.uploadImage(parentData.imgName, parentData.img))
      .then(filename => parentData.img = filename)
      // student data
      .then(() =>  tauriServices.students
        .addStudent(
          studentData.name,
          studentData.img,
          studentData.classRoll,
          studentData.classId,
          studentData.sectionId,
          studentData.sectionRoll,
          studentData.year,
          studentData.birth,
          studentData.gender,
          studentData.address,
          studentData.number,
          studentData.email,
          studentData.password
        ))
        // parent data
        .then((studentId) => tauriServices.parents
          .addParent(
            parentData.name,
            parentData.img,
            parentData.profession,
            parentData.birth,
            parentData.gender,
            parentData.address,
            parentData.number,
            parentData.email,
            parentData.password,
            studentId
          )
        )
      .then(() => navigation("/students"));
  };

  useEffect(() => {
    tauriServices.schoolClasses.getSchoolClasses().then((data) => setClasses(data));
  }, []);

  return { classes, ref, handleOnSubmit };
}
