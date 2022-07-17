import * as CS from "../../../styles/commons.styles";
import {
  addUser,
  getUsers,
  removeUser,
  updateUser,
  getUsersPermissions,
  getUsersStatuses,
} from "../../../apis/usersAPI";
import { IDataId, IDataKey } from "../../../utils/api";
import {
  IUser,
  IPermission,
  IStatus,
} from "../../../interfaces/usersInterfaces";
import TableWithForm from "../../../components/TableWithForm/TableWithForm";
import {
  TableWithFormProps,
  IFormControl,
} from "../../../components/TableWithForm/TableWithForm.interfaces";

import { IListOption } from "../../../interfaces/commonsInterfaces";
import { useState, useEffect } from "react";

interface IRecordUserData {
  key: number;
  name: string;
  surname: string;
  email: string;
  permission: number;
  permission_name: string;
  status: number;
  status_name: string;
}

const tableTitle = "Lista osób";

const userColumns = [
  {
    title: "Imię",
    dataIndex: "name",
  },
  {
    title: "Nazwisko",
    dataIndex: "surname",
  },
  {
    title: "Email",
    dataIndex: "email",
  },
  {
    title: "Uprawnienie",
    dataIndex: "permission_name",
  },
  {
    title: "Status",
    dataIndex: "status_name",
  },
];

function permissionsOptionsConv(
  permissions: IDataId<IPermission>[]
): IListOption[] {
  return permissions.map((permission) => {
    return { label: permission.name, value: permission.id };
  });
}

function statusOptionsConv(statuses: IDataId<IStatus>[]): IListOption[] {
  return statuses.map((status) => {
    return { label: status.name, value: status.id };
  });
}

const UsersTab = () => {
  const [permissionOptions, setPermissionOptions] = useState<IListOption[]>([]);
  const [statusOptions, setStatusOptions] = useState<IListOption[]>([]);

  useEffect(() => {
    const setPermissionsFun = async () => {
      const permissions = await getUsersPermissions();
      setPermissionOptions(permissionsOptionsConv(permissions));
    };

    const setStructuresFun = async () => {
      const statuses = await getUsersStatuses();
      setStatusOptions(statusOptionsConv(statuses));
    };

    setPermissionsFun();
    setStructuresFun();
  }, []);

  const transformApiDataToRecord = (
    user: IDataId<IUser>
  ): IDataKey<IRecordUserData> => {
    return {
      key: user.id,
      name: user.name,
      surname: user.surname,
      email: user.email,
      permission: user.permission.id,
      permission_name: user.permission.name ? user.permission.name : "",
      status: user.status.id,
      status_name: user.status.name ? user.status.name : "",
    };
  };

  const transformRecordToApiData = (
    user: IDataKey<IRecordUserData>
  ): Partial<IUser> => {
    return {
      name: user.name,
      surname: user.surname,
      email: user.email,
      permission: { id: user.permission },
      status: { id: user.status },
    };
  };

  const formControls: IFormControl[] = [
    {
      formItemProps: {
        label: "Imię",
        name: "name",
        rules: [{ required: true }],
      },
      controlComp: CS.RegularInput,
      controlProps: {
        type: "text",
        placeholder: "",
      },
    },
    {
      formItemProps: {
        label: "Nazwisko",
        name: "surname",
        rules: [{ required: true }],
      },
      controlComp: CS.RegularInput,
      controlProps: {
        type: "text",
        placeholder: "",
      },
    },
    {
      formItemProps: {
        label: "Email",
        name: "email",
        rules: [{ required: true }],
      },
      controlComp: CS.RegularInput,
      controlProps: {
        type: "email",
        placeholder: "",
      },
    },
    {
      formItemProps: {
        label: "Uprawnienie",
        name: "permission",
        rules: [{ required: true }],
      },
      controlComp: CS.RegularSelect,
      controlProps: {
        defaultValue: "",
        options: permissionOptions,
      },
    },
    {
      formItemProps: {
        label: "Status",
        name: "status",
        rules: [{ required: true }],
        initialValue: 1,
      },
      controlComp: CS.RegularSelect,
      controlProps: {
        options: statusOptions,
      },
    },
  ];

  const tableWithFormProps: TableWithFormProps<IUser, IRecordUserData> = {
    table: {
      columns: userColumns,
      title: tableTitle,
    },
    apiData: {
      gets: getUsers,
      add: addUser,
      update: updateUser,
      remove: removeUser,
    },
    transform: {
      apiToRecord: transformApiDataToRecord,
      recordToApi: transformRecordToApiData,
    },
    formControls: formControls,
  };

  return <TableWithForm {...tableWithFormProps} />;
};

export default UsersTab;
