import React, { Component } from 'react'
import PropTypes from 'prop-types'

class SearchInput extends Component {
    state = {
        typingTimeOut: 100,
        timeOut: null,
        searchText: ''
    }

    static propTypes = {
        onSearch: PropTypes.func.isRequired,
        typingTimeOut: PropTypes.number.isRequired,
        placeHolder: PropTypes.string.isRequired
    }

    changeSearch = (event) => {
        if (this.state.timeOut){
            clearTimeout(this.state.timeOut)
        }
        this.setState({
            searchText: event.target.value,
            timeOut: setTimeout(()=> this.props.onSearch(this.state.searchText), this.state.timeOut)
        })
    }

    render() {
        const { placeHolder, typingTimeOut } = this.props
        this.setState({timeOut: typingTimeOut})
        return (
            <input type="text" onChange={this.changeSearch} placeholder={placeHolder} />
        )
    }
}

export default SearchInput