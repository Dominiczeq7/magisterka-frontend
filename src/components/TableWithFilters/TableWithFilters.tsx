import { Form, Table, TablePaginationConfig } from "antd";
import { PropsWithChildren, useEffect, useState } from "react";
import * as LS from "./TableWithFilters.styles";
import { fetchData } from "../../utils/api";
import { PAGE_SIZE, SCHEDULE_COLUMNS } from "./TableWithFilters.consts";
import TableWithFiltersProps, {
  IColumnHeader,
  IRecordScheduleData,
} from "./TableWithFilters.interfaces";
import moment from "moment";
import "moment/locale/pl";
import locale from "antd/es/date-picker/locale/pl_PL";
import { IFilters } from "../../interfaces/commonsInterfaces";

const TableWithFilters = <IData, IRecordData = {}>(
  props: PropsWithChildren<TableWithFiltersProps<IData, IRecordData>>
) => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [tableData, setTableData] = useState<IRecordScheduleData[]>([]);

  const [tableColumns, setTableColumns] = useState<IColumnHeader[]>(
    props.table.columns ? props.table.columns : SCHEDULE_COLUMNS
  );

  const [filtersOptions, setFiltersOptions] = useState<any>({});

  useEffect(() => {
    const convertFiltersOptions = (): any[] =>
      Object.keys(filtersOptions).map((key) => {
        const selectFilter = props.tableFilters!.find(
          (filter) => filter.formItemProps.name === key
        );

        const filters: IFilters = {
          selected: filtersOptions[key],
          func: selectFilter!.filterFunc!,
        };

        return filters;
      });

    fetchData(
      props.apiData.gets,
      setTableData,
      props.transform.apiToRecord,
      convertFiltersOptions()
    );

    if (!props.table.columns)
      setTableColumns((columns) =>
        columns.map((column, i) => {
          if (i >= 1 && i <= 5) {
            return {
              title: column.title,
              dataIndex: column.dataIndex,
              children: [
                {
                  title: "-",
                  dataIndex: column.dataIndex,
                },
              ],
            };
          } else {
            return column;
          }
        })
      );
  }, [
    filtersOptions,
    props,
    props.apiData.gets,
    props.table.columns,
    props.tableFilters,
    props.transform.apiToRecord,
  ]);

  const paginationConfig: TablePaginationConfig = {
    onChange: setCurrentPage,
    total: tableData.length,
    current: currentPage,
    pageSize: PAGE_SIZE,
  };

  const getPageData = (data: any[], current: number, pageSize: number) => {
    return data.slice((current - 1) * pageSize, current * pageSize);
  };

  const generateFilterControls = () => {
    return props.tableFilters?.map((prop, i) => {
      return (
        <Form onValuesChange={onFilterChange}>
          <LS.NormalFormItem {...prop.formItemProps}>
            <prop.controlComp {...prop.controlProps} />
          </LS.NormalFormItem>
        </Form>
      );
    });
  };

  const customDateFormat = (value: any) => {
    const weekDate = new Date(value);
    const day = weekDate.getDay();
    const from = weekDate.getDate() - day + (day === 0 ? -6 : 1);
    const fromDate = new Date(weekDate.setDate(from));
    const toDate = new Date(weekDate.setDate(from + 4));
    return `${fromDate.toLocaleDateString()}-${toDate.toLocaleDateString()}`;
  };

  function onFilterChange(changedValues: any): void {
    const key = Object.keys(changedValues)[0];
    const value = changedValues[key];

    setFiltersOptions((prev: any) => {
      prev![key] = value;

      return { ...prev };
    });
  }

  function onDateChange(date: moment.Moment | null, dateString: string): void {
    if (date instanceof moment) {
      const weekDate = new Date(date.toDate());
      const day = weekDate.getDay();
      const from = weekDate.getDate() - day + (day === 0 ? -6 : 1);

      setTableColumns((columns) =>
        columns.map((column, i) => {
          if (i >= 1 && i <= 5) {
            column.children![0].title = new Date(
              weekDate.setDate(from + i - 1)
            ).toLocaleDateString();
            return column;
          } else {
            return column;
          }
        })
      );
    } else {
      setTableColumns((columns) =>
        columns.map((column, i) => {
          if (i >= 1 && i <= 5) {
            column.children![0].title = "-";
            return column;
          } else {
            return column;
          }
        })
      );
    }
  }

  const showDatePicker = () => {
    return !props.table.columns ? (
      <LS.NormalFormItem label="Tydzień" name="week">
        <LS.RegularDatePicker
          locale={locale}
          onChange={onDateChange}
          picker="week"
          format={customDateFormat}
        />
      </LS.NormalFormItem>
    ) : undefined;
  };

  return (
    <>
      <LS.TableTopPanel>
        <LS.BottomHeader align="left">{props.table.title}</LS.BottomHeader>
        <LS.EmptySpaceToRight />
        {showDatePicker()}
        {generateFilterControls()}
      </LS.TableTopPanel>
      <LS.RegularTableContainer>
        <Table
          size="small"
          locale={{ emptyText: "Brak danych" }}
          pagination={paginationConfig}
          columns={tableColumns}
          dataSource={getPageData(tableData, currentPage, PAGE_SIZE)}
        />
      </LS.RegularTableContainer>
    </>
  );
};

export default TableWithFilters;
