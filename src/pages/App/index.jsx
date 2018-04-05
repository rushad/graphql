import React from 'react';

import Menu from '../../components/Menu';
import SourceView from '../../components/SourceView';
import Example1 from '../Example1';
import Example2 from '../Example2';
import Example3 from '../Example3';
import Example4 from '../Example4';

import { stripIndent } from '../../utils';

import './styles.css';

const EXAMPLES = [
    {
        title: 'Example #1',
        page: Example1,
        source: './src/components/PickActor/index.jsx'
    },
    {
        title: 'Example #2',
        page: Example2,
        source: './src/pages/Example2/index.jsx'
    },
    {
        title: 'Example #3',
        page: Example3,
        source: './src/pages/Example3/index.jsx'
    },
    {
        title: 'Example #4',
        page: Example4,
        source: './src/pages/Example4/index.jsx'
    }
];

// eslint-disable-next-line
let _appInstance;
export function appInstance() {
    return _appInstance;
}

class App extends React.Component {
    constructor() {
        super();
        _appInstance = this;
        this.state = {
            selected: 0,
            query: null,
            time: null,
            sent: null,
            received: null
        };
    }

    setStats(stats) {
        this.setState(stats);
    }

    render() {
        return (
            <div className='app'>
                <div className='app__menu'>
                    <Menu
                        items={ EXAMPLES.map(example => example.title) }
                        selected={ this.state.selected }
                        onSelect={ selected => this.setState({ selected }) }
                    />
                </div>
                <div className='app__example'>
                    <div className='app__example-title'>
                        { EXAMPLES[this.state.selected].title }
                    </div>
                    { React.createElement(EXAMPLES[this.state.selected].page) }
                </div>
                <div className='app__info'>
                    <div className='app__stats'>
                        <div className='app__stats-element'>
                            <div>Time elapsed: { this.state.time }ms</div>
                            <div>Sent: { this.state.sent } bytes</div>
                            <div>Received: { this.state.received } bytes</div>
                        </div>
                        <div className='app__stats-element'>{ stripIndent(this.state.query) }</div>
                    </div>
                    <div className='app__filename'>
                        { EXAMPLES[this.state.selected].source }
                    </div>
                    <div className='app__source'>
                        <SourceView
                            file={ EXAMPLES[this.state.selected].source }
                        />
                    </div>
                </div>
            </div>
        );
    }
}

export default App;
