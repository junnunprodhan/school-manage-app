import { useRef, useState, useEffect, FormEvent } from "react";
import { MainLayout } from "../../components/layouts";
import tauriServices from "../../services/tauriServices";
import {  Table } from "../../components/ui";
import { isInvalidObject } from "../../utils/validation";
import { Filter, FilterInputItem, FilterSelectItem } from "../../components/ui/Filter";
import { IClass } from "../../services/tauriServices/classes";
import { IStudentAttendence } from "../../services/tauriServices/studentAttendences";
import { CustomDate } from "../../utils/date";
import {
  SelectOption,
  classSectionsToSelectOptions,
  classesToSelectOptions,
} from "../../utils";
import { IStudent } from "../../services/tauriServices/students";

export default function ClassAttendencesPage() {
  const {
    classes,
    students,
    attendences,
    handleOnClassChange,
    handleOnSearch,
    ref,
  } = useClassAttendencesPage();

  return (
    <MainLayout name="Student Attendences">
      <Filter.Filter onSubmit={handleOnSearch}>
        <Filter.Section>
          <Filter.SubSection>
            <FilterSelectItem
              label="Class Name"
              id="className"
              options={classesToSelectOptions(classes)}
              onChange={handleOnClassChange}
              required
              ref={ref.classId}
            />
            <FilterSelectItem
              label="Section Name"
              id="sectionName"
              options={classSectionsToSelectOptions()}
              ref={ref.sectionId}
              hidden
            />
            <FilterInputItem
              label={"Month"}
              id={"month"}
              type="number"
              required
              variant="sm"
              ref={ref.month}
            />
            <FilterInputItem
              label={"Year"}
              id={"year"}
              type="number"
              required
              variant="sm"
              ref={ref.year}
            />
          </Filter.SubSection>

          <Filter.SubSection></Filter.SubSection>
        </Filter.Section>

        <Filter.Section>
          <Filter.SubSection>
            <FilterSelectItem
              label="Student Name"
              id="studentId"
              options={SelectOption.maker(students, "name", "id")}
              required
              ref={ref.studentId}
            />
          </Filter.SubSection>

          <Filter.SubSection>
            <Filter.Button type="submit" children="Search" />
          </Filter.SubSection>
        </Filter.Section>
      </Filter.Filter>

      <Table.Table
        head={["Roll", "Name", "Present"]}
        data={attendences}
        renderItem={(item, index) => (
          <Table.Row key={index}>
            <Table.Col key={"roll"}>{item.id} </Table.Col>
            <Table.Col key={"name"}>
            </Table.Col>
            <Table.Col key={"present"}>
              {item.present ? "Present" : "Absent"}
            </Table.Col>
          </Table.Row>
        )}
      />
    </MainLayout>
  );
}

function useClassAttendencesPage() {
  const [classes, setClasses] = useState<IClass[]>([]);
  const [students, setStudents] = useState<IStudent[]>([]);
  const [attendences, setAttendences] = useState<IStudentAttendence[]>([]);
  const ref = {
    classId: useRef({} as HTMLSelectElement),
    sectionId: useRef({} as HTMLSelectElement),
    studentId: useRef({} as HTMLSelectElement),
    month: useRef({} as HTMLInputElement),
    year: useRef({} as HTMLInputElement),
  };

  const handleOnClassChange = () => {
    const data = {
      classId: Number(ref.classId.current.value),
      year: Number(ref.year.current.value),
    };
    if (!data.classId) return;

    tauriServices.classStudents
      .getClassStudents(data.classId, data.year)
      .then(data => setStudents(data));
  };

  const handleOnSearch = (e: FormEvent) => {
    e.preventDefault();

    setAttendences([]);

    const data = {
      month: Number(ref.month.current.value),
      year: Number(ref.year.current.value),
      studentId: Number(ref.studentId.current.value),
      classId: Number(ref.classId.current.value),
    };

    if (isInvalidObject(data)) return;

    tauriServices.studentAttendences
      .getStudentAttendences(data.month, data.year, data.studentId, data.classId)
      .then((data) => setAttendences(data));
  };

  useEffect(() => handleOnClassChange(), [classes]);

  // default data loader
  useEffect(() => {
    const date=  new CustomDate();
    ref.month.current.value = date.padMonth();
    ref.year.current.value = String(date.year());

    tauriServices.schoolClasses
      .getSchoolClasses()
      .then((data) => setClasses(data));
  }, []);

  return {
    classes,
    students,
    attendences,
    ref,
    handleOnClassChange,
    handleOnSearch,
  };
}
