import { Outlet } from "react-router";
import Navigation from "./Navigation";

function Layout() {
  return (
    <section className="pb-12 pt-4 bg-gray-900 text-gray-100">
      <div className="max-w-5xl mx-auto">
        <h2 className="font-bold text-4xl sm:text-5xl md:text-7xl xl:text-9xl">
          Polovne
          <span className="text-teal-400"> knjige</span>
        </h2>
        <Navigation />
        <p className="mt-6 max-w-xl sm:text-lg sm:leading-normal lg:text-xl lg:leading-normal xl:text-2xl xl:leading-normal font-semibold">
          test
        </p>
        <Outlet />
      </div>
    </section>
  );
}

export default Layout;
