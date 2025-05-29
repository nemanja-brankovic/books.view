import { useEffect } from "react";
import MainTab from "./MainTab";
import axios from "axios";

function MainPage() {
  useEffect(() => {
    axios
      .get("https://reactapp5server-dev.onrender.com/WeatherForecast")
      .then((res: any) => {
        console.log(res);
      });
  }, []);

  const itemsForBuy = [
    "Brzo pronadji knjigu koja ti je potrebna",
    "Brzo kontaktiraj prodavca",
    "Pronadji sve knjige za razred",
  ];
  const itemsForSell = [
    "Prodaj sve knjige za razred zajedno",
    "Brzo nadji kupca",
    "Napravi oglas u 2 klika",
  ];
  return (
    <div className="mt-4 grid gap-y-6 sm:grid-cols-2 sm:gap-x-6 md:gap-x-12 xl:gap-x-24">
      <MainTab
        heading="Kupi knjige"
        link="/buy/schools"
        items={itemsForBuy}
        dark={false}
      />
      <MainTab
        heading="Prodaj knjige"
        link="/sell/schools"
        items={itemsForSell}
        dark={true}
      />
    </div>
  );
}

export default MainPage;
