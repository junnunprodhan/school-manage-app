import { useRef, useState, useEffect, FormEvent } from "react";
import { MainLayout } from "../../components/layouts";
import tauriServices from "../../services/tauriServices";
import { EmptyData, Table } from "../../components/ui";
import { isInvalidObject } from "../../utils/validation";
import {
  FilterSelectItem,
  FilterInputItem,
  Filter,
} from "../../components/ui/Filter";
import { PresentInput } from "../../components/student-attendences";
import { UserItem } from "../../components/common";
import { IClass } from "../../services/tauriServices/classes";
import { IStudentWithClass } from "../../services/tauriServices/classStudents";
import { useNavigate } from "react-router-dom";
import { CustomDate } from "../../utils/date";
import {
  classSectionsToSelectOptions,
  classesToSelectOptions,
} from "../../utils";

export default function TakeAttendencesPage() {
  const {
    classes,
    students,
    attendences,
    isAttendencesTaken,
    isUpdateAttendences,
    ref,
    handleOnClassChange,
    handleWantToUpdateAttendences,
    handleOnSearch,
    handleOnTakeAttendences,
    handleOnUpdateAttendences,
  } = useTakeAttendencesPage();

  return (
    <MainLayout name="Take Attendences" back="/student-attendences">
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


      {isAttendencesTaken && !isUpdateAttendences ? (
        <EmptyData
          name="Alread Taken"
          describtion="Attendence is already taken"
        >
          <button
            type="button"
            className="btn btn-success"
            onClick={handleWantToUpdateAttendences}
          >
            Update Attendences
          </button>
        </EmptyData>
      ) : (
        <>
          <Table.Table
            head={["Roll", "Name", "Present"]}
            data={students}
            renderItem={(item) => (
              <Table.Row key={item.id}>
                <Table.Col key={"roll"}>{item.roll} </Table.Col>
                <Table.Col key={"name"}>
                  <UserItem
                    href={`/students/${item.id}`}
                    name={item.name}
                    img={item.img}
                  />
                </Table.Col>
                <Table.Col key={"present"}>
                  <PresentInput
                    id={item.id}
                    defaultChecked={attendences.current[item.id]}
                    onChange={(e) => {
                      attendences.current[item.id] = e.currentTarget.checked;
                    }}
                  />
                </Table.Col>
              </Table.Row>
            )}
          />

          

          <div className="flex items-center justify-center">
            {isUpdateAttendences ? (
              <button
                type="button"
                className="btn btn-success"
                onClick={handleOnUpdateAttendences}
              >
                Update Attendences
              </button>
            ) : students.length !== 0 ? (
              <button
                type="button"
                className="btn btn-success"
                onClick={handleOnTakeAttendences}
              >
                Take Attendences
              </button>
            ) : null}
          </div>
        </>
      )}
    </MainLayout>
  );
}

function useTakeAttendencesPage() {
  const navigation = useNavigate();
  const [classes, setClasses] = useState<IClass[]>([]);
  const [students, setStudents] = useState<IStudentWithClass[]>([]);
  const [isAttendencesTaken, setIsAttendencesTaken] = useState(false);
  const [isUpdateAttendences, setIsUpdateAttendences] = useState(false);
  const attendences = useRef<Record<number, boolean>>({});

  const ref = {
    classId: useRef({} as HTMLSelectElement),
    sectionId: useRef({} as HTMLSelectElement),
    date: useRef({} as HTMLInputElement),
  };

  const handleOnClassChange = async () => {
    // TODO
    // load sections
  };

  const handleWantToUpdateAttendences = () => {
    setIsUpdateAttendences(true);
  };

  const handleOnSearch = async (e: FormEvent) => {
    e.preventDefault();

    setIsAttendencesTaken(false);
    setIsUpdateAttendences(false);
    setStudents([]);

    const data = {
      classId: Number(ref.classId.current.value),
      year: new Date().getFullYear(),
      date: ref.date.current.value,
    };

    if (!data.classId) return;

    const isTaken = await tauriServices.studentAttendences.isClassAttendencesTaken(
      data.date,
      data.classId
    );

    setIsAttendencesTaken(isTaken);

    if (isTaken) return;

    tauriServices.classStudents
      .getAllStudentWithClass(data.classId, data.year)
      .then((data) => {
        attendences.current = {};

        data.forEach((item) => (attendences.current[item.id] = false));

        setStudents(data);
      });
  };

  const mappedAttendences = () => {
    return Object.entries(attendences.current).map(
      ([key, value]) => [Number(key), Boolean(value)]
    ) as [number, boolean][];
  };

  const handleOnTakeAttendences = async () => {
    const data = {
      date: ref.date.current.value,
      classId: Number(ref.classId.current.value),
      sectionId: ref.sectionId.current.value,
      attendences: mappedAttendences(),
    };

    if (isInvalidObject(data)) return;

    tauriServices.studentAttendences
      .takeStudentAttendences(data.attendences, data.date, data.classId)
      .then(() => navigation("/student-attendences"));
  };
 
  const handleOnUpdateAttendences = async () => {
    const data = {
      date: ref.date.current.value,
      classId: Number(ref.classId.current.value),
      sectionId: ref.sectionId.current.value,
      attendences: mappedAttendences(),
    };
    
    if (isInvalidObject(data)) return;

    tauriServices.studentAttendences
      .updateStudentAttendences(data.attendences, data.date, data.classId)
      .then(() => navigation("/student-attendences"));
  };

  useEffect(() => {
    if (!isUpdateAttendences) return;

    const data = {
      classId: Number(ref.classId.current.value),
      year: new Date().getFullYear(),
      date: ref.date.current.value,
    };

    // Get previous attendences value
    tauriServices.studentAttendences
      .getClassAttendences(data.date, data.classId)
      .then((data) => {
        attendences.current = {};

        data.forEach((item) => (attendences.current[item.id] = item.present));
      })
      // Get all students
      .then(() =>
        tauriServices.classStudents.getAllStudentWithClass(
          data.classId,
          data.year
        )
      )
      .then((data) => {
        // For if there is new students
        data.forEach((item) => {
          if (attendences.current[item.id]) return;

          attendences.current[item.id] = false;
        });

        setStudents(data);
      });
  }, [isUpdateAttendences]);

  useEffect(() => {
    ref.date.current.defaultValue = new CustomDate().input();

    tauriServices.schoolClasses
      .getSchoolClasses()
      .then((data) => setClasses(data))
      .then(() => handleOnClassChange());
  }, []);

  return {
    classes,
    students,
    attendences,
    isAttendencesTaken,
    isUpdateAttendences,
    handleOnClassChange,
    handleWantToUpdateAttendences,
    handleOnSearch,
    handleOnTakeAttendences,
    handleOnUpdateAttendences,
    ref,
  };
}
