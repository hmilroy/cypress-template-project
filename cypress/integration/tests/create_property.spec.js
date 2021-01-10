//const { describe } = require("mocha");
describe("Different Test suite", function () {
  const map = {
    create_property_button:"[class='wtml-button wtml-button--warhead wtml-button--medium wtml-button--ghost topbar__actions_item']",
    address_type:"#differentApp > div > div.content-dock > div > form > div.inner-form.add-property-form > div.custom-address-comp > div:nth-child(1) > div > div > select",
    region:"#differentApp > div > div.content-dock > div > form > div.inner-form.add-property-form > div.custom-address-comp > div:nth-child(6) > div > div > div.col-xs-6.countrySelect__wrapper > select",
    add_new_email: "[class='search-input__notfound__text']",
    owner_name: "[name='name']",
    add_property_save_button: "[class='button button_main']",
    unitnumber: "input[class='col-xs formInput formInput--last']",
    numberx:"#differentApp > div > div.content-dock > div > form > div.inner-form.add-property-form > div.custom-address-comp > div:nth-child(2) > div > div > input:nth-child(3)",
    suburb: "input[name='suburb']",
    postcode: "input[name='postCode']",
    email: '.email-validation input[name="Search-Input"]',
    street: "[class='col-xs formInput formInput--first']",
  };

  for (let i = 0; i < 5; i++) {
    beforeEach("Load", function () {
      cy.fixture("data").then((data) => {
        this.key = data.excel.data.propertyData.sheet1[i];
      });
    });

    it("Test Create Property flow", function () {
      cy.visit("https://admin-qa.different.com.au/#/");
      cy.contains("Sign in with Google", { timeout: 10000 }).click();
      cy.location("protocol").should("eq", "https:");
      cy.title().should("eq", "Different Admin");
      cy.get(map.create_property_button, { timeout: 10000 }).click();
      cy.hash().should("include", "#/add-property");
      cy.contains("Address", { timeout: 10000 }).should("be.visible");
      cy.get("[class='MA-cantFind']").click();
      cy.get(map.address_type, { timeout: 10000 }).select(this.key.unit);
      cy.get(map.region).select(this.key.region);

      cy.get("form").within(($form) => {
        cy.get(map.unitnumber).type(this.key.number1);
        cy.get("input").eq(1).type(this.key.number2);
        cy.get("input").eq(2).type(this.key.number3);
        cy.get(map.street).type(this.key.property_name);
        cy.get("[name='streetType']").select(this.key.streettype);
        cy.get(map.suburb).type(this.key.suburb);
        cy.get(map.postcode).type(this.key.postcode);
        cy.get(map.email).type(this.key.owner_email);
        cy.get(map.add_new_email).click();
        cy.get(map.owner_name).type(this.key.owner_name1);
        cy.get(map.add_property_save_button).click();
      });
    });
  }
});

//npm run cypress:open
