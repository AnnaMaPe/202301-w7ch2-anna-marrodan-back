import { Router } from "express";
import multer from "multer";
import loginUser, {
  createUser,
} from "../../controllers/usersControllers/usersControllers.js";

const usersRouter = Router();

const storage = multer.diskStorage({
  destination(req, file, callback) {
    callback(null, "uploads/");
  },
  filename(req, file, callback) {
    callback(null, file.fieldname + ".jpeg");
  },
});
export const upload = multer({ storage });

usersRouter.post("/login", loginUser);
usersRouter.post("/create", upload.single("avatar"), createUser);

export default usersRouter;
