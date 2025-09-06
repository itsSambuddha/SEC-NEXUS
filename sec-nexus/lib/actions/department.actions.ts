"use server"

import { connectToDatabase } from "../database";
import Department from "../database/models/department.model";
import { CreateDepartmentParams } from "../types"
import { handleError } from "../utils"

export const createDepartment = async ({departmentName} :CreateDepartmentParams)=> {
    try {
        await connectToDatabase();

        const newDepartment = await Department.create({ name: departmentName });

        return JSON.parse(JSON.stringify(newDepartment));
    } catch (error) {
        handleError(error)
        
    }
}

export const getAllDepartments = async () => {
    try {
        await connectToDatabase();

        const departments = await Department.find();

        return JSON.parse(JSON.stringify(departments));
    } catch (error) {
        handleError(error)

    }
}
