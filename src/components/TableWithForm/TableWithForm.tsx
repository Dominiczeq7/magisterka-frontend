import { Form, message, Table, TablePaginationConfig } from "antd";
import { PropsWithChildren, useEffect, useState } from "react";
import * as LS from "./TableWithForm.styles";
import * as CS from "../../styles/commons.styles";
import { fetchData, IDataId, IDataKey } from "../../utils/api";
import { saveDataToCsvFile } from "../../utils/file";
import { PAGE_SIZE } from "./TableWithForm.consts";
import { TableRowSelection } from "antd/lib/table/interface";
import TableWithFormProps from "./TableWithForm.interfaces";

type formModes = "view" | "add" | "edit";

/* eslint-disable no-template-curly-in-string */
const validateMessages = {
  required: "Pole ${label} jest wymagane!",
  types: {
    email: "${label} nie jest prawidłowy!",
  },
};
/* eslint-enable no-template-curly-in-string */

message.config({
  top: 600,
});

const TableWithForm = <IData, IRecordData>(
  props: PropsWithChildren<TableWithFormProps<IData, IRecordData>>
) => {
  const [selectedRecord, selectRecord] = useState<IDataKey<IRecordData> | null>(
    null
  );
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [userTableData, setUserTableData] = useState<IRecordData[]>([]);
  const [formMode, setFormMode] = useState<formModes>("view");
  const [form] = Form.useForm();

  useEffect(() => {
    fetchData(
      props.apiData.gets,
      setUserTableData,
      props.transform.apiToRecord
    );
  }, [props.apiData.gets, props.transform.apiToRecord]);

  let formTitle: string = "";
  if (selectedRecord === null && formMode !== "add") {
    formTitle = "Wybierz rekord";
  } else {
    if (formMode === "view") {
      formTitle = "Podgląd rekordu";
    } else if (formMode === "edit") {
      formTitle = "Edycja rekordu";
    } else if (formMode === "add") {
      formTitle = "Dodawanie rekordu";
    }
  }

  function onAddButtonClick() {
    setFormMode("add");
    form.resetFields();
  }

  function onEditButtonClick() {
    setFormMode("edit");
  }

  async function onRemoveButtonClick() {
    if (selectedRecord) {
      const response = await props.apiData.remove!(selectedRecord.key);

      if (response) {
        fetchData(
          props.apiData.gets,
          setUserTableData,
          props.transform.apiToRecord
        );
        selectRecord(null);
        form.resetFields();
        message.success(`Pomyślnie usunięto rekord.`);
      } else {
        message.error(`Operacja zakończyła się błędem.`);
      }
    }
  }

  const importData = () => {
    saveDataToCsvFile(props.table.title, userTableData, props.table.columns);
  };

  const paginationConfig: TablePaginationConfig = {
    onChange: setCurrentPage,
    total: userTableData.length,
    current: currentPage,
    pageSize: PAGE_SIZE,
  };

  const rowSelectionConfig: TableRowSelection<any> = {
    selectedRowKeys: [selectedRecord?.key ? selectedRecord.key : -1],
    type: "radio",
  };

  const getPageData = (data: any[], current: number, pageSize: number) => {
    return data.slice((current - 1) * pageSize, current * pageSize);
  };

  const selectRow = (record: IDataKey<IRecordData>) => {
    if (selectedRecord?.key === record.key) {
      selectRecord(null);
      form.resetFields();
    } else {
      selectRecord(record);
      form.setFieldsValue(record);
    }
  };

  const leftSection = (
    <LS.GridCol>
      <LS.TableTopPanel>
        <LS.TableTitle>
          <CS.RegularHeader align="left">{props.table.title}</CS.RegularHeader>
        </LS.TableTitle>
        <LS.TableButtons>
          <CS.RegularButton onClick={importData} disabled={formMode !== "view"}>
            Eksportuj
          </CS.RegularButton>
        </LS.TableButtons>
      </LS.TableTopPanel>
      <LS.SelectableTableContainer>
        <Table
          loading={formMode !== "view"}
          size="small"
          locale={{ emptyText: "Brak danych" }}
          pagination={paginationConfig}
          rowSelection={rowSelectionConfig}
          columns={props.table.columns}
          dataSource={getPageData(userTableData, currentPage, PAGE_SIZE)}
          onRow={(record, id) => ({
            onClick: () => {
              selectRow(record);
            },
          })}
        />
      </LS.SelectableTableContainer>
    </LS.GridCol>
  );

  const onSubmit = async (values: IDataKey<IRecordData>) => {
    let dataToSend: Partial<IData> = props.transform.recordToApi(values);

    let response: undefined | IDataId<IData>;
    let messageType: string = "";
    if (formMode === "add") {
      response = await props.apiData.add!(dataToSend);
      messageType = "dodano";
    } else {
      response = await props.apiData.update!(selectedRecord!.key, dataToSend);
      messageType = "zaktualizowano";
    }

    setFormMode("view");
    if (response !== undefined) {
      message.success(`Pomyślnie ${messageType} rekord.`);
      fetchData(
        props.apiData.gets,
        setUserTableData,
        props.transform.apiToRecord
      );
      selectRecord(props.transform.apiToRecord(response));
    } else {
      message.error("Operacja zakończyła się błędem.");
    }
  };

  function onCancelButtonClick() {
    setFormMode("view");
    selectedRecord ? form.setFieldsValue(selectedRecord) : form.resetFields();
  }

  const generateFormControls = () => {
    return props.formControls.map((prop, i) => {
      const isViewMode = formMode === "view";
      const required = isViewMode ? { required: false } : {};
      return (
        <CS.RegularFormItem
          labelCol={{ span: 24 }}
          {...required}
          {...prop.formItemProps}
        >
          <prop.controlComp disabled={isViewMode} {...prop.controlProps} />
        </CS.RegularFormItem>
      );
    });
  };

  const rightSection = (
    <LS.FormCol>
      <CS.RegularHeader>{formTitle}</CS.RegularHeader>
      <LS.RegularForm
        name="normal_login"
        className="login-form"
        initialValues={{ remember: true }}
        onFinish={onSubmit}
        validateMessages={validateMessages}
        form={form}
      >
        {generateFormControls()}
        <CS.SubmitFormItem>
          {formMode !== "view" ? (
            <>
              <CS.SubmitButton>Zapisz</CS.SubmitButton>
              <CS.CancelButton onClick={onCancelButtonClick}>
                Anuluj
              </CS.CancelButton>
            </>
          ) : undefined}
        </CS.SubmitFormItem>
      </LS.RegularForm>
    </LS.FormCol>
  );

  return (
    <>
      <LS.ActionPanel>
        {props.apiData.add ? (
          <LS.ActionButton
            onClick={onAddButtonClick}
            disabled={formMode !== "view"}
          >
            Dodaj
          </LS.ActionButton>
        ) : undefined}
        {props.apiData.update ? (
          <LS.ActionButton
            onClick={onEditButtonClick}
            disabled={selectedRecord === null || formMode !== "view"}
          >
            Edytuj
          </LS.ActionButton>
        ) : undefined}
        {props.apiData.remove ? (
          <LS.ActionButton
            onClick={onRemoveButtonClick}
            disabled={selectedRecord === null || formMode !== "view"}
          >
            Usuń
          </LS.ActionButton>
        ) : undefined}
      </LS.ActionPanel>
      <LS.GridFormRow>
        {leftSection}
        {rightSection}
      </LS.GridFormRow>
    </>
  );
};

export default TableWithForm;
