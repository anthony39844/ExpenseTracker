const IncomeSchema = require("../models/incomeModel");

exports.deleteIncome = async (req, res) => {
    const {id} = req.params;
    IncomeSchema.findByIdAndDelete(id)
        .then((income) => {
            res.status(200).json({message: "Income Deleted"})
        })
        .catch((err) => {
            res.status(500).json({message: "Server Error"})
        })
}

