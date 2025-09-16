
const ExpenseItem=(props)=>{
    const {title,amount,_id}=props.expense;
    const type=amount>0?"income":"expense";

    const handleDelete=()=>{  
            props.deleteExpense(_id);
    };
    const handleEdit=()=>{
        props.setItemToEdit(props.expense);
    }
    return (
        <div className={`expense-item ${type} ${props.itemToEdit?._id===_id?"isEditing":""}`}>
            <div className="expense-title">{title}</div>
            <div className="expense-amount">${amount}</div>
            
            <div className="delete-button-overlay">
                <button onClick={handleEdit}>Edit</button>
                <button onClick={handleDelete}>Delete</button>
            </div>
        
    );
};
export default ExpenseItem;
