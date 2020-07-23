import React, { useState, useContext, useEffect } from 'react';
import { Doughnut } from 'react-chartjs-2';
//Context Api
import { UserDetailsContext } from '../Contexts/UserDetailsContext';
//styleSheet
import '../StyleSheet/HomeStyle.css';


const Chart = (props) => {
	//ContextApi
	const { UserDetails } = useContext(UserDetailsContext);
	const user = UserDetails;
	//בדיקה
	console.log("props:", props);
	const hints = props.Hints;
	console.log("propsHints:", hints);
	const SharedW = props.SharedWith;
	console.log("propsSW:", SharedW);
	const SharedF = props.SharedFrom;
	console.log("propsSF:", SharedF);
	const createCross = props.CreateCross;
	console.log("propscreateCross:", createCross);
	const [graph, setgraph] = useState(props.graph);
	console.log("propsgraph:", graph);
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
	}, [hints,SharedW,SharedF,createCross]);


	return (
		<div className="chart"><h5> {user.FirstName}, לצפייה בפעילותך: </h5>
			<br />
			{console.log("hints:", hints)}
			<Doughnut
				data={chardata}
				maxwidth={200}
				maxheight={100}
				options={{ maintainAspectRatio: false }}
			/>
		</div>
	)




}


export default Chart;

