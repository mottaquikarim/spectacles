import React, {Component} from 'react';

const ace = require('brace');
require('brace/theme/monokai');

class Editor extends Component {
    componentDidMount() {
        require('brace/mode/javascript');
        this.updateEditor(this.props);
    }
    updateEditor(props) {
        const {name, uuid, content, type} = props;
        const editor = ace.edit('editor');

        editor.getSession().setMode('ace/mode/' + type);
        editor.setTheme('ace/theme/monokai');
        editor.getSession().setValue(content.content);

        let timeout = null;
        const json = localStorage.getItem(uuid);
        const data = JSON.parse(json);
        editor.getSession().on('change', () => {
            clearTimeout(timeout);
            timeout = setTimeout(() => {
                const items = data.map(item => {
                    if (item.name === name) {
                        item.content = editor.getValue();
                    }
                    return item;
                });

                localStorage.setItem(uuid, JSON.stringify(items));
            }, 500);
        });
    }
    componentWillReceiveProps(nextProps) {
        if (nextProps.name !== this.props.name) {
            this.updateEditor(nextProps);
        }
    }
    render() {
        const styles = {
            width: '100%',
            height: '100%',
        }

        return (<div id="editor" style={styles}></div>);
    }
}

export default Editor
