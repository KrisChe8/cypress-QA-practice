describe("Перевірка сайту example.com", () => {
  it("відображає головний заголовок", () => {
    cy.visit("https://example.cypress.io");
    cy.contains("Kitchen Sink");
  });
});
