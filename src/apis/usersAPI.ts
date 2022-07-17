import * as API from "../utils/api";
import {
  ILogin,
  ITeacher,
  IUser,
  IPermission,
  IStatus,
} from "../interfaces/usersInterfaces";
import { IDataId } from "../utils/api";

const USERS_ENDPOINT = "/users/users";
const TEACHERS_ENDPOINT = "/users/teachers";
const PERMISSIONS_ENDPOINT = "/users/permissions";
const STATUSES_ENDPOINT = "/users/statuses";

export const getUsers = async (): Promise<IDataId<IUser>[]> => {
  const data = await API.get(USERS_ENDPOINT);
  return data ? data : [];
};

export const getUser = async (id: number): Promise<IDataId<IUser>> => {
  return await API.get(USERS_ENDPOINT, id);
};

export const addUser = async (data: Partial<IUser>) => {
  return await API.add(USERS_ENDPOINT, data);
};

export const updateUser = async (id: number, data: Partial<IUser>) => {
  return await API.update(USERS_ENDPOINT, id, data);
};

export const removeUser = async (id: number) => {
  return await API.remove(USERS_ENDPOINT, id);
};

export const loginUser = async (data: ILogin): Promise<number> => {
  return await API.action("/users/login", data);
};

//teachers
export const getTeachers = async (): Promise<IDataId<ITeacher>[]> => {
  const data = await API.get(TEACHERS_ENDPOINT);
  return data ? data : [];
};

export const getTeacher = async (id: number): Promise<IDataId<ITeacher>> => {
  return await API.get(TEACHERS_ENDPOINT, id);
};

export const addTeacher = async (data: Partial<ITeacher>) => {
  return await API.add(TEACHERS_ENDPOINT, data);
};

export const updateTeacher = async (id: number, data: Partial<ITeacher>) => {
  return await API.update(TEACHERS_ENDPOINT, id, data);
};

export const removeTeacher = async (id: number) => {
  return await API.remove(TEACHERS_ENDPOINT, id);
};

//permissions
export const getUsersPermissions = async (): Promise<
  IDataId<IPermission>[]
> => {
  const data = await API.get(PERMISSIONS_ENDPOINT);
  return data ? data : [];
};

//statuses
export const getUsersStatuses = async (): Promise<IDataId<IStatus>[]> => {
  const data = await API.get(STATUSES_ENDPOINT);
  return data ? data : [];
};
