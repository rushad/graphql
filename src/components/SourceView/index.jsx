import React from 'react';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { docco } from 'react-syntax-highlighter/styles/hljs';

async function getSource(file) {
    const response = await fetch('/source', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: `{ "file": "${file}" }`
    });
    return await response.text();
}

class SourceView extends React.Component {
    state = {
        source: ''
    };

    async loadSource(file) {
        const source = await getSource(file);
        this.setState({ source });        
    }

    componentWillMount() {
        this.loadSource(this.props.file);
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.file !== nextProps.file) {
            this.loadSource(nextProps.file);
        }
    }

    render() {
        return (
            <SyntaxHighlighter
                language='javascript'
                style={ docco }
            >
                { this.state.source }
            </SyntaxHighlighter>
        );
    }
}

export default SourceView;