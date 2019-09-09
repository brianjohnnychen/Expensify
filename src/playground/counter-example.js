class Counter extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            count: props.count
        }

        this.handleAddOne = this.handleAddOne.bind(this)
        this.handleMinusOne = this.handleMinusOne.bind(this)
        this.handleReset = this.handleReset.bind(this)
    }

    handleAddOne() {
        this.setState((prevState) => {
            return {
                count: prevState.count + 1
            }
        })
        console.log("Handle add one")
    }

    handleMinusOne() {
        this.setState((prevState) => {
            return {
                count: prevState.count - 1
            }
        })
        console.log("Handle minus one")
    }

    handleReset() {
        this.setState(() => {
            return {
                count: 0
            }
        })
        console.log("Handle reset")
    }
    
    render() {
        return(
            <div>
                <h1>Count: {this.state.count}</h1>
                <button onClick={this.handleAddOne}>+1</button>
                <button onClick={this.handleMinusOne}>-1</button>
                <button onClick={this.handleReset}>Reset</button>
            </div>
        )
    }
}

Counter.defaultProps = {
    count: 0
}

ReactDOM.render(<Counter/>, document.getElementById("app"))


// let count = 0
// const addOne = () => {
//     count++
//     renderCounterApp()
// }
// const minusOne = () => {
//     count--
//     renderCounterApp()
// } 
// const resetCount = () => {
//     count = 0
//     renderCounterApp()
// }
// const template = (
//     <div>
//         <h1>Count: {count}</h1>
//         <button onClick={addOne}>+1</button>
//         <button onClick={minusOne}>-1</button>
//         <button onClick={resetCount}>Reset</button>
//     </div>
// )
// console.log(template)
// const appRoot = document.getElementById("app")

// const renderCounterApp = () => {
//     const template = (
//         <div>
//             <h1>Count: {count}</h1>
//             <button onClick={addOne}>+1</button>
//             <button onClick={minusOne}>-1</button>
//             <button onClick={resetCount}>Reset</button>
//         </div>
//     )
//     ReactDOM.render(template, appRoot)
// }
// renderCounterApp()