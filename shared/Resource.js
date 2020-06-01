import React, { Component } from 'react';
import {} from 'react-native';

class Resource extends Component{
    state = {
        loading:false,
        payload: []
    }

    componentDidMount(){
        this.setState({loading:true})
        axios.get(this.props.path).then(res =>{
            this.setState({
                payload: res.data,
                loading: false
            })
        })
    }

    render(){
        return this.props.render(this.state)
    }
}

export default Resource;