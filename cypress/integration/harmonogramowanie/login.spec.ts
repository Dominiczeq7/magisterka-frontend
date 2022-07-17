describe("Login", () => {
  const PAGE_ADDRESS = "/";

  beforeEach(() => {
    cy.visit(PAGE_ADDRESS);
  });

  it("Showing page", function () {
    cy.get("#root").should("be.visible").contains("Logowanie");
  });

  it("Logging successful", function () {
    cy.get("#normal_login_email").type("ryba@poczta.pl");
    cy.get("#normal_login_password").type("ryba@poczta.pl");
    cy.get(".ant-btn-primary").click();
    cy.get("#root").should("be.visible").contains("Strona główna");
  });

  it("Logging failed", function () {
    cy.get("#normal_login_email").type("ryba@poczta.pl");
    cy.get("#normal_login_password").type("incorrect");
    cy.get(".ant-btn-primary").click();
    cy.get(".ant-message-notice-content").should("be.visible");
  });
});

describe("Logout", () => {
  const PAGE_ADDRESS = "/";

  beforeEach(() => {
    cy.setCookie("user", Cypress.env("login_cookie"));
    cy.visit(PAGE_ADDRESS);
  });

  it("Logout successful", function () {
    cy.get("#root span.anticon-unlock").click();
    cy.get("#root").contains("div", "Logowanie");
  });
});
