import {
  addTeacher,
  getTeachers,
  getUsers,
  removeTeacher,
  updateTeacher,
} from "../../../apis/usersAPI";
import TableWithForm from "../../../components/TableWithForm/TableWithForm";
import {
  IFormControl,
  IListOption,
  TableWithFormProps,
} from "../../../components/TableWithForm/TableWithForm.interfaces";
import {
  IStructure,
  ITeacher,
  IUser,
} from "../../../interfaces/usersInterfaces";
import * as CS from "../../../styles/commons.styles";
import { IDataId, IDataKey } from "../../../utils/api";
import { useState, useEffect } from "react";
import { getStructures } from "../../../apis/structuresAPI";

interface IRecordTeacherData {
  key: number;
  user: number;
  user_name: string;
  title: string;
  position: string;
  structures: number | null;
  structure_name: string;
}

const tableTitle = "Lista nauczycieli";

const teacherColumns = [
  {
    title: "Imię i Nazwisko",
    dataIndex: "user_name",
  },
  {
    title: "Tytuł",
    dataIndex: "title",
  },
  {
    title: "Stanowisko",
    dataIndex: "position",
  },
  {
    title: "Wydział",
    dataIndex: "structure_name",
  },
];

function usersOptionsConv(users: IDataId<IUser>[]): IListOption[] {
  return users.map((user) => {
    return { label: `${user.name} ${user.surname}`, value: user.id };
  });
}

function structuresOptionsConv(
  structures: IDataId<IStructure>[]
): IListOption[] {
  return structures.map((structure) => {
    return { label: structure.name, value: structure.id };
  });
}

const TeachersTab = () => {
  const [usersOptions, setUsersOptions] = useState<IListOption[]>([]);
  const [structuresOptions, setStructuresOptions] = useState<IListOption[]>([]);

  useEffect(() => {
    const setUsersFun = async () => {
      const users = await getUsers();
      setUsersOptions(usersOptionsConv(users));
    };

    const setStructuresFun = async () => {
      const structures = await getStructures();
      setStructuresOptions(structuresOptionsConv(structures));
    };

    setUsersFun();
    setStructuresFun();
  }, []);

  const transformApiDataToRecord = (
    teacher: IDataId<ITeacher>
  ): IDataKey<IRecordTeacherData> => {
    return {
      key: teacher.id,
      user: teacher.user.id,
      user_name: `${teacher.user.name} ${teacher.user.surname}`,
      title: teacher.title,
      position: teacher.position,
      structures: teacher.structures[0] ? teacher.structures[0].id : null,
      structure_name: teacher.structures[0] ? teacher.structures[0].name! : "",
    };
  };

  const transformRecordToApiData = (
    teacher: IDataKey<IRecordTeacherData>
  ): Partial<ITeacher> => {
    return {
      user: { id: teacher.user },
      title: teacher.title,
      position: teacher.position,
      structures: [{ id: teacher.structures ? teacher.structures : 0 }],
    };
  };

  const formControls: IFormControl[] = [
    {
      formItemProps: {
        label: "Imię i nazwisko",
        name: "user",
        rules: [{ required: true }],
      },
      controlComp: CS.RegularSelect,
      controlProps: {
        defaultValue: "",
        options: usersOptions,
      },
    },
    {
      formItemProps: {
        label: "Tytuł",
        name: "title",
        rules: [{ required: false }],
      },
      controlComp: CS.RegularInput,
      controlProps: {
        type: "text",
        placeholder: "",
      },
    },
    {
      formItemProps: {
        label: "Stanowisko",
        name: "position",
        rules: [{ required: false }],
      },
      controlComp: CS.RegularInput,
      controlProps: {
        type: "text",
        placeholder: "",
      },
    },
    {
      formItemProps: {
        label: "Wydział",
        name: "structures",
        rules: [{ required: true }],
      },
      controlComp: CS.RegularSelect,
      controlProps: {
        defaultValue: "",
        options: structuresOptions,
      },
    },
  ];

  const tableWithFormProps: TableWithFormProps<ITeacher, IRecordTeacherData> = {
    table: {
      columns: teacherColumns,
      title: tableTitle,
    },
    apiData: {
      gets: getTeachers,
      add: addTeacher,
      update: updateTeacher,
      remove: removeTeacher,
    },
    transform: {
      apiToRecord: transformApiDataToRecord,
      recordToApi: transformRecordToApiData,
    },
    formControls: formControls,
  };

  return <TableWithForm {...tableWithFormProps} />;
};
export default TeachersTab;
