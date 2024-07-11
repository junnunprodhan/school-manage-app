import { FormEvent, useEffect, useRef, useState } from "react";
import { MainLayout } from "../../components/layouts";
import tauriServices from "../../services/tauriServices";
import { ButtonResponsive, Table } from "../../components/ui";
import { Filter, FilterSelectItem } from "../../components/ui/Filter";
import { UserItem } from "../../components/common";
import { BiPlus } from "react-icons/bi";
import { IClass } from "../../services/tauriServices/classes";
import { IParent } from "../../services/tauriServices/parents";

export default function ParentsListsPage() {
  const { classes, parents, ref, handleSearch } = useParentListsPage();

  return (
    <MainLayout
      name="Parent Lists"
      renderRight={() => {
        return (
          <>
            <ButtonResponsive
              to="/parents/add"
              icon={BiPlus}
              text="Add Parent"
            />
          </>
        );
      }}
    >
      <Filter.Filter onSubmit={handleSearch}>
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
      </Filter.Filter>


      <Table.Table
        head={["Id", "Name"]}
        data={parents}
        renderItem={(item, index) => (
          <Table.Row key={index}>
            <Table.Col key={"id"}>{item.id}</Table.Col>
            <Table.Col key={"name"}>
              <UserItem
                href={`/parents/${item.id}`}
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

function useParentListsPage() {
  const [classes, setClasses] = useState<IClass[]>([]);
  const [parents, setParents] = useState<IParent[]>([]);
  const ref = {
    classId: useRef({} as HTMLSelectElement),
    sectionId: useRef({} as HTMLSelectElement),
  };

  const handleOnClassChange = async () => {
    // TODO
  };

  const handleSearch = (e: FormEvent) => {
    e.preventDefault();

    if (!ref.classId.current.value) return;

    tauriServices.studentParents
      .getStudentParentsOfClass(Number(ref.classId.current.value))
      .then((data) => setParents(data));
  };

  // default data loader
  useEffect(() => {
    ref.classId.current.onchange = handleOnClassChange;

    tauriServices.schoolClasses
      .getSchoolClasses()
      .then((data) => setClasses(data))
      .then(() => handleOnClassChange());
  }, []);

  return { classes, parents, ref, handleSearch };
}
