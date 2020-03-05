import uuid from 'uuid'
import database from '../firebase/firebase'

/** Original before Firebase
 * 1. component calls action generator
 * 2. action generator returns object
 * 3. component dispatches object
 * 4. redux store runs reducers to change data
 */

 /** Asynchronous Actions
 * 1. component calls action generator
 * 2. action generator returns function
 * 3. component dispatches function, redux by default does not allow function dispatch, so need to add middleware (redux-thunk)
 * 4. function runs and has the ability to dispatch other actions and do whatever it wants
 */

export const addExpense = (expense) => ({
    type: 'ADD_EXPENSE',
    expense
})

// Requires thunk to return a function. Set argument to expense, if no expense provided, set to an empty object.
export const startAddExpense = (expenseData = {}) => {
    return (dispatch) => {
        // destructure expenseData
        const {
            description = '', 
            note = '', 
            amount = 0, 
            createdAt = 0
        } = expenseData
        const expense = { description, note, amount, createdAt }
        
        return database.ref('expenses').push(expense).then((ref) => {
            dispatch(addExpense({
                id: ref.key,
                ...expense
            }))
        })
    }
}

export const removeExpense = ({id} = {}) => {
    return {
        type: 'REMOVE_EXPENSE',
        id
    }
}

export const startRemoveExpense = ({id} = {}) => {
    return (dispatch) => {
        return database.ref(`expenses/${id}`).remove().then(() => {
            dispatch(removeExpense({ id }))
        })
    }
}

export const editExpense = (id, updates) => ({
    type: 'EDIT_EXPENSE',
    id,
    updates
})

export const startEditExpense = (id, updates) => {
    return (dispatch) => {
        return database.ref(`expenses/${id}`).update(updates).then(() => {
            dispatch(editExpense(id, updates))
        })
    }
}

// SET_EXPENSES
export const setExpenses = (expenses) => ({
    type: 'SET_EXPENSES',
    expenses
})

// asynchronous action to start SET_EXPENSES
export const startSetExpenses = () => {
    return (dispatch) => {
        return database.ref('expenses').once('value').then((snapshot) => {
            const expenses = []
            snapshot.forEach((childSnapshot) => {
                expenses.push({
                    id: childSnapshot.key,
                    ...childSnapshot.val()
                })
            })
            dispatch(setExpenses(expenses))
        })
    }
}