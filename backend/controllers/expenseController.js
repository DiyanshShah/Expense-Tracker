const User = require('../models/User');
const Expense = require('../models/Expense');
const xlsx = require('xlsx');

//Add expense source
exports.addExpense = async (req, res) => {
    const userId = req.user.id;

    try{
        const {icon, category, amount, date } = req.body;

        if(!category || !amount || !date){
            return res.status(400).json({message: "All fields are required"});

        }
        const newExpense = new Expense({
            userId, 
            icon, 
            category,
            amount, 
            date: new Date(date),
        });

        await newExpense.save();
        res.status(200).json(newExpense);
    }catch(err){
        res.status(500).json({message: "Server Error"})
    }
};
//Get all expense source
exports.getAllExpense = async (req, res) => {
    const userId = req.user.id;

    try {
        const expense = await Expense.find({userId}).sort({date: -1});
        res.json(expense);

    } catch (error) {
        res.status(500).json({message: "Server Error"})
    }
};
//Delete expense source
exports.deleteExpense = async (req, res) => {
    const userId = req.user.id;

    try{
        await Expense.findByIdAndDelete(req.params.id);
        res.json({message: "Expense source deleted successfully"})
    }catch(err){
        res.status(500).json({message: "Server Error"});
    }
};
//Download Excel
exports.downloadExpenseExcel = async (req, res) => {
    const userId = req.user.id;

    try{
        const expense = await Expense.find({ userId }).sort({ date: -1 });

        const data = expense.map((item) => ({
            Category: item.category,
            Amount: item.amount,
            Date: item.date,
            
        }));

        const wb = xlsx.utils.book_new();
        const ws = xlsx.utils.json_to_sheet(data);
        xlsx.utils.book_append_sheet(wb, ws, "Expense");
        xlsx.writeFile(wb, 'expense_details.xlsx');
        res.download('expense_details.xlsx');

    }catch(err){
        console.log(err);
        res.status(500).json({message: "Server Error", error: err})
    }
};