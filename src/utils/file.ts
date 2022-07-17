interface IColumnsHeaders {
  title: string;
  dataIndex: string;
}

export const saveDataToCsvFile = (
  fileName: string,
  jsonData: any[],
  columnsHeaders: IColumnsHeaders[]
) => {
  const csvData = convertJsonToCsv(jsonData, columnsHeaders);
  const blob = new Blob([csvData], { type: "text/plain" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.download = `${fileName}.csv`;
  link.href = url;
  link.click();
};

const convertJsonToCsv = (
  jsonData: object[],
  columnsHeaders: IColumnsHeaders[]
) => {
  const replacer = (_key: any, value: any) => (value === null ? "" : value);
  columnsHeaders.unshift({ title: "ID", dataIndex: "key" });
  const headers: string[] = columnsHeaders.map((column) => `"${column.title}"`);
  const csvData = [
    headers.join(","),
    ...jsonData.map((row: { [x: string]: any }) =>
      columnsHeaders
        .map((header) => JSON.stringify(row[header.dataIndex], replacer))
        .join(",")
    ),
  ].join("\r\n");

  return csvData;
};
