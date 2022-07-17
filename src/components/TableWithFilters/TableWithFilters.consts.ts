import { IColumnHeader } from "./TableWithFilters.interfaces";

export const PAGE_SIZE = 10;

export const SCHEDULE_COLUMNS: IColumnHeader[] = [
  {
    title: "Godzina",
    dataIndex: "hour",
  },
  {
    title: "Poniedziałek",
    dataIndex: "monday",
  },
  {
    title: "Wtorek",
    dataIndex: "tuesday",
  },
  {
    title: "Środa",
    dataIndex: "wednesday",
  },
  {
    title: "Czwartek",
    dataIndex: "thursday",
  },
  {
    title: "Piątek",
    dataIndex: "friday",
  },
  {
    title: "=",
    dataIndex: "sum",
  },
];
