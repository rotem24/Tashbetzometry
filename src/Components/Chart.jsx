import React, { useState, useContext, useEffect } from 'react';
import { Doughnut } from 'react-chartjs-2';
//Context Api
import { UserDetailsContext } from '../Contexts/UserDetailsContext';
//styleSheet
import '../StyleSheet/HomeStyle.css';



const Chart = (props) => {

	const hints = props.Hints;
	const SharedW = props.SharedWith;
	const SharedF = props.SharedFrom;
	const createCross = props.CreateCross;
	const [chardata, setChardata] = useState();
	var hintscolor= localStorage.getItem('color');
	
	useEffect(() => {
	
		setChardata({
			labels: ["מספר הרמזים שנקלחו", "מספר התשבצים ששיתפת", "מספר התשבצים ששיתפו איתך", "מספר התשבצים שיצרת"],
			datasets: [{ label: 'pop', data: [hints, SharedW, SharedF, createCross], backgroundColor: [hintscolor, '#900C3F', '#161D74', '#16741E'] }]
		})
	}, [hints, SharedW, SharedF, createCross]);


	return (
		<div className="chart"><br /><h5> פעילותך בתשבצומטרי: </h5>
			<Doughnut
				data={chardata}
				maxwidth={50}
				maxheight={50}
				height={50}
				width={50}
				options={{ maintainAspectRatio: false }}
			/>
		</div>
	)




}


export default Chart;

