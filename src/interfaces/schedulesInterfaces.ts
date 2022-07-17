import { IDataId } from "../utils/api";
import { IGroup } from "./groupsInterfaces";

export interface ISchedule {
  date_from: Date;
  duration: number;
  activity: IActivity;
  version: IDataId<IScheduleVersion>;
  classroom: IClassroom;
}

// TODO: przenieść do interfejsu Activities oraz dorobić
export interface IActivity {
  group: IDataId<IGroup>;
}

export interface IScheduleVersion {
  number: number;
  status: IScheduleStatus;
}

export interface IScheduleStatus {
  name: string;
}

// TODO: przenieść do interfejsu Classrooms
export interface IClassroom {}
