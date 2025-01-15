import Check from "../components/Check";
import MainTabButton from "./MainTabButton";
import MainPicture from "./MainPicture";
import { Link } from "react-router";

interface Props {
  items: string[];
  heading: string;
  dark: boolean;
  link: string;
}

function MainTab({ heading, items, dark, link }: Props) {
  const classNames =
    "py-10 px-4 flex flex-col rounded-xl text-center transition duration-75 hover:scale-105 focus:-rotate-1 focus:scale-105";
  const additionalClasses = dark
    ? " border-2 border-dashed border-gray-400"
    : " bg-white text-gray-900";
  const headingClasses =
    "px-6 py-2 inline-block text-2xl md:text-3xl font-bold text-white -rotate-1";
  const headingColor = dark ? " bg-teal-500" : " bg-gray-900";

  return (
    <Link to={link} className={classNames + additionalClasses}>
      <div>
        <h3 className={headingClasses + headingColor}>{heading}</h3>
      </div>
      <div className="mt-8 mx-10">
        <MainPicture dark={dark} />
      </div>
      <div className="flex-1 pb-3 font-bold leading-none text-6xl md:text-7xl md:leading-none lg:text-8xl lg:leading-none xl:text-9xl xl:leading-none">
        <div className="inline-block">
          <span className="text-lg">uštedi</span>
          300<sup className="text-3xl">rsd</sup>
          <small className="block text-lg text-right">po knjizi</small>
        </div>
      </div>

      <ul className="mx-auto text-left md:text-xl md:leading-normal font-bold space-y-1">
        {items?.map((item) => (
          <li key={item} className="flex items-start">
            <Check />
            {item}
          </li>
        ))}
      </ul>
      {<MainTabButton dark={dark} />}
    </Link>
  );
}

export default MainTab;
