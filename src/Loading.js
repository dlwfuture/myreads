import React, { Component } from 'react'
import ReactLoading from 'react-loading'

class Loading extends Component{
    render(){
        const { isLoading } = this.props

        return isLoading && (
            <div className='loader-holder animated fadeIn'>
                <ReactLoading type={'spinningBubbles'} color={'#fff'} height={'15%'} width={'15%'} />
            </div>
        )
    }
}

export default Loading