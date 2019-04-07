import React, {Component} from 'react';

export default class Hello extends Component {
    constructor(props){
      super(props);
    }
    render() {
        return (
            <div>
                Hello,{this.props.num}  {"<"}--I from Hello's props
            </div>
        )
    }
}