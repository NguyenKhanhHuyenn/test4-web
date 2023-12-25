const jwt = require("jsonwebtoken");
const Account = require("../models/Account")
const Student = require("../models/Student")
const Business = require("../models/Business")

const userController = {
    // GET PROFILE (ADMIN OR STUDENT)
    getProfile: async (req, res) => {
        try {
            const userId = req.params.id;
            const requestingUserId = req.account.id;
            const requestingUserRole = req.account.role;

            // Ensure only admin or the owner can view the profile
            if (requestingUserRole === "admin" || userId === requestingUserId) {
                const student = await Student.findById(userId);
                if (!student) {
                    return res.status(404).json("Student don't have profile");
                }
                // Return the full profile for admins or the account owner
                res.status(200).json(student);
            } else {
                return res.status(403).json("You're not allowed to view this profile");
            }
        } catch (err) {
            res.status(500).json({ error: "Internal Server Error", details: err.message });
        }
    },

    // UPDATE PROFILE (ADMIN OR STUDENT)
    updateProfile: async (req, res) => {
        try {
            const userId = req.params.id;
            const requestingUserId = req.account.id;
            const requestingUserRole = req.account.role;

            const account = await Account.findById(userId);
            if (!account) {
                return res.status(404).json("Account not found");
            }

            // Ensure only admin or the owner can update the profile
            if (requestingUserRole !== "admin" && userId !== requestingUserId) {
                return res.status(403).json("You're not allowed to update this profile");
            }

            const studentId = account._id;
            const student = await Student.findById(studentId);
            if (!student) {
                return res.status(404).json("Student profile not found");
            }

            // Update profile information as requested
            if (req.body.name) student.name = req.body.name;
            if (req.body.birthday) student.birthday = req.body.birthday;
            if (req.body.sex) student.sex = req.body.sex;
            if (req.body.field) student.field = req.body.field;
            if (req.body.major) student.major = req.body.major;
            if (req.body.email) student.email = req.body.email;
            if (req.body.phone) student.phone = req.body.phone;
            if (req.body.cpa) student.cpa = req.body.cpa;
            if (req.body.cert) student.cert = req.body.cert;

            await student.save();
            res.status(200).json("Profile updated successfully");
        } catch (err) {
            res.status(500).json({ error: "Internal Server Error", details: err.message });
        }
    },

    // DELETE PROFILE (ADMIN)
    deleteProfile: async (req, res) => {
        try {
            const userId = req.params.id;

            // Find the student profile by ID
            const student = await Student.findById(userId);

            if (!student) {
                return res.status(404).json("Student not found");
            }

            // Delete the student profile
            await Student.findByIdAndDelete(userId);

            res.status(200).json("Profile deleted successfully");
        } catch (err) {
            res.status(500).json({ error: "Internal Server Error", details: err.message });
        }
    },

    getAllProfiles: async (req, res) => {
        try {
            const students = await Student.find({}, 'firstname lastname major');
    
            return res.status(200).json(students);
        } catch (err) {
            console.error(err);
            return res.status(500).json({ error: "Internal Server Error", details: err.message });
        }
    },

    createProfile: async (req, res) => {
        try {
            const userId = req.params.id;
            const requestingUserId = req.account.id;

            const account = await Account.findById(userId);
            if (!account) {
                return res.status(404).json("Account not found");
            }

            // Check if the user already has a profile
            if (account.profile) {
                return res.status(400).json("Account already has a profile");
            }

            // Create a new profile
            const newProfile = {
                
            };

            account.profile = newProfile;
            await account.save();

            res.status(201).json("Profile created successfully");
        } catch (err) {
            res.status(500).json({ error: "Internal Server Error", details: err.message });
        }
    },
    getAllBusinesses: async (req, res) => {
        try {
            const businesses = await Business.find();
    
            return res.status(200).json(businesses);
        } catch (err) {
            console.error(err);
            return res.status(500).json({ error: "Internal Server Error", details: err.message });
        }
    },

    getOneBusiness: async (req, res) => {
        try {
            const businessId = req.params.id;
            const business = await Business.findById(businessId);
                if (!business) {
                    return res.status(404).json("Wrong id of business");
                }
                res.status(200).json(business);
        } catch (err) {
            console.error(err)
            return res.status(500).json({ error: "Internal Server Error", details: err.message });
            
        }
    },

    updateBusiness: async (req, res) => {
        try {
            const businessId = req.params.id

            const business = await Business.findById(businessId);
            if (!business) {
                return res.status(404).json("Business not found");
            }

            // Update profile information as requested
            if (req.body.name) business.name = req.body.name;
            if (req.body.field) business.field = req.body.field;
            if (req.body.address) business.address = req.body.address;
            if (req.body.website) business.website = req.body.website;
            if (req.body.phone_number) business.phone_number = req.body.phone_number;

            await business.save();
            res.status(200).json("Business updated successfully");
        } catch (err) {
            res.status(500).json({ error: "Internal Server Error", details: err.message });
        }
    },

    deleteBusiness: async (req, res) => {
        try {
            const businessId = req.params.id;
            const business = await Business.findById(businessId);

            if (!business) {
                return res.status(404).json("Business not found");
            }

            await Business.findByIdAndDelete(businessId);

            res.status(200).json("Business deleted successfully");
        } catch (err) {
            res.status(500).json({ error: "Internal Server Error", details: err.message });
        }
    },


};

module.exports = userController;
