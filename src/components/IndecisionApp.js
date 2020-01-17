import React from 'react'
// Can leave off .js when building using Webpack
import AddOption from './AddOption'
import Options from './Options'
import Header from './Header'
import Action from './Action'
import OptionModal from './OptionModal'

class IndecisionApp extends React.Component {
    state = {
        options: [],
        selectedOption: undefined
    }

    handleDeleteOptions = () => {
        // this.setState(() => {
        //     return {
        //         options: []
        //     }
        // })

        // This line is same as above. {} is usually an object but when used in arrow functions, it is evaluated as the function body.
        // To have arrow function return an object, put brackets around the curly braces: ({This is an object})
        this.setState(() => ({options: []}))
    }

    handleDeleteOption = (optionToRemove) => {
        this.setState((prevState) => ({
            options: prevState.options.filter((option) => {
                // Filter here will return all options[] elements not equal to the option to remove.
                return optionToRemove !== option
            })
        }))
    }

    handlePick = () => {
        const randomNum = Math.floor(Math.random() * this.state.options.length)
        const chosen = this.state.options[randomNum]
        this.setState(() => ({
            selectedOption: chosen
        }))
    }

    handleClearSelectedOption = () => {
        this.setState(() => ({
            selectedOption: undefined
        }))
    }

    handleAddOption = (option) => {
        // Run only if option is an empty string.
        if(!option) {
            return "Enter valid value to add item."
        } else if(this.state.options.indexOf(option) > -1) {
            // Check if option already in the array.
            return "This option already exists."
        } else {
            // Use concat instead of push to return a new array instead of modifying state contents directly.
            this.setState((prevState) => ({options: prevState.options.concat([option])}))
        }
        // This function will get "undefined" back if everything went properly b/c nothing is explicitly returned.
        // If something is returned, then it means an error occured. The status of the return value can be passed to child function for action.
    }

    componentDidMount() {
        try {
            const json = localStorage.getItem("options")
            const options = JSON.parse(json)
    
            if(options) {
                this.setState(() => ({options:options}))
            }
        } catch (e) {
            // If JSON data is invalid, do nothing at all.
        }
    }

    componentDidUpdate(prevProps, prevState) {
        if(prevState.options.length !== this.state.options.length) {
            const json = JSON.stringify(this.state.options)
            localStorage.setItem("options", json)
        }
    }

    componentWillUnmount() {

    }

    render() {
        const subtitle = "Put your life in the hands of a computer."

        return(
            <div>
                <Header subtitle={subtitle}/>
                <div className="container">
                    <Action handlePick={this.handlePick} hasOptions={this.state.options.length > 0}/>
                    <div className="widget">
                        <Options 
                            options={this.state.options} 
                            handleDeleteOptions={this.handleDeleteOptions}
                            handleDeleteOption={this.handleDeleteOption}
                        />
                        <AddOption
                            handleAddOption={this.handleAddOption}
                        />
                    </div>
                </div>
                <OptionModal 
                    selectedOption={this.state.selectedOption}
                    handleClearSelectedOption={this.handleClearSelectedOption}
                />
            </div>
        )
    }
}

export default IndecisionApp