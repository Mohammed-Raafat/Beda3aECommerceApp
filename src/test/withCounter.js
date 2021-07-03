import React from 'react';

const withCounter = (WrappedComponent, num = 1) => {
    class WithCounter extends React.Component {
        constructor(props) {
            super(props)
            
            this.state = {
                count: 0
            }
        }
        handleIncreament = () => {
            const newCount = this.state.count + num;
            this.setState({
                count: newCount
            });
        }
        
        render () {
            return(
                <WrappedComponent count={this.state.count} handleIncreament={this.handleIncreament}/>
            );
        }
    }
    return WithCounter;
}

export default withCounter;