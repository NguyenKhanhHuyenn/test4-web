const Position = require("../models/Position");
const Promise = require("../models/Promise");
const Account = require("../models/Account")

const { exec } = require('child_process');

const mongoose = require('mongoose');
const express = require('express');
const app = express();

mongoose.connect('mongodb://127.0.0.1/test4', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const matchingSchema = new mongoose.Schema({
    _id: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    birthday: {
        type: Date,
        required: true
    },
    sex: {
        type: String,
        required: true
    },
    major: {
        type: String,
        required: true
    },
    position: {
        type: String,
        required: true
    },
    business: {
        type: String,
        required: true
    }
});
const matchingResult = mongoose.model("matching_results", matchingSchema)

const internController = {
    getAllPositions: async (req, res) => {
        try {
            const positions = await Position.find();
            res.status(200).json(positions)
        } catch (err) {
            res.status(500).json({ error: "Internal Server Error", details: err.message });
        }
    },

    postAPosition: async (req, res) => {
        try {
            // Lấy dữ liệu từ req.body
            const { _id, name, business, capacity, requirement, cpa_required } = req.body;

            // Kiểm tra xem vị trí có tồn tại không
            const existingPosition = await Position.findOne({ _id });

            if (existingPosition) {
                // Nếu vị trí đã tồn tại, trả về thông báo lỗi
                return res.status(400).json({ error: "Position already exists", details: "This position is already in use." });
            }

            // Tạo một vị trí mới
            const newPosition = new Position({
                _id,
                name,
                business,
                capacity,
                requirement,
                cpa_required
            });

            // Lưu vị trí vào cơ sở dữ liệu
            const savedPosition = await newPosition.save();

            res.status(201).json(savedPosition);
        } catch (err) {
            res.status(500).json({ error: "Internal Server Error", details: err.message });
        }
    },
    matchingIntern: async (req, res) => {
        exec('python F:\\nodejs\\Test\\web\\backend\\algorithms\\demo.py', (error, stdout, stderr) => {
          if (error) {
            console.error(`Error executing the Python script: ${error}`);
            return res.status(500).send('Internal Server Error');
          }
      
          try {
            const jsonData = JSON.parse(stdout);
            res.json(jsonData);
          } catch (parseError) {
            console.error(`Error parsing JSON: ${parseError}`);
            res.send(stdout.replace(/\n/g, '<br>'));
          }
        });
    },

    getAllPromise: async (req, res) => {
        try {
            const promises = await Promise.find();
            res.status(200).json(promises)
        } catch (err) {
            res.status(500).json({ error: "Internal Server Error", details: err.message });
        }
    },

    getMatchingResults: async (req, res) => {
        try {
            const matchingResults = await matchingResult.find();
            res.status(200).json(matchingResults)
        } catch (err) {
            res.status(500).json({ error: "Internal Server Error", details: err.message });
        }
    },

    getStudentMatchingResults: async (req, res) => {
        try {
            const userId = req.params.id;
            const requestingUserId = req.account.id;
            const requestingUserRole = req.account.role;

            // Ensure only admin or the owner can view the profile
            if (requestingUserRole === "admin" || userId === requestingUserId) {
                const result = await matchingResult.findById(userId);
                if (!result) {
                    return res.status(404).json("Result not found");
                }
                res.status(200).json(result);
            } else {
                return res.status(403).json("You're not allowed to view this result");
            }
        } catch (err) {
            res.status(500).json({ error: "Internal Server Error", details: err.message });
        }
    }

};

module.exports = internController; 
