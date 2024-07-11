import { useEffect, useState } from "react";
import { MainLayout } from "../../components/layouts";
import tauriServices from "../../services/tauriServices";
import { ButtonResponsive, EmptyData } from "../../components/ui";
import { BiPlus } from "react-icons/bi";
import { ClassSummary } from "../../components/classes";
import { IClass } from "../../services/tauriServices/classes";

export default function ClasssListsPage() {
  const { classes } = useClassListsPage();

  return (
    <MainLayout
      name="Classes"
      renderRight={() => {
        return (
          <>
            <ButtonResponsive to="/classes/add" icon={BiPlus} text="Add Class" />
          </>
        );
      }}
    >
      {classes.length === 0 && <EmptyData name="Nothing to Show." describtion="Add some classes." />}

      <div className="px-4 md:py-4 flex flex-col gap-4">
        {classes.map((classData) => (
          <ClassSummary classData={classData} key={classData.id} />
        ))}
      </div>
    </MainLayout>
  );
}

function useClassListsPage() {
  const [classes, setClasses] = useState<IClass[]>([]);

  // default data loader
  useEffect(() => {
    tauriServices.schoolClasses.getSchoolClasses().then((data) => setClasses(data));
  }, []);

  return { classes };
}
