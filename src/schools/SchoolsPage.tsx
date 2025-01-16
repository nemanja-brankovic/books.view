import { useParams } from "react-router";
import School from "./School";

function SchoolsPage() {
  const { type } = useParams();
  console.log(type);
  return (
    <div className="mt-4 grid gap-y-6 sm:grid-cols-2 sm:gap-x-6 md:gap-x-12 xl:gap-x-24">
      <School schoolName="Tehnička škola Pirot" id="tehnicka" key={1} />
      <School schoolName="Gimnazija Pirot" id=":gimnazija" key={2}/>
      <School schoolName="Srednja stručna škola Pirot" id=":strucna" key={3}/>
      <School schoolName="OŠ Dušan Radović" id=":tehnicka" key={4}/>
      <School schoolName="OŠ Sveti Sava" id=":tehnicka" key={5}/>
      <School schoolName="OŠ Vuk Karadžić" id=":tehnicka" key={6}/>
      <School schoolName="OŠ Osmi septembar" id=":tehnicka" key={7}/>
    </div>
  );
}

export default SchoolsPage;
