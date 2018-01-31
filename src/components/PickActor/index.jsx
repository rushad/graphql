import React from 'react';

class PickActor extends React.Component {
    state = {
        actors: []
    };

    componentWillMount() {
        setTimeout(() => {
            this.setState({ actors: [ 'qwe', 'asd', 'zxc' ] });
        }, 3000);
    }

    render() {
        return (
            <div>
                PickActor:
                { this.state.actors.map(actor => (
                    <div>
                        { actor }
                    </div>
                ))}
            </div>
        );
    }
}

export default PickActor;