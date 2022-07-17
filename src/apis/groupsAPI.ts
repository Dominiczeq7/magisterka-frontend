import * as API from "../utils/api";
import { IDataId } from "../utils/api";
import { IClass, IGroup } from "../interfaces/groupsInterfaces";

const ENDPOINT_GROUPS = "/groups/groups";
const ENDPOINT_CLASSES = "/groups/classes";

// GROUP //
export const getGroups = async (): Promise<IDataId<IGroup>[]> => {
  const data = await API.get(ENDPOINT_GROUPS);
  return data ? data : [];
};

export const getGroup = async (id: number): Promise<IDataId<IGroup>> => {
  return await API.get(ENDPOINT_GROUPS, id);
};

export const addGroup = async (data: Partial<IGroup>) => {
  return await API.add(ENDPOINT_GROUPS, data);
};

export const updateGroup = async (id: number, data: Partial<IGroup>) => {
  return await API.update(ENDPOINT_GROUPS, id, data);
};

export const removeGroup = async (id: number) => {
  return await API.remove(ENDPOINT_GROUPS, id);
};

// CLASS //
export const getClasses = async (): Promise<IDataId<IClass>[]> => {
  const data = await API.get(ENDPOINT_CLASSES);
  return data ? data : [];
};

export const getClass = async (id: number): Promise<IDataId<IClass>> => {
  return await API.get(ENDPOINT_CLASSES, id);
};

export const addClass = async (data: Partial<IClass>) => {
  return await API.add(ENDPOINT_CLASSES, data);
};

export const updateClass = async (id: number, data: Partial<IClass>) => {
  return await API.update(ENDPOINT_CLASSES, id, data);
};

export const removeClass = async (id: number) => {
  return await API.remove(ENDPOINT_CLASSES, id);
};
