import React, {Component} from 'react';
import Editor from './Editor';
import MarkdownEditor from './MarkdownEditor';
import JSONEditor from './JSONEditor';

const getContentFromJson = (name, uuid) => {
    const json = localStorage.getItem(uuid);
    if (!json) return null;

    const data = JSON.parse(json);
    const item = data.filter(item => item.name === name);
    if (item.length === 0) return null;
    return item[0];
}

class WrapEditor extends Component {
    render() {
        const {name, uuid} = this.props;
        const content = getContentFromJson(name, uuid)

        if (!content) return null;

        let type = "javascript";
        let Component = Editor;
        if (content.type === "json") {
            type = "json";
            Component = JSONEditor;
        }
        else if (content.type === "md") {
            type = "markdown";
            Component = MarkdownEditor;
        }

        return (<div id="wrap-editor" style={{width: '100%', height: '100%', display: 'flex'}}>
            <Component {...this.props} content={content} type={type} />
        </div>);
    }
}

export default WrapEditor
