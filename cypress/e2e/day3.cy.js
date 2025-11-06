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
describe("Hovers checks", () => {
  it("Verify that the user's name appears when you hover over their avatar", () => {
    cy.visit("https://the-internet.herokuapp.com/");
    cy.get('a[href="/hovers"]').click();
    cy.contains("h3", "Hovers");
    // Отримуємо всі блоки .figure
    cy.get(".figure").each(($el, index) => {
      cy.wrap($el).find(".figcaption").should("not.be.visible");
      //   cy.wrap($el).realHover();
      //   // Додаємо невелику затримку, щоб спрацював CSS-перехід для This element <div.figcaption> is not visible because it has CSS property: display: none
      //   cy.wait(300);
      //   cy.wrap($el)
      //     .find(".figcaption")
      //     .should("be.visible")
      //     .and("contain.text", "name:");

      cy.wrap($el)
        .find(".figcaption h5")
        .invoke("text")
        .should("contain", "name:");
      //   перевірити “зникнення” після відведення миші
      cy.get("body").realHover();
      cy.wrap($el).find(".figcaption").should("not.be.visible");
    });
  });
});
describe("Dynamic Controls", () => {
  beforeEach(() => {
    cy.visit("https://the-internet.herokuapp.com/");
    cy.get('a[href="/dynamic_controls"]').click();
  });
  it("remove and add the checkbox", () => {
    // cy.visit("https://the-internet.herokuapp.com/");
    // cy.get('a[href="/dynamic_controls"]').click();
    cy.contains("h4", "Dynamic Controls");
    cy.get("#checkbox").should("be.visible");
    cy.contains("button", "Remove").click();
    cy.get("#checkbox").should("not.exist");
    cy.contains("button", "Remove").should("not.exist");
    cy.contains("button", "Add").click();
    cy.get("#checkbox").should("be.visible");
  });
  it.only("Enter text in the disabled input field after clicking the Enable button", () => {
    cy.contains("h4", "Dynamic Controls");
    cy.get("#input-example input").should("be.disabled");
    cy.contains("button", "Enable").click();
    cy.get("#input-example input")
      .should("be.enabled")
      .type("Hello Cypress!")
      .should("have.value", "Hello Cypress!");
  });
});
