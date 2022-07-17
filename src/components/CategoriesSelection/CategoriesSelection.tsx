import NavigationPanel from "../NavigationPanel/NavigationPanel";
import * as LS from "./CategoriesSelection.styles";
import {
  ICategoriesSelection,
  ICategory,
} from "../../interfaces/categoriesSelectionInterfaces";
import { Link } from "react-router-dom";

const CategorySelection: React.FC<ICategoriesSelection> = (props) => {
  const generateCategoryButtons = (categories: ICategory[]) => {
    return categories.map((category, i) => {
      return (
        <LS.CategoryButton key={category.path}>
          <Link to={category.path}>{category.title}</Link>
        </LS.CategoryButton>
      );
    });
  };

  return (
    <>
      <NavigationPanel title={props.header} />
      <LS.CategorySection>
        {generateCategoryButtons(props.categories)}
      </LS.CategorySection>
    </>
  );
};

export default CategorySelection;
