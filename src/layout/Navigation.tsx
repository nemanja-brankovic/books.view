import { Link, useLocation, useParams } from "react-router";
import NavigationLink from "./NavigationLink";

function Navigation() {
  const { type } = useParams();
  const location = useLocation();
  const pages = [type as string, "schools", "books"];
  return (
    <div className="bg-gray-900 rounded-lg p-4 pl-0 flex items-center flex-wrap">
      <ul className="flex items-center">
        <li className="inline-flex items-center">
          <Link to="/" className="group text-gray-100 hover:text-teal-400">
            <svg
              className="w-5 h-auto fill-current mx-2 text-gray-400 group-hover:fill-teal-400"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="#000000"
            >
              <path d="M0 0h24v24H0V0z" fill="none" />
              <path d="M10 19v-5h4v5c0 .55.45 1 1 1h3c.55 0 1-.45 1-1v-7h1.7c.46 0 .68-.57.33-.87L12.67 3.6c-.38-.34-.96-.34-1.34 0l-8.36 7.53c-.34.3-.13.87.33.87H5v7c0 .55.45 1 1 1h3c.55 0 1-.45 1-1z" />
            </svg>
          </Link>
        </li>

        {location.pathname != "/" &&
          pages.map((page) => (
            <NavigationLink key={page} name={page} link={page} />
          ))}
      </ul>
    </div>
  );
}

export default Navigation;
