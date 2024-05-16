import { Router } from "express";
import { UserController } from "./controllers";
import { clearField, validateFieldNewUser, validateLogin } from "./middlewares";
import { auth } from "../../shared/middlewares";

export default () => {
  const router = Router();

  router.post(
    "/user",
    [validateFieldNewUser, clearField],
    UserController.createUser
  );

  router.post("/login", validateLogin, UserController.loginUser);
  router.put("/updateCount/:username", UserController.updateCount);

  router.get("/user", UserController.listUser);
  router.get("/validateDataUser", auth, UserController.getUser);

  return router;
};
