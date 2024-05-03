//src/controllers/sotilgan.controllers.js
const SotilganTovar = require("../models/sotilgan");

const getSotilganController = async (req, res) => {
    try {
        const user = await SotilganTovar.find();
        res.status(200).json({ user });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: "Server error" });
    }
} 

module.exports = {
    getSotilganController
};

// const createSotilganController = async (req, res) => {
//     try {
//         const { name, chiqibKetganTovarlarSoni, xaridor, sana, mavjudtovarlar } = req.body;

//         if (!name &&!chiqibKetganTovarlarSoni && !xaridor && !sana && !mavjudtovarlar) {
//             return res.status(400).json({ message: "Ma'lumotlar yetarli emas" });
//         }

//         const userExists = await SotilganTovar.findOne({ name });
//         if (!userExists) {
//             return res.status(400).json({ message: "Bunday tovar yo'q" });
//         }

//         const chiqibKetganTovarlarSoniniHisoblash = await SotilganTovar.aggregate([
//             { $group: { _id: null, total: { $sum: "$history.chiqibKetganTovarlarSoni" } } }
//         ]);

//         let mavjudTovarlarSon = 0;
//         if (chiqibKetganTovarlarSoniniHisoblash.length > 0) {
//             mavjudTovarlarSon = chiqibKetganTovarlarSoniniHisoblash[0].total;
//         }

//         const newHistoryItem = {
//             sana: new Date(sana),
//             xaridor: xaridor,
//             chiqibKetganTovarlarSoni: chiqibKetganTovarlarSoni,
//             mavjudtovarlar: mavjudtovarlar - mavjudTovarlarSon
//         };

//         const newSotilganTovar = new SotilganTovar({
//             name: name,
//             narxi: userExists.narxi,
//             mavjudtovarlar: mavjudtovarlar,
//             history: [newHistoryItem]
//         });

//         const savedData = await newSotilganTovar.save();

//         res.status(201).json({ message: "So'rov muvaffaqiyatli yuborildi", data: savedData });
//     } catch (e) {
//         console.log(e.message);
//         res.status(500).json({ message: "Server xatosi" });
//     }
// }

// const updateSotilganController = async (req, res) => {
//     try {
//         const { id } = req.params;

//         if (!mongoose.Types.ObjectId.isValid(id)) {
//             return res.status(400).json({ message: "Invalid product ID format" });
//         }

//         const { mavjudtovarlar, chiqibKetganTovarlarSoni } = req.body;

//         // Ma'lumotlarni yangilash uchun
//         // 1. Ma'lumotlarni olish
//         const user = await SotilganTovar.findById(id);

//         if (!user) {
//             return res.status(404).json({ message: "Product not found" });
//         }

//         // 2. Yangi ma'lumotlarni qo'shish yoki o'zgartirish
//         if (mavjudtovarlar !== undefined) {
//             user.mavjudtovarlar = mavjudtovarlar;
//         }

//         if (chiqibKetganTovarlarSoni !== undefined) {
//             // Chiqib ketgan tovarlar sonini hisoblash va yangilash
//             const chiqibKetganTovarlarSoniniHisoblash = await SotilganTovar.aggregate([
//                 { $group: { _id: null, total: { $sum: "$history.chiqibKetganTovarlarSoni" } } }
//             ]);

//             let mavjudTovarlarSon = 0;
//             if (chiqibKetganTovarlarSoniniHisoblash.length > 0) {
//                 mavjudTovarlarSon = chiqibKetganTovarlarSoniniHisoblash[0].total;
//             }

//             // Yangi chiqib ketgan tovarlar sonini hisoblash va yangilash
//             const newHistoryItem = {
//                 sana: new Date(),
//                 xaridor: user.xaridor,
//                 chiqibKetganTovarlarSoni: chiqibKetganTovarlarSoni,
//                 mavjudtovarlar: mavjudtovarlar - mavjudTovarlarSon
//             };

//             user.history.push(newHistoryItem);
//         }

//         // 3. Yangilangan ma'lumotlarni bazaga saqlash
//         await user.save();

//         // Ma'lumotlarni o'zgarishdan so'ng qaytarish
//         const updatedUsers = await SotilganTovar.find();
//         res.status(200).json({ message: "Product data successfully updated", users: updatedUsers });
//     } catch (error) {
//         console.log(error.message);
//         res.status(500).json({ message: "Server error" });
//     }
// }

// module.exports = {
//     getSotilganController
// };