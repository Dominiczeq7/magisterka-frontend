describe("Navigation", () => {
  const PAGE_ADDRESS = "/";

  beforeEach(() => {
    cy.setCookie("user", Cypress.env("login_cookie"));

    cy.visit(PAGE_ADDRESS);
  });

  it("Showing main page", function () {
    cy.get("#root").should("be.visible").contains("Strona główna");
  });

  it("To users", function () {
    cy.get("#root").contains("Zarządzanie jednostkami i strukturami").click();
    cy.get("#root").contains("Osoby").click();
    cy.get("#root").contains("span", "Osoby").should("exist");
  });

  it("To account", function () {
    cy.get("#root span.anticon-user").click();
    cy.get("#root").contains("span", "Twoje konto").should("exist");
  });

  it("To main page", function () {
    cy.get("#root").contains("a", "Harmonogramowanie").click();
    cy.get("#root").contains("span", "Strona główna").should("exist");
  });
});

describe("Visiting page without login", () => {
  it("To users", function () {
    cy.visit("/osoby");
    cy.get("#root").contains("span", "Osoby").should("not.exist");
  });

  it("To account", function () {
    cy.visit("/konto");
    cy.get("#root").contains("span", "Twoje konto").should("not.exist");
  });

  it("To main page", function () {
    cy.visit("/");
    cy.get("#root").contains("span", "Strona główna").should("not.exist");
  });
});
