import { FormItemProps, InputProps, SelectProps } from "antd";
import { IDataId, IDataKey } from "../../utils/api";

export interface IRecordScheduleData {
  key: number;
  hour: string;
  monday: string;
  tuesday: string;
  wednesday: string;
  thursday: string;
  friday: string;
  sum: string;
}

export interface IColumnHeader {
  title: string;
  dataIndex: string;
  children?: [
    {
      title: string;
      dataIndex: string;
    }
  ];
}

export interface TableWithFiltersProps<IData, IRecordData = {}> {
  table: {
    title: string;
    //Bez podania columns tworzą się oparte na IRecordScheduleData
    columns?: IColumnHeader[];
  };
  apiData: {
    gets(): Promise<IDataId<IData>[]>;
  };
  transform: {
    apiToRecord: (
      user: IDataId<IData>
    ) => IDataKey<IRecordScheduleData | IRecordData>;
  };
  tableFilters?: IFilterControl[];
}

export interface IFilterControl {
  formItemProps: FormItemProps & {
    label: string;
    name: string;
  };
  controlComp: any;
  controlProps: InputProps | SelectProps<string>;
  filterFunc?: (data: IDataId<any>[], selected: number) => IDataId<any>[];
}
export interface IOnChangeSelectResp {
  value: string | number;
  key: string | number;
  label: string;
}
export interface IListOption {
  label: string;
  value: string | number;
}

export interface IFilterOptions {
  [key: string]: IOnChangeSelectResp;
}

export default TableWithFiltersProps;
