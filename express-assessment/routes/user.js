import express, { response } from "express";
import prisma from "../db/index.js"

const router = express.Router();

// Create the routes here

//GET all Active Users
router.get("/", async (_request, response) => {
    try {
        const users = await prisma.user.findMany({
            where: {
                isActive: true,
            }
        });

        response.status(200).json({
            success: true,
            users,
        });
    } catch (error) {
        response.status(500).json({
            success: false,
            message: "Could not find users"
        });
    }

});

//GET all Admin Users
router.get("/admins", async (request, response) => {
    try {
        const users = await prisma.user.findMany({
            where: {
                isAdmin: true,
            }
        });

        response.status(200).json({
            success: true,
            users
        })
    } catch (error) {
        response.status(500).json({
            success: false,
            message: "Could not find users"
        });
    }

});



//POST a new user
router.post("/", async (request, response) => {
    try {
        const newUser = await prisma.user.create({
            data: {
                firstName: request.body.firstName,
                lastName: request.body.lastName,
                isAdmin: request.body.isAdmin,
                isActive: request.body.isActive
            }
        });

        response.status(201).json({
            success: true,
            newUser,
        });
    } catch (error) {
        response.status(500).json({
            success: false,
            message: "Could not find users"
        });
    }


});

//PUT an existing user
router.put("/:userId", async (request, response) => {
    const userId = parseInt(request.params.userId);

    try {
        const editUser = await prisma.user.update({
            where: {
                id: userId,
            },
            data: {
                firstName: request.body.firstName,
                lastName: request.body.lastName,
                isAdmin: request.body.isAdmin,
                isActive: request.body.isActive
            }
        });

        response.status(200).json({
            success: true,
            editUser,
        });
    } catch (error) {
        response.status(500).json({
            success: false,
            message: "Could not find users"
        });
    }


});

//DELETE an existing user
router.delete("/:userId", async (request, response) => {
    const userId = parseInt(request.params.userId);

    try {
        const deleteUser = await prisma.user.delete({
            where: {
                id: userId,
            }
        });

        response.status(200).json({
            success: true,
            deleteUser,
        });
    } catch (error) {
        response.status(500).json({
            success: false,
            message: "Could not find users"
        });
    }



});



export default router;
