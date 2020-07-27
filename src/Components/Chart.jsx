import React, { useState, useEffect } from 'react';
import { Doughnut } from 'react-chartjs-2';
//styleSheet
import '../StyleSheet/HomeStyle.css';



const Chart = (props) => {

	const hints = props.Hints;
	const SharedW = props.SharedWith;
	const SharedF = props.SharedFrom;
	const createCross = props.CreateCross;
	const [chardata, setChardata] = useState();
	var hintscolor = localStorage.getItem('color');

	useEffect(() => {

		setChardata({
			labels: ["רמזים שלקחת", "תשבצים ששיתפת", "תשבצים ששותפו עמך", "תשבצים שיצרת"],
			datasets: [{ label: 'pop', data: [hints, SharedW, SharedF, createCross], backgroundColor: [hintscolor, '#bfd8d5', '#dfdfdf', '#f4f3f3'] }]
		})
	}, [hints, SharedW, SharedF, createCross]);


	return (
		<div className="chart"><br /><h5> פעילותך בתשבצומטרי: </h5>
			<Doughnut
				data={chardata}
				maxwidth={'40%'}
				maxheight={'40%'}
				height= {30}
				width={40}
				options={{ maintainAspectRatio: false }}
			/>
		</div>
	)




}


export default Chart;

