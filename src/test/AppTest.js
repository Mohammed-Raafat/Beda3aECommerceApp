import React, { Component } from 'react';
import ClickCounter from './ClickCounter';
import HoverCounter from './HoverCounter';

class AppTest extends Component {
    render() {
        return (
            <div>
                <ClickCounter />
                <HoverCounter />
            </div>
        )
    }
}

export default AppTest;