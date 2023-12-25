const Position = require("../models/Position");

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
    }
};

module.exports = internController; 
