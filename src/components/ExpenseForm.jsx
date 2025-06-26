import { useEffect, useState } from "react";

const ExpenseForm=(props)=>{
    const {itemToEdit}=props
    const [title,setTitle]=useState("");//(props.itemToEdit?.title || "");
    const [amount,setAmount]=useState("");//(props.itemToEdit?.amount || "");
    const [error,setError]=useState("");

    useEffect(()=>{
        if(itemToEdit){
            setTitle(itemToEdit.title)
            setAmount(itemToEdit.amount)
        }
    }, [itemToEdit])

    const isEdit=props.itemToEdit;
    const handleSubmit=(e)=>{


        
        e.preventDefault();
        if(!title){
            setError("Enter Title");
            return;
        }
        if(!amount){
            setError("Enter amount");
            return;
        }
        if(isEdit){
            props.editExpense(isEdit._id,title,amount);
        }else{
        props.addExpense(title,amount);
        }
        setError("")
        setTitle("")
        setAmount("")
    }
    const handleTitleChange=(e)=>{
        setTitle(e.target.value);
    }
    const handleAmountChange=(e)=>{
        setAmount(e.target.value);
    }
    const clearEdit=()=>{
        props.setItemToEdit(null)
        setTitle("")
        setAmount(0)
    }

    return (
            <div className="expense-form">
                <div className="clear-button">
                <h3>{isEdit ? "Edit Expense":"Add Expenses"}</h3>
                {isEdit && <button className="small-button" onClick={clearEdit} >Clear</button>}
                </div>
                <form onSubmit={handleSubmit}>
                {error && <div className="error">{error}</div>}
                    <div className="form-group">
                        <label htmlFor="title">Title</label>
                        <input type="text" id="title" name="title" placeholder="Enter your title" value={title}
                        onChange={handleTitleChange}/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="amount">Amount ($)</label>
                        <input type="number" id="amount" name="amount" placeholder="Enter your amount" value={amount}
                        onChange={handleAmountChange}/>
                    </div>
                    <button type="submit">{isEdit ? "Edit Expense":"Add Expenses"}</button>
                </form>
                    <label></label>
                </div>
        
    )
}
export default ExpenseForm;