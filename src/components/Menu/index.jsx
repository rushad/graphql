import React from 'react';
import cn from 'classnames';

import './styles.css';

class MenuItem extends React.Component {
    render() {
        return (
            <div
                className={ cn('menu__item', { 'menu__item--selected': this.props.selected }) }
                onClick={ () => this.props.onClick() }
            >
                { this.props.content }
            </div>
        );
    }
}

class Menu extends React.Component {
    render() {
        return (
            <div className='menu'>
                { this.props.children.map((item, index) => (
                    <MenuItem
                        key={ index }
                        content={ item }
                        selected={ this.props.selected === index }
                        onClick={ () => this.props.onSelect(index) }
                    />
                ))}
            </div>
        );
    }
}

export default Menu;