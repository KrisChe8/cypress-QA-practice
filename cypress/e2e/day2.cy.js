// Для цього потрібно мати будь-який реальний сервер, який приймає POST-запити
//  https://reqres.in     API для навчання тестуванню
//  https://jsonplaceholder.typicode.com   — фейковий REST API
describe("Day2 - fixyures,custom commands, intercept", () => {
  beforeEach(() => {
    cy.fixture("users").as("users");
  });
  it("logs in using API and visits protected page", function () {
    // cy.login(this.users.user1.email, this.users.user1.password);
    // cy.visit("/dashboard");
    // cy.contains("Welcome").should("exist");
    cy.request({
      method: "POST",
      url: "https://reqres.in/api/login", // повна URL
      headers: {
        "x-api-key": "reqres-free-v1",
      },
      body: {
        email: "eve.holt@reqres.in",
        password: "cityslicka",
      },
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.have.property("token");
    });
  });
});
