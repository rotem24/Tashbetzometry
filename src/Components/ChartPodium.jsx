import React, { useState, useEffect } from 'react';
import { Bar, Bubble, Radar, Line } from 'react-chartjs-2';
//styleSheet
import '../StyleSheet/HomeStyle.css';



const ChartPodium = (props) => {

    const place = props.Place;

    const [pod3, setPod3] = useState(props.Podium3);
    const [chardata, setChardata] = useState();

    var user1 = pod3[0].UserName;
    var score1 = pod3[0].Score;
    var user2 = pod3[1].UserName;
    var score2 = pod3[1].Score;
    var user3 = pod3[2].UserName;
    var score3 = pod3[2].Score;


    useEffect(() => {
        setChardata({
            data: [user1, user2, user3],
            labels: [user1, user2, user3],//user1, user2, user3
            datasets: [
                {
                    label: 'ניקוד',
                    backgroundColor: '#989898',
                    borderColor: 'rgba(0,0,0,1)',
                    borderWidth: 1,
                    data: [score1, score2, score3]//score1, score2, score3
                }
            ]
        })
    }, []);


    return (
        <div className="chart"><br /><h5> מיקומך הינו {place} מכלל המשתתפים </h5>
            {console.log('props', props)}
            {console.log('pod3', pod3)}
            <br />
            <h6>מי צמוד אליך:</h6>
            <Line
                data={chardata}
                maxwidth={50}
                maxheight={50}
                width='30%'
                height='8%'
                options={{ maintainAspectRatio: false }}
            />
        </div>

    )
}
export default ChartPodium;

