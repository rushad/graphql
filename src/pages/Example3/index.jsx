import React from 'react';
import cn from 'classnames';

import { queryGraphQL } from '../../graphql';

import './styles.css';

const PER_PAGE = 5;

class Example3 extends React.Component {
    constructor() {
        super();
        this.state = {
            page: 0,
            count: 0,
            actors: []
        };
    }

    componentWillMount() {
        this.loadPage();
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.state.page !== prevState.page) {
            this.loadPage();
        }
    }

    async loadPage() {
        const result = await queryGraphQL(`
            query($page: Int, $perPage: Int) {
                actors(page: $page, perPage: $perPage, sortField: "lastName") {
                    id
                    firstName
                    lastName
                    gender
                    picture
                }
                totalActors
            }          
        `, {
            page: this.state.page,
            perPage: PER_PAGE
        });
        this.setState({ actors: result.data.actors, count: result.data.totalActors });
    }

    render() {
        const pagesCount = Math.floor((this.state.count + (PER_PAGE - 1)) / PER_PAGE);
        const isFirstPage = this.state.page < 1;
        const isLastPage = this.state.page >= pagesCount - 1;
        return (
            <div className='example3'>
                <div
                    role='button'
                    tabIndex={ -1 }
                    className={ cn('example3__button', { 'example3__button--disabled': isFirstPage }) }
                    onClick={ () => !isFirstPage && this.setState({ page: this.state.page - 1 }) }
                    onKeyDown={ () => {} }
                >
                    &lt;&lt; Prev
                </div>
                <div className='example3__count'>[ { this.state.page + 1} / { pagesCount } ]</div>
                <div
                    role='button'
                    tabIndex={ -1 }
                    className={ cn('example3__button', { 'example3__button--disabled': isLastPage }) }
                    onClick={ () => !isLastPage && this.setState({ page: this.state.page + 1 }) }
                    onKeyDown={ () => {} }
                >
                    Next &gt;&gt;
                </div>
                {
                    this.state.actors.map(actor => (
                        <div key={ actor.id } className='example3__actor'>
                            <img
                                className='example3__picture'
                                src={ actor.picture }
                                alt=''
                            />
                            <div className='example3__name'>
                                { actor.firstName } { actor.lastName }
                            </div>
                        </div>
                    ))
                }
            </div>
        );
    }
}

export default Example3;
