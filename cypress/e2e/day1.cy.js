describe("Day 1 - basic checks on Kitchen Sink", () => {
  beforeEach(() => {
    cy.visit("/"); // baseUrl встановлений в конфігу
  });
  it("has Kitchen Sink heading", () => {
    cy.contains("Kitchen Sink").should("be.visible");
  });
  it("has Commands heading", () => {
    cy.contains("Commands").should("be.visible");
  });
  it("navigates to commands example and checks title ", () => {
    cy.contains("Commands").click();
    cy.contains("Querying").should("exist");
    cy.contains("Misc").should("exist");
    cy.contains("Misk").should("not.exist");
  });
  it.skip("search box accepts typing and shows result", () => {
    // приклад взаємодії з формою
    cy.get('input[placeholder="Search"]').type("get");
    cy.get(".search-results").should("contain.text", "get");
  });
});
