import React, { useEffect, useState } from 'react'
import DashboardLayout from '../../components/layouts/DashboardLayout'
import IncomeOverview from '../../components/Income/IncomeOverview';
import axiosInstance from '../../utils/axiosInstance';
import { API_PATHS } from '../../utils/apiPaths';
import Modal from '../../components/Modal';
import AddIncomeForm from '../../components/Income/AddIncomeForm';
import toast from 'react-hot-toast';
import IncomeList from '../../components/Income/IncomeList';
import DeleteAlert from '../../components/DeleteAlert';

const Income = () => {


  const [incomeData, setIncomeData] = useState([])
  const [isLoading, setIsLoading] = useState(null);
  const[openDeleteAlert, setOpenDeleteAlert] = useState({
    show: false,
    data: null,
  });
  const [openAddIncomeModal, setOpenAddIncomeModal] = useState(false);
  
  //Get all Income Details
  const fetchIncomeDetails = async () => {
     if(isLoading) return
     
     setIsLoading(true)

     try{
      const response = await axiosInstance.get(
        `${API_PATHS.INCOME.GET_ALL_INCOME}`
      );

      if(response.data){
        setIncomeData(response.data);
      }
     }catch(error){
      console.error("Error fetching income details: ", error);
     }finally{
      setIsLoading(false);
     }
  }

  const handleAddIncome = async (income) => {
      const { source, amount, date, icon} = income;

      //Validation
      if(!source.trim()){
        toast.error("Where are you getting the money from? god? event that is a source so write it!");
        return;
      }

      if(!amount || isNaN(amount) || Number(amount) <=0){
        toast.error("Dude get in the game, Invalid Account");
        return;
      }

      if(!date){
        toast.error("seriously? you're dumber than i thought");
        return;
      }

      try{
        await axiosInstance.post(API_PATHS.INCOME.ADD_INCOME, {
          source,
          amount, 
          date,
          icon,
        })

        setOpenAddIncomeModal(false);
        toast.success("There you go, finally!!!, Income added, officially Unberozgar")
        fetchIncomeDetails();
      }catch(error){
        console.error(
          "Error adding income: ",
          error.response?.data?.message || error.message 
        );
      }
  }

  const deleteIncome = async (id) => {
      try{
        await axiosInstance.delete(API_PATHS.INCOME.DELETE_INCOME(id));
        toast.success("Hurray you're one step closer to backruptcy")
        setOpenDeleteAlert({show:false, data: null});
        fetchIncomeDetails();
      }catch(error){
        console.error("Error deleting income",
          error.response?.data?.message || error.message
        );
      }
  }

  const handleDownloadIncomeDetails = async () => {

  }

  useEffect(() => {
    fetchIncomeDetails();
  }, []);
  
  return (
    <DashboardLayout activeMenu="Income">
      <div className="my-5 mx-auto">
        <div className="grid grid-cols-1 gap-6">
          <div className=''>
            <IncomeOverview
              transactions={incomeData}
              onAddIncome={() => setOpenAddIncomeModal(true)}
            />
          </div>
        </div>


        <IncomeList
          transactions={incomeData}
          onDelete = {(id) => setOpenDeleteAlert({show: true, data: id})}
          onDownloaded = {handleDownloadIncomeDetails}
        />

        <Modal
        isOpen={openAddIncomeModal}
        onClose={() => setOpenAddIncomeModal(false)}
        title="Add new Income source"
        >
           <AddIncomeForm onAddIncome={handleAddIncome}/> 
        </Modal>


        <Modal
          isOpen={openDeleteAlert.show}
          onClose={() => setOpenDeleteAlert({show: false, data: null})}
          title="Delete Income"
        >
          <DeleteAlert
            content="You sure about this homie? this will infact put this income in the fridge or another universe where you won't find it"
            onDelete={() => deleteIncome(openDeleteAlert.data)}
          />
        </Modal>
      </div>
    </DashboardLayout>
  )
}

export default Income