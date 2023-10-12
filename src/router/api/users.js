import { Router } from "express"
import Users from "../../dao/Mongo/models/User.js"
import verifyTokenAndAdmin from "../../middlewares/verifyTokenAndAdmin.js"

const users_router = Router()


users_router.get("/premium/:uid", async (req, res, next) => {
    try {
        const { uid } = req.params

        const mongouser = await Users.findById(uid)

        console.log(mongouser)
        if (req.user.role != "admin") return res.status(401).json({
            success: false,
            message: "unauthorized"
        })

        if (mongouser == null) return res.status(404).json({
            success: false,
            message: "user not found"
        })


        if (mongouser.role === "admin") {
            return res.status(401).json({
                success: false,
                message: "can't change admin privileges"
            })
        }

        mongouser.role = mongouser.role === "user" ? "premium" : "user"
        await mongouser.save()

        res.status(200).json({
            success: true,
            message: `user role changed to ${mongouser.role}`
        })

    } catch (err) {
        console.log(err)
        next(err)
    }
})

users_router.delete("/:uid", verifyTokenAndAdmin, async (req, res, next) => {
    try {
        await Users.findByIdAndDelete(req.params.uid)
        res.status(200).json({
            success: true,
            message: 'User deleted successfully'
        })
    } catch (err) {
        res.status(500).json({message: err.message})
    }
})

export default users_router