import React, { useState, useEffect } from 'react'
import { useUserAuth } from '../../hooks/useUserAuth'
import DashboardLayout from '../../components/layouts/DashboardLayout'
import { API_PATHS } from '../../utils/apiPaths'
import toast from 'react-hot-toast'
import Modal from '../../components/Modal';
import axiosInstance from '../../utils/axiosInstance'
import ExpenseOverview from '../../components/Expense/ExpenseOverview'
import AddExpenseForm from '../../components/Expense/AddExpenseForm'
import ExpenseList from '../../components/Expense/ExpenseList'
import DeleteAlert from '../../components/DeleteAlert'

const Expense = () => {
  const [expenseData, setExpenseData] = useState([])
    const [isLoading, setIsLoading] = useState(null);
    const[openDeleteAlert, setOpenDeleteAlert] = useState({
      show: false,
      data: null,
    });
    const [openAddExpenseModal, setOpenAddExpenseModal] = useState(false);
    //Get all Expense Details
  const fetchExpenseDetails = async () => {
     if(isLoading) return
     
     setIsLoading(true)

     try{
      const response = await axiosInstance.get(
        `${API_PATHS.EXPENSE.GET_ALL_EXPENSE}`
      );

      if(response.data){
        setExpenseData(response.data);
      }
     }catch(error){
      console.error("Error fetching income details: ", error);
     }finally{
      setIsLoading(false);
     }
  }

  const handleAddExpense = async (expense) => {
      const { category, amount, date, icon} = expense;

      //Validation
      if(!category.trim()){
        toast.error("So you're not spending anywhere? why bother adding an expense, are you restarted by any chance?!");
        return;
      }

      if(!amount || isNaN(amount) || Number(amount) <=0){
        toast.error("Dude get in the game, Invalid Amount");
        return;
      }

      if(!date){
        toast.error("seriously? you're dumber than i thought");
        return;
      }

      try{
        await axiosInstance.post(API_PATHS.EXPENSE.ADD_EXPENSE, {
          category,
          amount, 
          date,
          icon,
        })

        setOpenAddExpenseModal(false);
        toast.success("There you go, finally!!!, Income added, officially Unberozgar")
        fetchExpenseDetails();
      }catch(error){
        console.error(
          "Error adding expense: ",
          error.response?.data?.message || error.message 
        );
      }
  }

  const deleteExpense = async (id) => {
    
      try{
        await axiosInstance.delete(API_PATHS.EXPENSE.DELETE_EXPENSE(id));
        setOpenDeleteAlert({show: false, data: id})
        toast.success("Yay, finally some responsibility huhhh")
        setOpenDeleteAlert({show:false, data: null});
        fetchExpenseDetails();
      }catch(error){
        console.error("Error deleting expense",
          error.response?.data?.message || error.message
        );
      }
  }

  const handleDownloadExpenseDetails = async () => {
      try{
        const response = await axiosInstance.get(
          API_PATHS.EXPENSE.DONWLOAD_EXPENSE, 
          {
            responseType: "blob",
          }
        );

        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", "expense_details.xlsx");
        document.body.appendChild(link);
        link.click();
        link.parentNode.removeChild(link);
        window.URL.revokeObjectURL(url);

      }catch(error){
        console.error("Error downloading expense details: ", error);
        toast.error("Awwwwww the site doesn't want to give you the expense details, so sed")
      }
  } 

  useEffect(() => {
    fetchExpenseDetails();
  
    return () => {}
  }, [])
  
  useUserAuth();
  return (
    <DashboardLayout activeMenu={"Expense"}>
      <div className='my-5 mx-auto'>
        <div className='grid grid-cols-1 gap-6'>
          <div className="">
            <ExpenseOverview
              transactions={expenseData}
              onExpenseIncome = {() => setOpenAddExpenseModal(true)}
            />
          </div>

          <ExpenseList
            transactions={expenseData}
            onDelete={(id) => setOpenDeleteAlert({show: true, data: id})}
            onDownloaded = {handleDownloadExpenseDetails}
          />
        </div>

        <Modal
          isOpen={openAddExpenseModal}
          onClose={() => setOpenAddExpenseModal(false)}
          title="Add Expense"
        >
          <AddExpenseForm onAddExpense = {handleAddExpense}/>  
        </Modal>

        <Modal
          isOpen={openDeleteAlert.show}
          onClose={() => setOpenDeleteAlert({show: false, data: null})}
          title="Delete Expense"
        >
          <DeleteAlert
            content="You sure about this homie? this will infact put this expense in the fridge or another universe where you won't find it"
            onDelete={() => deleteExpense(openDeleteAlert.data)}
          />
        </Modal>
      </div>
    </DashboardLayout>
  )
}

export default Expense
