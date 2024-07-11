import { useState, useEffect } from "react";
import { MainLayout } from "../../components/layouts";
import { InputField, ImageField } from "../../components/ui/Field";
import tauriServices from "../../services/tauriServices";
import { useParams } from "react-router-dom";
import { DataForm } from "../../components/ui";
import { IParent } from "../../services/tauriServices/parents";
import { IAbout } from "../../services/tauriServices/abouts";
import { CustomDate } from "../../utils/date";

export default function GetParentPage() {
  const params = useParams<any>();
  const { parent, about } = useGetParentPage(Number(params.parentId));

  return (
    <MainLayout name={parent?.name} back="/parents">
      <DataForm.DataForm>
        <DataForm.Section name="Parent Info">
          <DataForm.SubSection>
            <ImageField label="Parent Image" id={"parentImg"} src={parent?.img} disabled />
            <InputField label="Parent Name" id="parentName" placeholder="Md Example" value={parent?.name} disabled />
            <InputField
              label="Parent Profession"
              id="parentProfession"
              placeholder="Programmer"
              value={parent?.profession}
              disabled
            />
          </DataForm.SubSection>
          <DataForm.SubSection name="About Info" variant="grid">
            <InputField label="Gender" id="parentGender" value={about?.gender} />
            <InputField label="Date Of Birth" id="parentBirth" type="date" value={about && CustomDate.to_input(about.birth)} disabled />
          </DataForm.SubSection>
          <DataForm.SubSection name="Contact Info">
            <InputField label="Number" id="parentNumber" placeholder="+880 1234 567890" value={about?.number} disabled />
            <InputField label="Address" id="parentAddress" placeholder="Dhaka, Bangladesh" value={about?.address} disabled />
          </DataForm.SubSection>
          <DataForm.SubSection name="Login Info">
            <InputField label="Email" id="parentEmail" placeholder="example@mail.com" value={about?.email} disabled />
          </DataForm.SubSection>
        </DataForm.Section>
      </DataForm.DataForm>
    </MainLayout>
  );
}

function useGetParentPage(parentId: number) {
  const [parent, setParent] = useState<IParent | undefined>();
  const [about, setAbout] = useState<IAbout | undefined>();

  useEffect(() => {
    tauriServices.parents
      .getParent(parentId)
      .then((data) => {
        setParent(data);
        return tauriServices.abouts.getAbout(data.about_id);
      })
      .then((data) => setAbout(data));
  }, []);

  return { parent, about };
}
