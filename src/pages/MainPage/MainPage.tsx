import CategorySelection from "../../components/CategoriesSelection/CategoriesSelection";
import { ICategoriesSelection } from "../../interfaces/categoriesSelectionInterfaces";

const MainPage = () => {
  const categoriesSelectionData: ICategoriesSelection = {
    header: "Strona główna",
    categories: [
      {
        title: "Zarządzanie jednostkami i strukturami",
        path: "/zarzadzanie-jednostkami-i-strukturami",
      },
      {
        title: "Organizacja struktury",
        path: "/organizacja-struktury",
      },
      {
        title: "Plan zajęć",
        path: "/plan-zajec",
      },
    ],
  };

  return <CategorySelection {...categoriesSelectionData} />;
};

export default MainPage;
