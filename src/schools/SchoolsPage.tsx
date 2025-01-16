import { useParams } from "react-router";
import School from "./School";

function SchoolsPage() {
  const { type } = useParams();
  console.log(type);
  return (
    <div className="mt-4 grid gap-y-6 sm:grid-cols-2 sm:gap-x-6 md:gap-x-12 xl:gap-x-24">
      <School schoolName="Tehnička škola Pirot" />
      <School schoolName="Gimnazija Pirot" />
      <School schoolName="Srednja stručna škola Pirot" />
      <School schoolName="OŠ Dušan Radović" />
      <School schoolName="OŠ Sveti Sava" />
      <School schoolName="OŠ Vuk Karadžić" />
      <School schoolName="OŠ Osmi septembar" />
    </div>
  );
}

export default SchoolsPage;
