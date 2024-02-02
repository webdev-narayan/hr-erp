#!/usr/bin/env node
import program from "commander";
import fs from "fs";
import path from "path";
import readline from "readline";
import * as rimraf from "rimraf"; // Import the 'rimraf' package
import { fileURLToPath } from 'url';
import { dirname } from 'path';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
// to create api folders
program
    .command("generate")
    .description("Generate model-related folders and files")
    .action(async () => {
        const { modelName, fields } = await promptForModelInfo();
        generateModelFiles(modelName, fields);
        generateControllerFile(modelName, fields);
        generateMiddlewareFile(modelName, fields);
        generateRouteFile(modelName, fields);
    });
// to remove api
program
    .command("remove <modelName>")
    .description("Remove model-related folders and files")
    .action((modelName) => {
        removeModelFiles(modelName);
    });

program.parse(process.argv);

async function promptForModelInfo() {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
    });

    const modelName = await new Promise((resolve) => {
        rl.question("Enter the model name: ", (answer) => {
            resolve(answer);
        });
    });

    const fields = await new Promise((resolve) => {
        rl.question("Enter model fields (key:value format, e.g., name:string): ", (answer) => {
            const fieldArray = answer.split(",").map((field) => {
                const [key, value] = field.trim().split(":");
                return { key, value };
            });
            resolve(fieldArray);
        });
    });

    rl.close();

    return { modelName, fields };
}

function generateModelFileContent(modelName, fields) {
    return `
    import { DataTypes } from 'sequelize';
    import { sequelize } from '../../../../database/connection.js';

   const ${modelName.slice(0, 1).toUpperCase() + modelName.slice(1)} = sequelize.define("${modelName.slice(0, 1).toUpperCase() + modelName.slice(1)}", {
    ${fields.map((field) => `
    ${field.key}: {
        type: DataTypes.${field.value.toUpperCase()},
          },`)
            .join("\n")}
    });
    ${modelName.slice(0, 1).toUpperCase() + modelName.slice(1)}.sync()
    export default ${modelName.slice(0, 1).toUpperCase() + modelName.slice(1)}

`;
}

function generateControllerFileContent(modelName) {
    // Define the controller template here
    return `
    import { getPagination, getMeta } from "../../../services/pagination.js";
    import ${modelName.slice(0, 1).toUpperCase() + modelName.slice(1)} from "../models/${modelName}.js";
    import { errorResponse } from "../../../services/errorResponse.js";
    import { request, response } from "express";
    export const create = async (req = request, res = response) => {
        try {
    
            const ${modelName} = await ${modelName.slice(0, 1).toUpperCase() + modelName.slice(1)}.create(req.body);
           return res.status(200).send(${modelName});
        } catch (error) {
            console.log(error);
           return res.status(500).send(errorResponse({status:500,message:"Internal Server Error",details:error.message}));
        }
    };

    export const find = async (req = request, res = response) => {
        try {
            const query = req.query;
            const pagination = await getPagination(query.pagination)
            const ${modelName}s = await ${modelName.slice(0, 1).toUpperCase() + modelName.slice(1)}.findAndCountAll({
                offset: pagination.offset,
                limit: pagination.limit
            });
            const meta = await getMeta(pagination, ${modelName}s.count)
            return res.status(200).send({ data: ${modelName}s.rows, meta });
        } catch (error) {
            console.log(error);
           return res.status(500).send(errorResponse({status:500,message:"Internal Server Error",details:error.message}));
        }
    };

    export const findOne = async (req = request, res = response) => {
        try {
            const { id } = req.params
            const ${modelName} = await ${modelName.slice(0, 1).toUpperCase() + modelName.slice(1)}.findByPk(id);
            if (!${modelName}) {
                return res.status(404).send(errorResponse({status:404,message:"${modelName} not found!"}))
            }
                return res.status(200).send({data:${modelName}})
        } catch (error) {
            console.log(error);
           return res.status(500).send(errorResponse({status:500,message:"Internal Server Error",details:error.message}));
        }
    };

    export const update = async (req = request, res = response) => {
        try {
            const { id } = req.params
            const get${modelName.slice(0, 1).toUpperCase() + modelName.slice(1)} = await ${modelName.slice(0, 1).toUpperCase() + modelName.slice(1)}.findByPk(id)
            
            if (!get${modelName.slice(0, 1).toUpperCase() + modelName.slice(1)}) {
                return res.status(400).send(errorResponse({message:"Invalid ID"}))
            }            
            const [rowCount,[${modelName}]] = await ${modelName.slice(0, 1).toUpperCase() + modelName.slice(1)}.update(req.body, { where: { id },returning:true });
            return res.status(200).send({message:"${modelName} updated!",data:${modelName}})
        } catch (error) {
            console.log(error);
            return res.status(500).send(errorResponse({status:500,message:"Internal Server Error",details:error.message}));
        }
    };

    export const destroy = async (req = request, res = response) => {
        try {
            const { id } = req.params
            const get${modelName.slice(0, 1).toUpperCase() + modelName.slice(1)} = await ${modelName.slice(0, 1).toUpperCase() + modelName.slice(1)}.findByPk(id)

            if (get${modelName.slice(0, 1).toUpperCase() + modelName.slice(1)}) {
                return res.status(400).send(errorResponse({message:"Invalid ID"}))
            } 
            const ${modelName} = ${modelName.slice(0, 1).toUpperCase() + modelName.slice(1)}.destroy({ where: { id } });
            return res.status(200).send({message:"${modelName} deleted!"})
        } catch (error) {
            console.log(error);
            return res.status(500).send(errorResponse({status:500,message:"Internal Server Error",details:error.message}));
        }
    };

`;
}

function generateMiddlewareFileContent(modelName, fields) {
    // Define the middleware template here
    return `
import Joi from "joi";

export const createRequest =  async(req = request, res = response, next)=> {

                const JoiSchema = Joi.object({
                    ${fields.map((field) => `"${field.key}": Joi.${field.value}(),`).join("\n")}
                });

         let result = JoiSchema.validate(req.body);
        if(result.error) {
        return res.status(400).send(errorResponse({
            message: result.error.message,
            details: result.error.details
        }));
    } 
        await next(); 

}

`;
}

function generateRouteFileContent(modelName) {
    // Define the route template here
    return `

    import {Router}  from 'express';
    import {create,find,update,destroy,findOne} from '../controllers/${modelName}.js';
    const router = Router();
   
export default {
    api: "${modelName}s",
    routes: [
        {
            endpoint: "/api/${modelName}s",
            method: "POST",
            name: "Create ${modelName}",
            handler: create,
            middlewares: []
        },
        {
            endpoint: "/api/${modelName}s",
            method: "GET",
            name: "List ${modelName}s",
            handler: find,
            middlewares: []
        },
        {
            endpoint: "/api/${modelName}s/:id",
            method: "GET",
            name: "List Single ${modelName}",
            handler: findOne,
            middlewares: []
        },
        {
            endpoint: "/api/${modelName}s/:id",
            method: "PUT",
            name: "Update ${modelName}s",
            handler: update,
            middlewares: []
        },
        {
            endpoint: "/api/${modelName}s/:id",
            method: "DELETE",
            name: "Delete ${modelName}",
            handler: destroy,
            middlewares: []
        },
    ]
}
 `;
}

function generateModelFiles(modelName, fields) {
    const apiDirectory = path.join(__dirname, "src", "api", modelName);
    const modelsDirectory = path.join(apiDirectory, "models");
    fs.mkdirSync(modelsDirectory, { recursive: true });

    // Create model file
    const modelFileContent = generateModelFileContent(modelName, fields);
    const modelFilePath = path.join(modelsDirectory, `${modelName}.js`);
    fs.writeFileSync(modelFilePath, modelFileContent);
}
function generateControllerFile(modelName, fields) {
    const apiDirectory = path.join(__dirname, "src", "api", modelName);
    const controllersDirectory = path.join(apiDirectory, "controllers");
    fs.mkdirSync(controllersDirectory, { recursive: true });

    // Create controller file
    const controllerFileContent = generateControllerFileContent(modelName);
    const controllerFilePath = path.join(controllersDirectory, `${modelName}.js`);
    fs.writeFileSync(controllerFilePath, controllerFileContent);
}

function generateMiddlewareFile(modelName, fields) {
    const apiDirectory = path.join(__dirname, "src", "api", modelName);
    const middlewaresDirectory = path.join(apiDirectory, "middlewares");
    fs.mkdirSync(middlewaresDirectory, { recursive: true });

    // Create middleware file
    const middlewareFileContent = generateMiddlewareFileContent(modelName, fields);
    const middlewareFilePath = path.join(middlewaresDirectory, `${modelName}.js`);
    fs.writeFileSync(middlewareFilePath, middlewareFileContent);
}

function generateRouteFile(modelName, fields) {
    const apiDirectory = path.join(__dirname, "src", "api", modelName);
    const routesDirectory = path.join(apiDirectory, "routes");
    fs.mkdirSync(routesDirectory, { recursive: true });

    // Create route file
    const routeFileContent = generateRouteFileContent(modelName);
    const routeFilePath = path.join(routesDirectory, `${modelName}.js`);
    fs.writeFileSync(routeFilePath, routeFileContent);
}

// remove files functinality
function removeModelFiles(modelName) {
    const apiDirectory = path.join(__dirname, "src", "api", modelName);

    // Check if the API directory exists
    if (fs.existsSync(apiDirectory)) {
        // Use the 'rimraf' package to remove the entire directory and its contents
        rimraf.sync(apiDirectory);
        console.log(`Model "${modelName}" and its associated files have been removed.`);
    } else {
        console.log(`Model "${modelName}" does not exist.`);
    }
}
