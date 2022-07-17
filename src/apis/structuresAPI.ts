import * as API from "../utils/api";
import { IStructure } from "../interfaces/usersInterfaces";
import { IDataId } from "../utils/api";

const STRUCTURES_ENDPOINT = "/structures/structures";

export const getStructures = async (): Promise<IDataId<IStructure>[]> => {
  const data = await API.get(STRUCTURES_ENDPOINT);
  return data ? data : [];
};

export const getStructure = async (
  id: number
): Promise<IDataId<IStructure>> => {
  return await API.get(STRUCTURES_ENDPOINT, id);
};

export const addStructures = async (data: Partial<IStructure>) => {
  return await API.add(STRUCTURES_ENDPOINT, data);
};

export const updateStructures = async (
  id: number,
  data: Partial<IStructure>
) => {
  return await API.update(STRUCTURES_ENDPOINT, id, data);
};

export const removeStructures = async (id: number) => {
  return await API.remove(STRUCTURES_ENDPOINT, id);
};
