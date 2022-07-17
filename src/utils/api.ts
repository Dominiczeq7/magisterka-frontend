import axios from "axios";
import configData from "../config.json";
import { IFilters } from "../interfaces/commonsInterfaces";

const IS_DEV_ENV = process.env.NODE_ENV === "development";
let SERVER_ADDRESS: string = "";
const ACTUAL_SERVER_URL =
  window.location.protocol + "//" + window.location.hostname;

if (IS_DEV_ENV) {
  SERVER_ADDRESS = configData.DEV_SERVER_URL
    ? configData.DEV_SERVER_URL
    : ACTUAL_SERVER_URL;
  SERVER_ADDRESS += ":" + configData.DEV_SERVER_IP;
  console.info(`Frontend server: ${window.location.origin}`);
  console.info(`Backend server: ${SERVER_ADDRESS}`);
} else {
  SERVER_ADDRESS = configData.PROD_SERVER_URL
    ? configData.PROD_SERVER_URL
    : ACTUAL_SERVER_URL;
  SERVER_ADDRESS += ":" + configData.PROD_SERVER_IP;
}

const API = axios.create({
  baseURL: SERVER_ADDRESS,
});

interface IResponse {
  response: { data: any; status: any; headers: any };
  request: any;
  message: any;
  config: any;
}

function catchError(error: IResponse) {
  if (error.response) {
    if (IS_DEV_ENV) {
      console.log(error.response.data);
      console.log(error.response.status);
      console.log(error.response.headers);
    }
  } else if (error.request) {
    if (IS_DEV_ENV) {
      console.log(error.request);
    }
  } else {
    if (IS_DEV_ENV) {
      console.log("Error", error.message);
    }
  }
  if (IS_DEV_ENV) {
    console.log(error.config);
  }
}

export const get = (endpoint: string, id?: number) =>
  API.get(id ? `${endpoint}/${id}` : endpoint)
    .then((res) => {
      return res.data;
    })
    .catch(catchError);

export const add = (endpoint: string, data: any) =>
  API.post(endpoint, data)
    .then((res) => {
      if (IS_DEV_ENV) {
        console.log(res);
        return res.data;
      }
    })
    .catch(catchError);

export const update = (endpoint: string, id: any, data: any) =>
  API.patch(`${endpoint}/${id}`, data)
    .then((res) => {
      if (IS_DEV_ENV) {
        console.log(res);
        return res.data;
      }
    })
    .catch(catchError);

export const remove = (endpoint: string, id: any) =>
  API.delete(`${endpoint}/${id}`)
    .then((res) => {
      if (IS_DEV_ENV) {
        console.log(res);
        return res.data;
      }
    })
    .catch(catchError);

export const action = async (endpoint: string, data: any) =>
  await API.post(endpoint, data)
    .then((res) => {
      return res.data;
    })
    .catch(catchError);

export type IDataId<T extends any> = T & {
  id: number;
};

export type IDataKey<T extends any> = T & {
  key: number;
};

export async function fetchData(
  getFun: () => Promise<IDataId<any>[]>,
  setHook: React.Dispatch<React.SetStateAction<IDataId<any>[]>>,
  transform?: (data: IDataId<any>) => IDataKey<any>,
  filters?: IFilters[]
) {
  try {
    let responseData = await getFun();

    console.log("filters: ", filters);

    filters?.forEach(
      (filter) =>
        (responseData = filter.selected
          ? filter.func(responseData, filter.selected)
          : responseData)
    );

    setHook(
      transform ? responseData.map((data) => transform(data)) : responseData
    );
    return responseData.length ? true : false;
  } catch (error) {
    console.log("error", error);
  }
}
