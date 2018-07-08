import React, {Component} from 'react';

class Workspace extends Component {
    render() {
        console.log(this.props)
        return (<div>Hello! {this.props.match.params.uuid}</div>);
    }
}

export default Workspace;
