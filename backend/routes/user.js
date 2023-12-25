const express = require("express");
const middlewareController = require("../controllers/middlewareController");
const userController = require("../controllers/userController");

const router = express.Router();

// Lấy tất cả các hồ sơ (Chỉ Admin có quyền)
router.get("/teacher/student-mana", middlewareController.verifyTokenAndAdmin, userController.getAllProfiles);

// Lấy hồ sơ người dùng (Admin hoặc người dùng)
router.get("/teacher/student-mana/:id", middlewareController.verifyToken, userController.getProfile);

// Cập nhật hồ sơ người dùng (Admin hoặc người dùng)
router.put("/teacher/student-mana/:id", middlewareController.verifyToken, userController.updateProfile);

// Tạo hồ sơ cho sinh viên có profile null (Chỉ Admin có quyền)
router.post("/teacher/student-mana/:id", middlewareController.verifyTokenAndAdmin, userController.createProfile);

// Xoá hồ sơ người dùng (Chỉ Admin có quyền)
router.delete("/teacher/student-mana/:id", middlewareController.verifyTokenAndAdmin, userController.deleteProfile);

router.get("/teacher/business-mana", middlewareController.verifyTokenAndAdmin, userController.getAllBusinesses);

router.get("/teacher/business-mana/:id", middlewareController.verifyTokenAndAdmin, userController.getOneBusiness);

router.put("/teacher/business-mana/:id", middlewareController.verifyTokenAndAdmin, userController.updateBusiness);

router.delete("/teacher/business-mana/:id", middlewareController.verifyTokenAndAdmin, userController.deleteBusiness);

module.exports = router;
