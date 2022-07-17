import CategorySelection from "../../components/CategoriesSelection/CategoriesSelection";
import { ICategoriesSelection } from "../../interfaces/categoriesSelectionInterfaces";

const UnitsManagementsPage = () => {
  const categoriesSelectionData: ICategoriesSelection = {
    header: "Wybierz kategorię",
    categories: [
      {
        title: "Osoby",
        path: "/osoby",
      },
      {
        title: "Zajęcia",
        path: "/zajecia",
      },
      {
        title: "Klasy",
        path: "/klasy",
      },
    ],
  };

  return <CategorySelection {...categoriesSelectionData} />;
};

export default UnitsManagementsPage;
