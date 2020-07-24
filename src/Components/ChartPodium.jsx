import React, { useState, useContext, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
//Context Api
import { UserDetailsContext } from '../Contexts/UserDetailsContext';
//styleSheet
import '../StyleSheet/HomeStyle.css';



const ChartPodium = (props) => {

    const place = props.Place;
    console.log(props);
    const [pod3, setPod3] = useState(props.Podium3);
    // const user1 = pod3[0].Mail;
    // const score1 = props.Podium3[0].Score;
    // const user2 = props.Podium3[1].Mail;
    // const score2 = props.Podium3[1].Score;
    // const user3 = props.Podium3[2].Mail;
    // const score3 = props.Podium3[2].Score;

    const [chardata, setChardata] = useState();

    useEffect(() => {

        setChardata({
            labels: [pod3[0].Mail, pod3[1].Mail, pod3[2].Mail],//user1, user2, user3
            datasets: [
                {
                    label: 'ניקוד',
                    backgroundColor: 'rgba(75,192,192,1)',
                    borderColor: 'rgba(0,0,0,1)',
                    borderWidth: 2,
                    data: [pod3[0].Score, pod3[1].Score, pod3[2].Score]//score1, score2, score3
                }
            ]
        })
    }, []); 


    return (
        <div className="chart"><br /><h5> מיקומך הינו {place} מכלל המשתתפים </h5>
            <br />
            <h6>מי צמוד אליך:</h6>
            <Bar
                data={chardata}
                maxwidth={50}
                maxheight={50}
                options={{ maintainAspectRatio: false }}
            />
        </div>
    )




}


export default ChartPodium;

