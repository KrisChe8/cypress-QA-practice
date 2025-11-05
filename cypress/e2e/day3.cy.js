describe("Posts Fetch Test", () => {
  it("Check API with posts, should return 100 posts/ 5 posts after slice", () => {
    cy.request("https://jsonplaceholder.typicode.com/posts").then(
      (response) => {
        expect(response.status).to.eq(200);
        // Має бути 100 постів
        expect(response.body).to.have.length(100);
        // Перевіряємо лише перші 5
        const firstFive = response.body.slice(0, 5);
        expect(firstFive).to.have.length(5);
        cy.log(JSON.stringify(firstFive.map((p) => p.title)));
      }
    );
  });
  it.skip("Should load the first five posts", () => {
    // за умови наявності вебсторінки, яка завантажує 5 постів по кліку
    cy.visit("https://yourapplication.com"); // Ensure this URL points to your test application
    cy.get("button#loadPosts").click();
    cy.get("ul#postsList > li").should("have.length", 5); // Corrected assertion
  });
});
describe("Advanced Selectors", () => {
  it("Form auth - Verify that you are redirected to the secure area and that a logout button is visible", () => {
    cy.visit("https://the-internet.herokuapp.com/");
    cy.get('a[href="/login"]').click();
    cy.contains("h2", "Login Page");
    cy.get("input#username").type("tomsmith");
    cy.get("input#password").type("SuperSecretPassword!");
    cy.get('button[type="Submit"]').click();
    cy.contains("h2", "Secure Area");
    cy.contains("a", "Logout").click();
  });
});
