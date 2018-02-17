import React from 'react';

import PickActor from '../../components/PickActor';

import './styles.css';

class Example1 extends React.Component {
    constructor() {
        super();
        this.state = {
            selectedActorId: null
        };
    }

    render() {
        return (
            <div className='example1'>
                <PickActor
                    selected={ this.state.selectedActorId }
                    onChange={ actorId => this.setState({ selectedActorId: actorId }) }
                />
            </div>
        );
    }
}

export default Example1;
