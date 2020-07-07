import React, { useState } from 'react';
import { Bar, Pie } from 'react-chartjs-2';
// import { Component } from 'react';

const Chart = (props) => {

	const [chardata, setchardata] = useState({
		labels: ["מספר הרמזים שנקלחו", "מספר התשבצים ששיתפת", "מספר התשבצים ששיתפו איתך"],
		datasets: [{ label: 'pop', data: ['1', '2', '1'], backgroundColor: ['black', 'pink', 'blue'] }]}
	);
	console.log(props);
	

	return (
		<div className="chart"> chart
			<Pie
				data={chardata}
				width={200}
				height={100}
				options={{ maintainAspectRatio: false }}
			/>
		</div>
	)




}

// class Chart extends Component {
// 	constructor(props) {
// 		super(props);
// 		this.state = {
// 			chardata: {
// 				labels: ["מספר הרמזים שנקלחו", "מספר התשבצים ששיתפת", "מספר התשבצים ששיתפו איתך"],
// 				datasets: [{ label: 'pop', data: ['1', '2', '1'], backgroundColor: ['black', 'pink', 'blue'] }]
// 			}
// 		}
// 	}
// 	render() {
// 		return (
// 			<div className="chart"> chart
// 				<Pie
// 					data={this.state.chardata}
// 					width={200}
// 					height={100}
// 					options={{ maintainAspectRatio: false }}
// 				/>
// 			</div>
// 		)
// 	}


// }
export default Chart;

