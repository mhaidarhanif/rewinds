import * as adminNote from "./admin.note.server";
import * as admin from "./admin.server";
import * as adminUser from "./admin.user.server";
import * as note from "./note.server";
import * as userNotification from "./user-notification.server";
import * as userPassword from "./user-password.server";
import * as userProfile from "./user-profile.server";
import * as userRole from "./user-role.server";
import * as userNote from "./user.note.server";
import * as user from "./user.server";

export const model = {
  admin,
  adminNote,
  adminUser,
  note,
  user,
  userNote,
  userNotification,
  userPassword,
  userProfile,
  userRole,
};
