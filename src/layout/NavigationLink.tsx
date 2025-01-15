import { Link } from "react-router";

interface Props {
  name: string;
  link: string;
}

function NavigationLink({ name, link }: Props) {
  return (
    <li className="inline-flex items-center">
      <span className="mx-4 h-auto text-gray-400 font-medium">/</span>
      <Link to={link} className="text-gray-100 hover:text-teal-400">
        {name}
      </Link>
    </li>
  );
}

export default NavigationLink;
