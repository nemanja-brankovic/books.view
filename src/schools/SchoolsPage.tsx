import { useParams } from "react-router";
import School from "./School";

function SchoolsPage() {
  const { type } = useParams();
  console.log(type);
  return (
    <div className="mt-4 grid gap-y-6 sm:grid-cols-2 sm:gap-x-6 md:gap-x-12 xl:gap-x-24">
      <School />
      <School />
      <School />
      <School />
      <School />
      <School />
    </div>
  );
}

export default SchoolsPage;
