export interface IClass {
  start_year: number;
  end_year: number;
  structure: IStructure;
}

export interface IStructure {
  name: string;
  description: string;
}

export interface IGroup {
  name: string;
  class: IClass;
}
