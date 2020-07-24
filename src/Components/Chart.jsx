import React, { useState, useContext, useEffect } from 'react';
import { Doughnut } from 'react-chartjs-2';
//Context Api
import { UserDetailsContext } from '../Contexts/UserDetailsContext';
//styleSheet
import '../StyleSheet/HomeStyle.css';



const Chart = (props) => {
	
	//console.log("props:", props);
	const hints = props.Hints;
	//console.log("propsHints:", hints);
	const SharedW = props.SharedWith;
	//console.log("propsSW:", SharedW);
	const SharedF = props.SharedFrom;
	//console.log("propsSF:", SharedF);
	const createCross = props.CreateCross;
	//console.log("propscreateCross:", createCross);
	const [chardata, setChardata] = useState();

	useEffect(() => {
		// if (hints !== 'undefined' && SharedW !== 'undefined' && SharedF !== 'undefined' && createCross !== 'undefined') {
		// 	setgraph(false);
		// }
		// else{
		// 	setgraph(true);
		// }
		setChardata({
			labels: ["מספר הרמזים שנקלחו", "מספר התשבצים ששיתפת", "מספר התשבצים ששיתפו איתך", "מספר התשבצים שיצרת"],
			datasets: [{ label: 'pop', data: [hints, SharedW, SharedF, createCross], backgroundColor: ['black', 'pink', 'blue', 'purple'] }]
		})
	}, [hints, SharedW, SharedF, createCross]);


	return (
		<div className="chart"><br /><h5> פעילותך בתשבצומטרי: </h5>
			<br />
			<Doughnut
				data={chardata}
				maxwidth={50}
				maxheight={50}
				width='50%'
				height='50%'
				options={{ maintainAspectRatio: false }}
			/>
		</div>
	)




}


export default Chart;

