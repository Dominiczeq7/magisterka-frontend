import { ISchedule, IScheduleVersion } from "../interfaces/schedulesInterfaces";
import * as API from "../utils/api";
import { IDataId } from "../utils/api";

const ENDPOINT_SCHEDULES = "/schedules/schedules";
const ENDPOINT_VERSIONS = "/schedules/versions";

// SCHEDULES //
export const getSchedules = async (): Promise<IDataId<ISchedule>[]> => {
  const data = await API.get(ENDPOINT_SCHEDULES);
  return data ? data : [];
};

export const getSchedule = async (id: number): Promise<IDataId<ISchedule>> => {
  return await API.get(ENDPOINT_SCHEDULES, id);
};

export const addSchedule = async (data: Partial<ISchedule>) => {
  return await API.add(ENDPOINT_SCHEDULES, data);
};

export const updateSchedule = async (id: number, data: Partial<ISchedule>) => {
  return await API.update(ENDPOINT_SCHEDULES, id, data);
};

export const removeSchedule = async (id: number) => {
  return await API.remove(ENDPOINT_SCHEDULES, id);
};

// VERSIONS //
export const getScheduleVersions = async (): Promise<
  IDataId<IScheduleVersion>[]
> => {
  const data = await API.get(ENDPOINT_VERSIONS);
  return data ? data : [];
};

export const getScheduleVersion = async (
  id: number
): Promise<IDataId<IScheduleVersion>> => {
  return await API.get(ENDPOINT_VERSIONS, id);
};

export const addScheduleVersion = async (data: Partial<IScheduleVersion>) => {
  return await API.add(ENDPOINT_VERSIONS, data);
};

export const updateScheduleVersion = async (
  id: number,
  data: Partial<IScheduleVersion>
) => {
  return await API.update(ENDPOINT_VERSIONS, id, data);
};

export const removeScheduleVersion = async (id: number) => {
  return await API.remove(ENDPOINT_VERSIONS, id);
};
