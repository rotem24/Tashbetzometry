import React, { useState, useContext } from 'react';
import {  Doughnut } from 'react-chartjs-2';
//Context Api
import { UserDetailsContext } from '../Contexts/UserDetailsContext';
//styleSheet
import '../StyleSheet/HomeStyle.css';


const Chart = (props) => {
	//ContextApi
	const { UserDetails } = useContext(UserDetailsContext);
	const user = UserDetails;
	console.log("props:", props);
	const chardata = useState({
		labels: ["מספר הרמזים שנקלחו", "מספר התשבצים ששיתפת", "מספר התשבצים ששיתפו איתך"],
		datasets: [{ label: 'pop', data: ['1', '2', '1'], backgroundColor: ['black', 'pink', 'blue'] }]
	});

	return (
		<div className="chart">  {user.FirstName}, לצפייה בפעילותך:
		<br/>	<br/>	
			<Doughnut
				data={chardata}
				width={200}
				height={100}
				options={{ maintainAspectRatio: false }}
			/>
		</div>
	)




}


export default Chart;

