export function StartTimer() {
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

export function StopTimer() {
    clearInterval(this.timer);
    this.setState({ timerOn: false });
}

export function EndCompetition() {
    this.stopTimer();
    var endTime = this.state.timerTime;
    localStorage.setItem("endTime", endTime);
}

export function Render() {
    const { timerTime } = this.state;
    let seconds = ("0" + (Math.floor(timerTime / 1000) % 60)).slice(-2);
    let minutes = ("0" + (Math.floor(timerTime / 60000) % 60)).slice(-2);

    return <div className="Stopwatch">
        <div className="Stopwatch-display">
            {minutes}:{seconds}
        </div>

    </div>
}

