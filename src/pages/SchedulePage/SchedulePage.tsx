import { Tabs } from "antd";
import { useEffect, useState } from "react";
import { getClasses } from "../../apis/groupsAPI";
import { getSchedules, getScheduleVersions } from "../../apis/schedulesAPI";
import NavigationPanel from "../../components/NavigationPanel/NavigationPanel";
import TableWithFilters from "../../components/TableWithFilters/TableWithFilters";
import {
  IFilterControl,
  TableWithFiltersProps,
} from "../../components/TableWithFilters/TableWithFilters.interfaces";
import { IListOption } from "../../interfaces/commonsInterfaces";
import { IClass } from "../../interfaces/groupsInterfaces";
import {
  ISchedule,
  IScheduleVersion,
} from "../../interfaces/schedulesInterfaces";
import * as CS from "../../styles/commons.styles";
import { IDataId, IDataKey } from "../../utils/api";

const { TabPane } = Tabs;

interface IRecordScheduleData {
  key: number;
  hour: string;
  monday: string;
  tuesday: string;
  wednesday: string;
  thursday: string;
  friday: string;
  sum: string;
}

const tableTitle = "Plan zajęć";

// TODO: Dostosować pod API schedules
const transformApiDataToRecord = (
  schedule: IDataId<any>
): IDataKey<IRecordScheduleData> => {
  return {
    key: schedule.id,
    hour: schedule.hour,
    monday: schedule.monday,
    tuesday: schedule.tuesday,
    wednesday: schedule.wednesday,
    thursday: schedule.thursday,
    friday: schedule.friday,
    sum: schedule.sum,
  };
};

function classesOptionsConv(classes: IDataId<IClass>[]): IListOption[] {
  return classes.map((classObj) => {
    return {
      label: `${classObj.structure.name} (${classObj.start_year}-${classObj.end_year})`,
      value: classObj.id,
    };
  });
}

function versionsOptionsConv(
  classes: IDataId<IScheduleVersion>[]
): IListOption[] {
  return classes.map((version) => {
    return {
      label: `${version.number} (${version.status.name})`,
      value: version.id,
    };
  });
}

function classesFilterFunc(
  data: IDataId<ISchedule>[],
  selected: number
): IDataId<ISchedule>[] {
  return data.filter((d) => d.activity.group.id === selected);
}

function versionsFilterFunc(
  data: IDataId<ISchedule>[],
  selected: number
): IDataId<ISchedule>[] {
  return data.filter((d) => d.version.id === selected);
}

const SchedulePage = () => {
  const [classesOptions, setClassesOptions] = useState<IListOption[]>([]);
  const [versionsOptions, setVersionsOptions] = useState<IListOption[]>([]);

  useEffect(() => {
    const setClassesFun = async () => {
      const classes = await getClasses();
      setClassesOptions(classesOptionsConv(classes));
    };
    const setVersionsFun = async () => {
      const versions = await getScheduleVersions();
      setVersionsOptions(versionsOptionsConv(versions));
    };

    setClassesFun();
    setVersionsFun();
  }, []);

  const classesFilterControls: IFilterControl[] = [
    {
      formItemProps: {
        label: "Klasa",
        name: "class",
      },
      controlComp: CS.RegularSelect,
      controlProps: {
        defaultValue: "",
        options: classesOptions,
      },
      filterFunc: classesFilterFunc,
    },
    {
      formItemProps: {
        label: "Wersja",
        name: "version",
      },
      controlComp: CS.RegularSelect,
      controlProps: {
        defaultValue: "",
        options: versionsOptions,
      },
      filterFunc: versionsFilterFunc,
    },
  ];

  const classesTableWithFormProps: TableWithFiltersProps<ISchedule> = {
    table: {
      title: tableTitle,
    },
    apiData: {
      gets: getSchedules,
    },
    transform: {
      apiToRecord: transformApiDataToRecord,
    },
    tableFilters: classesFilterControls,
  };

  const teachersFilterControls: IFilterControl[] = [
    {
      formItemProps: {
        label: "Nauczyciel",
        name: "teacher",
      },
      controlComp: CS.RegularSelect,
      controlProps: {
        defaultValue: "",
        // options: permissionOptions,
      },
    },
    {
      formItemProps: {
        label: "Wersja",
        name: "version",
      },
      controlComp: CS.RegularSelect,
      controlProps: {
        defaultValue: "",
        // options: permissionOptions,
      },
    },
  ];

  const teachersTableWithFormProps: TableWithFiltersProps<ISchedule> = {
    table: {
      title: tableTitle,
    },
    apiData: {
      gets: getSchedules,
    },
    transform: {
      apiToRecord: transformApiDataToRecord,
    },
    tableFilters: teachersFilterControls,
  };

  return (
    <>
      <NavigationPanel title="Plan zajęć" />
      <Tabs defaultActiveKey="classes" centered>
        <TabPane tab="Klasy" key="classes">
          <TableWithFilters {...classesTableWithFormProps} />
        </TabPane>
        <TabPane tab="Nauczyciele" key="teachers">
          <TableWithFilters {...teachersTableWithFormProps} />
        </TabPane>
      </Tabs>
    </>
  );
};

export default SchedulePage;
