import React, {Component} from 'react';

const ace = require('brace');
require('brace/mode/javascript');
require('brace/mode/markdown');
require('brace/mode/json');
require('brace/theme/monokai');

const marked = require('marked')

class CodeSpace extends Component {
    constructor() {
        super()

        this.myRef = React.createRef();
    }
    updateEditor(props) {
        const {name, uuid} = props;
        const json = localStorage.getItem(uuid);
        if (!json) return null;

        const data = JSON.parse(json);
        const item = data.filter(item => item.name === name);
        if (item.length === 0) return null;
        const content = item[0];

        const width = content.type === "md" ? "50" : "100";
        const preview = content.type === "md" ? `<div id="preview" style="width: ${width}%; height: 100%; background-color: white; color: black; overflow: auto; padding: 10px;"></div>` : "";
        document.getElementById('wrap-editor').innerHTML = `
            <div id="editor" style="width: ${width}%; height: 100%;"></div>
            ${preview}
        `;
        const editor = ace.edit('editor');
        let type = "javascript";
        if (content.type === "json") {
            type = "json";
        }
        else if (content.type === "md") {
            type = "markdown";
            document.getElementById('preview').innerHTML = marked(content.content)
        }
        editor.getSession().setMode('ace/mode/' + type);
        editor.setTheme('ace/theme/monokai');
        editor.getSession().setValue(content.content);
        let timeout = null;
        editor.getSession().on('change', () => {
            clearTimeout(timeout);
            timeout = setTimeout(() => {
                if (content.type === "md") {
                    document.getElementById('preview').innerHTML = marked(editor.getValue())
                }
                const items = data.map(item => {
                    if (item.name === name) {
                        item.content = editor.getValue();
                    }

                    return item;
                });
                localStorage.setItem(uuid, JSON.stringify(items));
            }, 500);
        });

        if (content.type === "md") {
            editor.getSession().setUseWrapMode(true);
        }
    }
    componentDidMount() {
        this.updateEditor(this.props);
    }
    componentWillReceiveProps(nextProps) {
        if (nextProps.name !== this.props.name) {
            this.updateEditor(nextProps);
        }
    }
    render() {
        return (<div id="wrap-editor" style={{width: '100%', height: '100%', display: 'flex'}}>
            <div id="editor" style={{width: '100%', height: '100%'}}></div>
        </div>)
    }
}

export default CodeSpace
