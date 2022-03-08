import { describe, it, expect, vi } from "vitest";
import Presenter from "@/presenters/Login";

class MockView {
  goTo() {}
}

class MockAPILoginSuccesss {
  login(username, password) {
    this.username = username;
    this.password = password;
    return Promise.resolve();
  }
  expectToHaveBeenCalledWith(username, password) {
    expect(username).toEqual(this.username);
    expect(password).toEqual(this.password);
  }
}

describe("Login Presenter", () => {
  let p = new Presenter(new MockView());

  it("should login the current username and password", () => {
    givenLoginSuccess();
    p.username = "username";
    p.password = "password";
    p.login();
    p.API.expectToHaveBeenCalledWith("username", "password");
  });
  it("should redirect to home page after login success", async () => {
    givenLoginSuccess();
    await p.login();
    expectToRedirectToHomePage(p.view);
  });
  function givenLoginSuccess() {
    p.API = new MockAPILoginSuccesss();
    vi.spyOn(p.view, "goTo");
  }
  function expectToRedirectToHomePage(view) {
    expect(view.goTo).toHaveBeenCalledWith({ name: "home" });
  }
});
