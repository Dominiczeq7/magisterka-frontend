import { IDataId } from "../utils/api";

export interface IListOption {
  label: string;
  value: string | number;
}

export type IFilters = {
  func(data: IDataId<any>[], selected: number): IDataId<any>[];
  selected: number;
};
