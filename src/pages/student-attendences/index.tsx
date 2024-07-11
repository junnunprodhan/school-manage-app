import { useRef, useState, useEffect, FormEvent } from "react";
import { MainLayout } from "../../components/layouts";
import tauriServices from "../../services/tauriServices";
import { ButtonResponsive, EmptyData, Table } from "../../components/ui";
import { isInvalidObject } from "../../utils/validation";
import { Filter, FilterInputItem, FilterSelectItem } from "../../components/ui/Filter";
import { UserItem } from "../../components/common";
import { BiPlus } from "react-icons/bi";
import { IClass } from "../../services/tauriServices/classes";
import { IStudentAttendenceWithStudent } from "../../services/tauriServices/studentAttendences";
import { CustomDate } from "../../utils/date";
import { Link } from "react-router-dom";
import {
  classSectionsToSelectOptions,
  classesToSelectOptions,
} from "../../utils";

export default function ClassAttendencesPage() {
  const {
    classes,
    studentAttendences,
    isAttendencesTaken,
    handleOnClassChange,
    handleOnSearch,
    ref,
  } = useClassAttendencesPage();

  return (
    <MainLayout
      name="Student Attendences"
      renderRight={() => {
        return (
          <>
            <ButtonResponsive
              to="/student-attendences/take"
              icon={BiPlus}
              text="Take Attendence"
            />
          </>
        );
      }}
    >
      <Filter.Filter onSubmit={handleOnSearch}>
        <Filter.Section>
          <Filter.SubSection>
            <FilterSelectItem
              label="Class Name"
              id="className"
              options={classesToSelectOptions(classes)}
              onChange={handleOnClassChange}
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
              label={"Date"}
              id={"date"}
              type="date"
              required
              variant="sm"
              ref={ref.date}
            />
          </Filter.SubSection>

          <Filter.SubSection>
            <Filter.Button type="submit" children="Search" />
          </Filter.SubSection>
        </Filter.Section>
      </Filter.Filter>


      {!isAttendencesTaken ? (
        <EmptyData name="Not Taken" describtion="There is no attendences.">
          <Link
            className="btn btn-success"
            to="/student-attendences/take"
          >
            Take Attendences
          </Link>
        </EmptyData>
      ) : (
        <Table.Table
          head={["Roll", "Name", "Present"]}
          data={studentAttendences}
          renderItem={(item, index) => (
            <Table.Row key={index}>
              <Table.Col key={"roll"}>{item.id} </Table.Col>
              <Table.Col key={"name"}>
                <UserItem
                  href={`/students/${item.id}`}
                  name={item.name}
                  img={item.img}
                />
              </Table.Col>
              <Table.Col key={"present"}>
                {item.present ? "Present" : "Absent"}
              </Table.Col>
            </Table.Row>
          )}
        />
      )}
    </MainLayout>
  );
}

function useClassAttendencesPage() {
  const [isAttendencesTaken, setIsAttendencesTaken] = useState(true);
  const [classes, setClasses] = useState<IClass[]>([]);
  const [studentAttendences, setStudentAttendences] = useState<
    IStudentAttendenceWithStudent[]
  >([]);
  const ref = {
    classId: useRef({} as HTMLSelectElement),
    sectionId: useRef({} as HTMLSelectElement),
    date: useRef({} as HTMLInputElement),
  };

  const handleOnClassChange = async () => {
    // TODO
    // load sections
  };

  const handleOnSearch = async (e: FormEvent) => {
    e.preventDefault();

    setIsAttendencesTaken(true);

    const data = {
      date: ref.date.current.value,
      classId: Number(ref.classId.current.value),
    };

    if (isInvalidObject(data)) return;

    const isTaken =
      await tauriServices.studentAttendences.isClassAttendencesTaken(
        data.date,
        data.classId
      );

    setIsAttendencesTaken(isTaken);

    if (!isTaken) return;

    tauriServices.studentAttendences
      .getClassAttendences(data.date, data.classId)
      .then((data) => setStudentAttendences(data));
  };

  // default data loader
  useEffect(() => {
    ref.date.current.value = new CustomDate().input();

    tauriServices.schoolClasses
      .getSchoolClasses()
      .then((data) => setClasses(data));
  }, []);

  return {
    classes,
    studentAttendences,
    isAttendencesTaken,
    ref,
    handleOnClassChange,
    handleOnSearch,
  };
}
