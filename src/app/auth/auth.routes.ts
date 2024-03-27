import { Router } from "express";

export default class AuthRouter {
  public router: Router;

  constructor() {
    this.router = Router();

    this.routes();
  }

  public routes() {
    this.router.post("/email-register", () => {});
  }
}
