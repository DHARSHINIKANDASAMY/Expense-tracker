import ExpenseItem from "./ExpenseItem";

const History = (props) => {
    const { expenses } = props;

    return (
        <div className="history">
            <h3>History</h3>
            {expenses.map((expense) => (
                <ExpenseItem 
                key={expense._id} 
                expense={expense} 
                itemToEdit={props.itemToEdit}
                deleteExpense={props.deleteExpense}
                setItemToEdit={props.setItemToEdit} />
            ))}

        </div>
    );
};
export default History;