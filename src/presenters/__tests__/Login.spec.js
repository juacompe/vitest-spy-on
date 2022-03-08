import { describe, it, expect, vi } from "vitest";
import Presenter from "@/presenters/Login";

class MockView {
  goTo() {}
}

describe("Login Presenter", () => {
  let p = new Presenter(new MockView());

  it("should login the current username and password", () => {
    givenLoginSuccess();
    p.username = "username";
    p.password = "password";
    p.login();
    expect(p.API.login).toHaveBeenCalledWith("username", "password");
  });
  it("should redirect to home page after login success", async () => {
    givenLoginSuccess();
    await p.login();
    expectToRedirectToHomePage(p.view);
  });
  function givenLoginSuccess(res) {
    vi.spyOn(p.view, "goTo");
    vi.spyOn(p.API, "login").mockResolvedValue(res);
  }
  function expectToRedirectToHomePage(view) {
    expect(view.goTo).toHaveBeenCalledWith({ name: "home" });
  }
});
