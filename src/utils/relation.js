
import { sequelize } from "../../database/connection.js";
import Role_permission from "../api/permission/models/Role_permission.js";
import Role from "../api/role/models/role.js";
import User from "../api/user/models/user.js";
import Permission from './../api/permission/models/permission.js';
import Department from './../api/department/models/department.js';
import Team from "../api/team/models/team.js";
import Project from "../api/project/models/project.js";
import User_project from "../api/project/models/User_project.js";
import Module from './../api/module/models/module.js';
import User_module from "../api/module/models/User_module.js";
import Sub_module from './../api/sub_module/models/sub_module.js';
import Designation from './../api/designation/models/designation.js';
import Address from './../api/address/models/address.js';
import Application from "../api/application/models/application.js";
import Recruitment from './../api/recruitment/models/recruitment.js';



Role.hasMany(User, { foreignKey: "RoleId", as: "users" });
User.belongsTo(Role, { foreignKey: "RoleId", as: "role" })
User.hasOne(Address, { foreignKey: "UserId", as: "address", })
Address.belongsTo(User, { foreignKey: "UserId", as: "user" })

Designation.hasMany(User, { foreignKey: "DesignationId", as: "users" })
User.belongsTo(Designation, { foreignKey: "DesignationId", as: "designation" })

Permission.belongsToMany(Role, { through: Role_permission, as: "roles" })
Role.belongsToMany(Permission, { through: Role_permission, as: "permissions" })

Department.hasMany(Team, { foreignKey: "DepartmentId", as: "teams" })
Team.belongsTo(Department, { foreignKey: "DepartmentId", as: "department" })

Department.hasMany(User, { foreignKey: "DepartmentId", as: "users" })
User.belongsTo(User, { foreignKey: "DepartmentId", as: "department" })

Team.hasMany(User, { foreignKey: "TeamId", as: "users" })
User.belongsTo(Team, { foreignKey: "TeamId", as: "team" })

Team.belongsTo(User, { foreignKey: "TeamLeaderId", as: "team_leader" })
User.hasOne(Team, { foreignKey: "TeamLeaderId", as: "team_leader" })


// project
Team.hasMany(Project, { foreignKey: "TeamId", as: "projects" })
Project.belongsTo(Team, { foreignKey: "TeamId", as: "team" })

Project.hasMany(Module, { foreignKey: "ProjectId", as: "modules" })
Module.belongsTo(Project, { foreignKey: "ProjectId", as: "project" })
// Project.belongsTo(User,{foreignKey:"ProjectLeadId",as:"project_lead"})

Module.belongsToMany(User, { through: User_module, as: "users" })
User.belongsToMany(Module, { through: User_module, as: "modules" })

User.hasMany(Sub_module, { foreignKey: "UserId", as: "sub_modules" })
Sub_module.belongsTo(User, { foreignKey: "UserId", as: "user" })


// recuitment

Recruitment.hasMany(Application, { foreignKey: "RecruitmentId", as: "applications" })
Application.belongsTo(Recruitment, { foreignKey: "RecruitmentId", as: "recruitment" })
await sequelize.sync({ alter: true })

