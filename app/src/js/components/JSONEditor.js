import React, {Component} from 'react';

import Editor from './Editor';

class JSONEditor extends Editor {
    componentDidMount() {
        require('brace/mode/json');
        this.updateEditor(this.props);
    }
}

export default JSONEditor 
