import { useState } from "react";
import tauriServices from "../../services/tauriServices";
import { Details, Table } from "../ui";
import { Link } from "react-router-dom";
import { IClassSubject } from "../../services/tauriServices/classSubjects";
import { IClass } from "../../services/tauriServices/classes";

export default function ClassSummary({ classData }: { classData: IClass }) {
  const [subjects, setSubjects] = useState<IClassSubject[]>([]);

  const handleOnClick = () => {
    if (subjects.length !== 0) return;

    tauriServices.classSubjects.getClassSubjects(classData.id).then((data) => setSubjects(data));
  };

  return (
    <Details.Details>
      <Details.Summary onClick={handleOnClick}>{classData.name}</Details.Summary>
      <Details.Content>
        <Details.Header>
          <Link className="btn btn-transparent" to="/classes/subjects/add">
            Add Subject
          </Link>
        </Details.Header>
        <Table.Table
          head={["Id", "Name", "Code"]}
          data={subjects}
          renderItem={(item, index) => (
            <Table.Row key={index}>
              <Table.Col key={"id"}>{item.id}</Table.Col>
              <Table.Col key={"name"}>{item.name}</Table.Col>
              <Table.Col key="code">{item.code}</Table.Col>
            </Table.Row>
          )}
        />
      </Details.Content>
    </Details.Details>
  );
}
