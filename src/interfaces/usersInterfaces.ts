import { IDataId } from "../utils/api";

export interface IUser {
  name: string;
  surname: string;
  email: string;
  permission: IDataId<Partial<IPermission>>;
  status: IDataId<Partial<IStatus>>;
  student?: string | null;
  teacher?: string | null;
  password?: string;
}

export interface ILogin {
  email: string;
  password: string;
}

export interface IPermission {
  name: string;
}

export interface IStatus {
  name: string;
}

export interface IStudent {
  album: number;
}

export interface ITeacher {
  user: IDataId<Partial<IUser>>;
  title: string;
  position: string;
  structures: IDataId<Partial<IStructure>>[];
}

// TODO: Do dorobienia i przeniesienia strusturesInterfaces
export interface IStructure {
  name: string;
}

// -> Nested array interface sample <-
// export interface Item {
//   id: number;
//   size: number;
// }

// export interface Example {
//   name: string;
//   items: {
//       [key: string]: Item
//   };
// }
