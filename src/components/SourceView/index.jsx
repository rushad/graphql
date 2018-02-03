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

    async componentWillMount() {
        const source = await getSource(this.props.file);
        this.setState({ source });        
    }

    async componentDidUpdate() {
        const source = await getSource(this.props.file);
        this.setState({ source });
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