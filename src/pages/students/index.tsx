import { useRef, useState, useEffect, FormEvent } from "react";
import { MainLayout } from "../../components/layouts";
import tauriServices from "../../services/tauriServices";
import { ButtonResponsive, Table } from "../../components/ui";
import {
  Filter,
  FilterInputItem,
  FilterSelectItem,
} from "../../components/ui/Filter";
import { UserItem } from "../../components/common";
import { BiPlus } from "react-icons/bi";
import { IClass } from "../../services/tauriServices/classes";
import { IStudentWithClass } from "../../services/tauriServices/classStudents";
import { CustomDate } from "../../utils/date";

export default function StudentsListsPage() {
  const { classes, students, handleOnSearch, ref } = useStudentListsPage();

  return (
    <MainLayout
      name="Students"
      renderRight={() => {
        return (
          <>
            <ButtonResponsive
              to="/students/add"
              icon={BiPlus}
              text="Add Student"
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
              options={classes.map((item) => ({
                name: item.name,
                value: item.id,
              }))}
              ref={ref.classId}
            />
            <FilterSelectItem
              label="Section Name"
              id="sectionName"
              options={[
                { name: "Section One", value: 1 },
                { name: "Section Two", value: 2 },
                { name: "Section Three", value: 3 },
              ]}
              ref={ref.sectionId}
              hidden
            />
          </Filter.SubSection>

          <Filter.SubSection>
            <Filter.Button type="submit" children="Search" />
          </Filter.SubSection>
        </Filter.Section>

        <Filter.Section className="hidden">
          <Filter.SubSection>
            <FilterInputItem
              label="Year"
              id="year"
              type="number"
              required
              min={2000}
              max={2030}
              placeholder="2024"
              variant="sm"
              ref={ref.year}
              hidden
            />
          </Filter.SubSection>

          <Filter.SubSection>
            {/* <Filter.Button type="submit" children="Search" /> */}
          </Filter.SubSection>
        </Filter.Section>
      </Filter.Filter>


      <Table.Table
        head={["Roll", "Name"]}
        data={students}
        renderItem={(item, index) => (
          <Table.Row key={index}>
            <Table.Col key={"roll"}>{item.roll} </Table.Col>
            <Table.Col key={"name"}>
              <UserItem
                href={`/students/${item.id}`}
                name={item.name}
                img={item.img}
              />
            </Table.Col>
          </Table.Row>
        )}
      />
    </MainLayout>
  );
}

function useStudentListsPage() {
  const [classes, setClasses] = useState<IClass[]>([]);
  const [students, setStudents] = useState<IStudentWithClass[]>([]);
  const ref = {
    classId: useRef({} as HTMLSelectElement),
    sectionId: useRef({} as HTMLSelectElement),
    year: useRef({} as HTMLInputElement),
  };

  const handleOnClassChange = () => {
    // TODO
    // load sections
  };

  const handleOnSearch = (e: FormEvent) => {
    e.preventDefault();

    const data = {
      classId: Number(ref.classId.current.value),
      year: Number(ref.year.current.value),
    };

    if (!data.classId) return;

    tauriServices.classStudents
      .getAllStudentWithClass(data.classId, data.year)
      .then((data) => setStudents(data));
  };

  useEffect(() => handleOnClassChange(), [classes]);

  useEffect(() => {
    ref.year.current.defaultValue = String(new CustomDate().year());

    tauriServices.schoolClasses
      .getSchoolClasses()
      .then((data) => setClasses(data));
  }, []);

  return { classes, students, ref, handleOnSearch };
}
