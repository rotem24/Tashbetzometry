import React, { Component, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import '../App.css';


class Stopwatch extends Component {

    state = {
        timerOn: false,
        timerStart: 0,
        timerTime: 0
    };

    componentDidMount() {
        this.setState({
            timerOn: true,
            timerTime: this.state.timerTime,
            timerStart: Date.now() - this.state.timerTime
        });
        this.timer = setInterval(() => {
            this.setState({
                timerTime: Date.now() - this.state.timerStart
            });
        }, 10);
    }

    stopTimer = () => {
        clearInterval(this.timer);
        this.setState({ timerOn: false });
    };

    sendData = (endTime) => {
        this.props.parentCallback(endTime);
    }

    componentWillUnmount() {
        this.stopTimer();
        var endTime = this.state.timerTime;
        this.sendData(endTime);
    }

 


    render() {
        const { timerTime } = this.state;
        let seconds = ("0" + (Math.floor(timerTime / 1000) % 60)).slice(-2);
        let minutes = ("0" + (Math.floor(timerTime / 60000) % 60)).slice(-2);

        return (
            <div className="Stopwatch">
                <div className="Stopwatch-display">
                    {minutes}:{seconds}
                </div>

            </div>
        );
    }
}
export default Stopwatch;