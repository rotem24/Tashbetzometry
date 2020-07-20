import React, { Component } from 'react';
import '../App.css';


class Stopwatch extends Component {

    EndTime1 = localStorage.getItem("endTime");
    isLastCross = this.props.IsLastCross;

    state = {
        timerOn: false,
        timerStart: 0,
        timerTime: 0
    };


    componentDidMount() {
        this.setState({
            timerOn: true,
            timerTime: this.EndTime1,
            timerStart: this.EndTime1
        });

        this.timer = setInterval(() => {
            this.setState({
                timerOn: true,
                timerTime: this.EndTime1,
            });
        }, 10);
    }

    stopTimer = () => {
        clearInterval(this.timer);
        this.setState({ timerOn: false });
    };

    componentWillUnmount() {
        this.stopTimer();
        var endTime = this.state.timerTime;
        localStorage.setItem("endTime", endTime);

    };


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