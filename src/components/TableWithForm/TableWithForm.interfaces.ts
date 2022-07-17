import { FormItemProps, InputProps, SelectProps } from "antd";
import { IDataId, IDataKey } from "../../utils/api";

export interface TableWithFormProps<IData, IRecordData> {
  table: {
    columns: {
      title: string;
      dataIndex: string;
    }[];
    title: string;
  };
  apiData: {
    gets(): Promise<IDataId<IData>[]>;
    add?(data: Partial<IData>): Promise<any>;
    update?(id: number, data: Partial<IData>): Promise<any>;
    remove?(id: number): Promise<any>;
  };
  transform: {
    apiToRecord: (user: IDataId<IData>) => IDataKey<IRecordData>;
    recordToApi: (user: IDataKey<IRecordData>) => Partial<IData>;
  };
  formControls: IFormControl[];
}

export interface IFormControl {
  formItemProps: FormItemProps & {
    label: string;
    name: string;
    rules: any;
  };
  controlComp: any;
  controlProps: InputProps | SelectProps<string>;
}

export interface IListOption {
  label: string;
  value: string | number;
}

export default TableWithFormProps;
