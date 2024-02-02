import { decode } from "../services/jwt.js";
import { errorResponse } from "../services/errorResponse.js";
import { Op } from "sequelize";
import User from "../api/user/models/user.js";
import Permission from './../api/permission/models/permission.js';
import Role from "../api/role/models/role.js";
import Role_permission from "../api/permission/models/Role_permission.js";



export default async (req, res, next) => {
  try {
    console.log("RBAC")
    let endpoint = req.url.split("?")[0];
    let params = req.params;
    endpoint = Object.entries(params).reduce((str, [key, value]) => str.replace(new RegExp(value, "g"), `:${key}`), endpoint);

    let user, role;
    if (req.headers.authorization) {
      const token = decode(req);
      if (token.error) return res.status(400).send({ error: token.error });
      user = await User.findOne({
        where: { id: token.id },
        include: [{ model: Role, as: "role" }],
      });

      if (!user || !user.role) {
        return res.status(403).send(
          errorResponse({
            status: 403,
            name: "ForbiddenError",
            message: "Forbidden",
            details: "You don't have permission to access this route",
          })
        );
      }

      role = user.role;
    } else {
      const getrole = await Role.findOne({
        where: { name: "PUBLIC" },
      });
      role = getrole;

    }
    // +++

    // if (user?.role?.name === "Staff") {
    //   const Staff_permission = await Staff_permission.findOne({
    //     where: [{ endpoint }, { method: req.method }],
    //   });

    //   if (!Staff_permission) {
    //     return res.status(403).send(
    //       errorResponse({
    //         status: 403,
    //         name: "ForbiddenError",
    //         message: "Forbidden",
    //         details: "You don't have permission to access this route",
    //       })
    //     );
    //   }

    //   const UserStaff_permission = await UserStaff_permission.findOne({
    //     where: { [Op.and]: [{ StaffPermissionId: Staff_permission.id }, { UserId: user.id }] },
    //   });

    //   if (UserStaff_permission) {
    //     return await next()
    //   } else {
    //     return res.status(403).send(
    //       errorResponse({
    //         status: 403,
    //         name: "ForbiddenError",
    //         message: "Forbidden",
    //         details: "You don't have permission to access this route",
    //       })
    //     );
    //   }

    // } else {
    //   console.log("Role Is NOT Staff - RBAC")

    const isPermissionExists = await Permission.findOne({
      where: [{ endpoint }, { method: req.method }], raw: true
    });

    if (!isPermissionExists) {
      return res.status(403).send(
        errorResponse({
          status: 403,
          name: "ForbiddenError",
          message: "Forbidden",
          details: "You don't have permission to access this route",
        })
      );
    }

    const isRole_permissionExists = await Role_permission.findOne({
      where: { [Op.and]: [{ PermissionId: isPermissionExists.id }, { RoleId: role.id }] },
    });

    if (isRole_permissionExists) {
      return await next()
    } else {
      return res.status(403).send(
        errorResponse({
          status: 403,
          name: "ForbiddenError",
          message: "Forbidden",
          details: "You don't have permission to access this route",
        })
      );
    }
    // }
  } catch (error) {
    console.log(error);
    return res.status(500).send(error);
  }
};
