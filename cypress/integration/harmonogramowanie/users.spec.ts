const fillRecord = (record: Object, tabId: string) => {
  Object.keys(record).forEach((key) => {
    if (record[key].type === "input") {
      cy.get(`#rc-tabs-0-panel-${tabId} #normal_login_${key}`)
        .should("not.have.class", "ant-input-disabled")
        .clear()
        .type(record[key].value);
    } else if (record[key].type === "select") {
      cy.get(`#rc-tabs-0-panel-${tabId} #normal_login_${key}`).should(
        "not.have.class",
        "ant-select-disabled"
      );
      cy.get(`#rc-tabs-0-panel-${tabId} #normal_login_permission`).click({
        force: true,
      });

      cy.get('div[title="brak"]').click({ force: true });
    }
  });
};

describe("Users", () => {
  const PAGE_ADDRESS = "/osoby";
  const TAB_ID = "users";
  const DEFAULT_RECORD = {
    name: {
      type: "input",
      value: "Test name",
    },
    surname: {
      type: "input",
      value: "Test surname",
    },
    email: {
      type: "input",
      value: "test@email.com",
    },
    permission: {
      type: "select",
      value: "podstawowe",
    },
    status: {
      type: "select",
      value: "aktywny",
    },
  };

  const DEFAULT_RECORD2 = {
    name: {
      type: "input",
      value: "Test name1",
    },
    surname: {
      type: "input",
      value: "Test surname1",
    },
    email: {
      type: "input",
      value: "test1@email.com",
    },
    permission: {
      type: "select",
      value: "brak",
    },
    status: {
      type: "select",
      value: "nieaktywny",
    },
  };

  beforeEach(() => {
    cy.setCookie("user", Cypress.env("login_cookie"));

    cy.visit(PAGE_ADDRESS);
    cy.get(`#rc-tabs-0-tab-${TAB_ID}`).click();
  });

  it("Showing page", function () {
    cy.get("#root").should("be.visible").contains("Lista osób");
  });

  it("At least one record exists", function () {
    cy.get(`#rc-tabs-0-panel-${TAB_ID} .ant-table-tbody > .ant-table-row`)
      .first()
      .find("td")
      .should("be.visible", "")
      .should("not.have.text", "");
  });

  it("Select first record in table", function () {
    cy.get(
      `#rc-tabs-0-panel-${TAB_ID} #normal_login > .ant-row > .ant-form-item-control`
    )
      .eq(0)
      .find("input")
      .invoke("val")
      .should("eq", "");
    cy.get(`#rc-tabs-0-panel-${TAB_ID} .ant-table-tbody > .ant-table-row`)
      .first()
      .click();
    cy.get(`#rc-tabs-0-panel-${TAB_ID} .ant-typography`)
      .eq(1)
      .should("have.text", "Podgląd rekordu");
    cy.get(
      `#rc-tabs-0-panel-${TAB_ID} #normal_login > .ant-row > .ant-form-item-control`
    )
      .eq(0)
      .find("input")
      .invoke("val")
      .should("not.eq", "");
  });

  it("Adding record successfull", function () {
    cy.get(`#rc-tabs-0-panel-${TAB_ID} .ant-spin-spinning`).should("not.exist");
    cy.get(`#rc-tabs-0-panel-${TAB_ID}`).contains("Dodaj").click();
    cy.get(`#rc-tabs-0-panel-${TAB_ID} .ant-spin-spinning`).should(
      "be.visible"
    );

    fillRecord(DEFAULT_RECORD, TAB_ID);
    cy.get(`#rc-tabs-0-panel-${TAB_ID}`).contains("Zapisz").click();

    cy.get(".ant-message-notice-content")
      .should("be.visible")
      .contains("Pomyślnie dodano rekord.")
      .should("exist");
  });

  it("Adding record unsuccessfully", function () {
    cy.get(`#rc-tabs-0-panel-${TAB_ID}`).contains("Dodaj").click();

    fillRecord(DEFAULT_RECORD, TAB_ID);
    cy.get(`#rc-tabs-0-panel-${TAB_ID}`).contains("Zapisz").click();

    cy.get(".ant-message-notice-content")
      .should("be.visible")
      .contains("Operacja zakończyła się błędem.")
      .should("exist");
  });

  it("Adding empty record", function () {
    cy.get(`#rc-tabs-0-panel-${TAB_ID}`).contains("Dodaj").click();

    cy.get(`#rc-tabs-0-panel-${TAB_ID}`).contains("Zapisz").click();

    cy.get(`#rc-tabs-0-panel-${TAB_ID} .ant-form-item-has-error`).should(
      "exist"
    );
  });

  it("Editing record", function () {
    cy.get(`#rc-tabs-0-panel-${TAB_ID} .ant-spin-spinning`).should("not.exist");
    cy.get(`#rc-tabs-0-panel-${TAB_ID} .ant-pagination-item`).eq(-1).click();
    cy.get(`#rc-tabs-0-panel-${TAB_ID} .ant-table-tbody > .ant-table-row`)
      .eq(-1)
      .click();
    cy.get(`#rc-tabs-0-panel-${TAB_ID}`).contains("Edytuj").click();
    cy.get(`#rc-tabs-0-panel-${TAB_ID} .ant-spin-spinning`).should(
      "be.visible"
    );

    fillRecord(DEFAULT_RECORD2, TAB_ID);
    cy.get(`#rc-tabs-0-panel-${TAB_ID}`).contains("Zapisz").click();

    cy.get(".ant-message-notice-content")
      .should("be.visible")
      .contains("Pomyślnie zaktualizowano rekord.")
      .should("exist");
  });

  it("Removing record", function () {
    cy.get(`#rc-tabs-0-panel-${TAB_ID} .ant-pagination-item`).eq(-1).click();

    cy.get(`#rc-tabs-0-panel-${TAB_ID} .ant-table-tbody > .ant-table-row`)
      .eq(-1)
      .click();

    cy.get(`#rc-tabs-0-panel-${TAB_ID}`).contains("Usuń").click();

    cy.get(".ant-message-notice-content")
      .should("be.visible")
      .contains("Pomyślnie usunięto rekord.")
      .should("exist");
  });
});

describe("Teachers", () => {
  const PAGE_ADDRESS = "/osoby";
  const TAB_ID = "teachers";

  beforeEach(() => {
    cy.setCookie("user", Cypress.env("login_cookie"));

    cy.visit(PAGE_ADDRESS);
    cy.get(`#rc-tabs-0-tab-${TAB_ID}`).click();
  });

  it("Showing page", function () {
    cy.get("#root").should("be.visible").contains("Lista nauczycieli");
  });

  it("At least one record exists", function () {
    cy.get(`#rc-tabs-0-panel-${TAB_ID} .ant-table-tbody > .ant-table-row`)
      .first()
      .find("td")
      .should("be.visible", "")
      .should("not.have.text", "");
  });

  it("Select first record in table", function () {
    cy.get(
      `#rc-tabs-0-panel-${TAB_ID} #normal_login > .ant-row > .ant-form-item-control`
    )
      .eq(0)
      .find(".ant-select-selection-item")
      .invoke("text")
      .should("eq", "");
    cy.get(`#rc-tabs-0-panel-${TAB_ID} .ant-table-tbody > .ant-table-row`)
      .first()
      .click();
    cy.get(`#rc-tabs-0-panel-${TAB_ID} .ant-typography`)
      .eq(1)
      .should("have.text", "Podgląd rekordu");
    cy.get(
      `#rc-tabs-0-panel-${TAB_ID} #normal_login > .ant-row > .ant-form-item-control`
    )
      .eq(0)
      .find(".ant-select-selection-item")
      .invoke("text")
      .should("not.eq", "");
  });
});
