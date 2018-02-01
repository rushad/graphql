import React from 'react';

import Menu from '../../components/Menu';
import Example1 from '../Example1';

import './styles.css';

const EXAMPLES = [
    {
        title: 'Example #1',
        page: Example1
    },
    {
        title: 'Example #2',
        page: Example1        
    },
    {
        title: 'Example #3',
        page: Example1
    },
    {
        title: 'Example #4',
        page: Example1
    }
];

class App extends React.Component {
    state = {
        selected: 0
    };

    render() {
        return (
            <div className='app'>
                <Menu
                    items={ EXAMPLES }
                    selected={ this.state.selected }
                    onSelect={ selected => this.setState({ selected }) }
                >
                    {
                        EXAMPLES.map((example, index) => (
                            <div key={ index }>{ example.title }</div>
                        ))
                    }
                </Menu>
                <div className='app__example'>
                    { React.createElement(EXAMPLES[this.state.selected].page) }
                </div>
            </div>
        );
    }
}

export default App;
