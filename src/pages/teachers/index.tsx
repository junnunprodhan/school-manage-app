import { useEffect, useState } from "react";
import { MainLayout } from "../../components/layouts";
import tauriServices from "../../services/tauriServices";
import { ButtonResponsive, Table } from "../../components/ui";
import { UserItem } from "../../components/common";
import { BiPlus } from "react-icons/bi";
import { ITeacher } from "../../services/tauriServices/teachers";

export default function TeachersListsPage() {
  const { teachers } = useTeacherListsPage();

  return (
    <MainLayout
      name="Teachers List"
      renderRight={() => {
        return (
          <>
            <ButtonResponsive to="/teachers/add" icon={BiPlus} text="Add Teacher" />
          </>
        );
      }}
    >
      <Table.Table
        head={["Id", "Name"]}
        data={teachers}
        renderItem={(item, index) => (
          <Table.Row key={index}>
            <Table.Col key={"id"}>{item.id}</Table.Col>
            <Table.Col key={"name"}>
              <UserItem href={`/teachers/${item.id}`} name={item.name} img={item.img} />
            </Table.Col>
          </Table.Row>
        )}
      />
    </MainLayout>
  );
}

function useTeacherListsPage() {
  const [teachers, setTeachers] = useState<ITeacher[]>([]);

  useEffect(() => {
    tauriServices.schoolTeachers.getSchoolTeachers().then((data) => setTeachers(data));
  }, []);

  return { teachers };
}
