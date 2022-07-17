export interface ICategory {
  title: string;
  path: string;
}

export interface ICategoriesSelection {
  header: string;
  categories: ICategory[];
}
