import CategorySelection from "../../components/CategoriesSelection/CategoriesSelection";
import { ICategoriesSelection } from "../../interfaces/categoriesSelectionInterfaces";

const OrganizationOfStructure = () => {
  const categoriesSelectionData: ICategoriesSelection = {
    header: "Wybierz kategorię",
    categories: [
      {
        title: "Struktury",
        path: "/struktury",
      },
      {
        title: "Sale",
        path: "/sale",
      },
    ],
  };

  return <CategorySelection {...categoriesSelectionData} />;
};

export default OrganizationOfStructure;
