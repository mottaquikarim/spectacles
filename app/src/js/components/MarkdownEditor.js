import React, {Component} from 'react';

import Editor from './Editor';
const marked = require('marked')

const updateHTML = (editor, preview) => {
    const markup = marked(editor.getValue())
    preview.innerHTML = markup;
}

class MarkdownEditor extends Editor {
    componentDidMount() {
        require('brace/mode/markdown');
        this.updateEditor(this.props);
    }
    updateEditor(props) {
        super.updateEditor(props)
        const preview = document.getElementById('preview');
        const editor = ace.edit('editor');

        updateHTML(editor, preview)
        editor.getSession().on('change', () => updateHTML(editor, preview))
        editor.getSession().setUseWrapMode(true);
    }
    render() {
        const styles = {
            width: '50%',
            height: '100%',
        }

        return (<div style={Object.assign({}, styles, {
            width: '100%', 
            display: 'flex',
        })}>
            <div id="editor" style={styles}></div>
            <div id="preview" style={Object.assign({}, styles, {
                padding: '10px',
                backgroundColor: 'white',
                color: 'black',
            })}></div>
        </div>);
    }
}

export default MarkdownEditor
