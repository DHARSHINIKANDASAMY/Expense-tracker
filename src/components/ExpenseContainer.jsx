import { useState, useEffect } from 'react';
import History from './History';
import ExpenseForm from './ExpenseForm';
import BalanceContainer from './BalanceContainer';

const ExpenseContainer = () => {
  const [expenses, setExpenses] = useState([]);
  const [itemToEdit, setItemToEdit] = useState(null);

  const fetchExpense=async()=>{
    // setLoading(true);
    try{
      const response=await fetch(`https://expense-tracker-backend-4-irrz.onrender.com/expense`);
      const data=await response.json();
      setExpenses(data); 
    }catch(err){
      console.log('Failed to fetch expenses:',err);
    }
  }
  useEffect(() => {
    fetchExpense();
  },[]);

  const addExpense=async(title,amount)=>{
try{
  const response =await fetch(`https://expense-tracker-backend-4-irrz.onrender.com/expense`,{
    method:'POST',
    headers:{'Content-Type':'application/json'},
    body:JSON.stringify({title,amount}),
  });
  if(response.ok){
    const newItem=await response.json();
    setExpenses((prev)=>[...prev,newItem]);
    await fetchExpense();
  }else{
    console.error('Failed to add Expense');
  }
}catch(error){
  console.error('Error adding expense:',error);
}
  };

const editExpense=async(id,title,amount)=>{
  try{
    const response=await fetch(`https://expense-tracker-backend-4-irrz.onrender.com/expense/${id}`,{
      method:'PUT',
      headers:{'Content-Type':'application/json'},
      body:JSON.stringify({title,amount}),
    });
    if(response.ok){
      await fetchExpense();
      setItemToEdit(null);
      // const updatedItem=await response.json();
      // setExpenses(expenses.map(expense=>expense.id===id?updatedItem:expense));
    }else{
      console.error('Failed to edit expense');
    }
  }catch(err){
      console.error('Error editing expense:',err);
  }
};

const deleteExpense=async(id)=>{
  try{
    const response=await fetch(`https://expense-tracker-backend-4-irrz.onrender.com/expense/${id}`,{
      method:'DELETE',
    });
    if(response.ok){
      await fetchExpense();
    }
    else{
      console.error('Failed to delete expense');
    }
  }catch(err){
    console.log('Error deleting expense:',err);
  }
};

  


  // Fetch all expenses from backend on component load
  // useEffect(() => {
  //   fetch(`${import.meta.env.VITE_API_URL}/expense`)
  //     .then((res) => res.json())
  //     .then((data) => setExpenses(data))
  //     .catch((err) => console.error('Error fetching expenses:', err));
  // }, []);

  // // Add new expense to backend
  // const addExpense = (title, amount) => {
  //   fetch(`${import.meta.env.VITE_API_URL}/expense`, {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //     body: JSON.stringify({ title, amount }),
  //   })
  //     .then((res) => res.json())
  //     .then((newExpense) => {
  //       setExpenses([...expenses, newExpense]);
  //     })
  //     .catch((err) => console.error('Error adding expense:', err));
  // };

//   delete expense
//   const deleteExpense = (id) => {
//   fetch(`${import.meta.env.VITE_API_URL}/expense/${id}`, {
//     method: 'DELETE',
//   })
//     .then((res) => {
//       if (!res.ok) throw new Error('Delete failed');
//       setExpenses(expenses.filter((exp) => exp._id !== id));
//     })
//     .catch((err) => console.error('Error deleting expense:', err));
// };

//edit expense
//   const editExpense = (id, title, amount) => {
//   fetch(`${import.meta.env.VITE_API_URL}/expense/${id}`, {
//     method: 'PUT',
//     headers: {
//       'Content-Type': 'application/json',
//     },
//     body: JSON.stringify({ title, amount }),
//   })
//     .then((res) => res.json())
//     .then((updatedExpense) => {
//       setExpenses(
//         expenses.map((exp) =>
//           exp._id === id ? updatedExpense : exp
//         )
//       );
//       setItemToEdit(null);
//     })
//     .catch((err) => console.error('Error updating expense:', err));
// };



  return (
    <>
      <br />
      <div className="expense-container">
        <h1>Expense Tracker</h1>
        <BalanceContainer expenses={expenses} />
        <ExpenseForm
          addExpense={addExpense}
          itemToEdit={itemToEdit}
          editExpense={editExpense}
          setItemToEdit={setItemToEdit}
        />
        <History
          expenses={expenses}
          deleteExpense={deleteExpense}
          setItemToEdit={setItemToEdit}
          itemToEdit={itemToEdit}
        />
      </div>
    </>
  );
};

export default ExpenseContainer;
