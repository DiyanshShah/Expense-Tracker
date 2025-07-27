const Income = require('../models/Income');
const Expense = require('../models/Expense');
const { IsValidObjectId, Types, isValidObjectId } = require('mongoose');

//Dashboard Data
exports.getDashBoardData = async (req, res) => {
    try{
        const userId = req.user.id;
        const userObjectId = new Types.ObjectId(String(userId));
        

        //Total income and expense
        const totalIncome = await Income.aggregate([
            { $match: { userId: userObjectId }},
            { $group: { _id: null, total: {$sum: "$amount"}}},
        ]);

        console.log("total Income", {totalIncome, userId: isValidObjectId(userId)});

        const totalExpense = await Expense.aggregate([
            {$match: {userId:userObjectId}},
            {$group:{_id:null, total:{$sum: "$amount"}}},
        ]);


        //get income transactions of the last 60 days
        const last60DaysIncomeTransactions = await Income.find({
            userId,
            date: {$gte: new Date(Date.now() - 60*24*60*60*1000)},
        }).sort({ date: -1 });

        //get total income for last 60 days
        const incomeLast60Days = last60DaysIncomeTransactions.reduce(
            (sum, transaction) => sum + transaction.amount,
            0
        );

        //Get expense transactions in the last 30 days
        const last30DaysExpenseTransactions = await Expense.find({
            userId,
            date: {$gte: new Date(Date.now() - 30*24*60*60*1000)}
        }).sort({date: -1});

        //Get total expenses for last 30 days
        const expensesLast30Days = last30DaysExpenseTransactions.reduce(
            (sum, transaction) => sum + transaction.amount, 
            0
        );

        //Fetch last 5 transactions (income and expense)
        const lastTransactons = [
            ...(await Income.find({ userId }).sort({date: -1}).limit(5)).map(
                (txn) => ({
                    ...txn.toObject(),
                    type: "income",
                })
            ),
            ...(await Expense.find({ userId }).sort({date: -1}).limit(5)).map(
                (txn) => ({
                    ...txn.toObject(),
                    type: "expense",
                })
            ),

        ].sort((a, b) => b.date - a.date);


        //Final Response
        res.json({
            totalBalance:
                (totalIncome[0]?.total || 0) - (totalExpense[0]?.total || 0),
                totalIncome: totalIncome[0]?.total || 0,
                totalExpense: totalExpense[0]?.total || 0,
                last30DaysExpenses:{
                    total: expensesLast30Days,
                    transactions: last30DaysExpenseTransactions,
                },
                last60DaysIncome:{
                    total: incomeLast60Days,
                    transactions: last60DaysIncomeTransactions
                },
                recentTransactions: lastTransactons,
                 
        });
    }
        catch(error){
            res.status(500).json({message: "Server Error", error})
            console.log("Error:" ,error);
        }
}