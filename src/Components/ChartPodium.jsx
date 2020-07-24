import React, { useState, useContext, useEffect } from 'react';
import { Bubble } from 'react-chartjs-2';
//Context Api
import { UserDetailsContext } from '../Contexts/UserDetailsContext';
//styleSheet
import '../StyleSheet/HomeStyle.css';



const ChartPodium = (props) => {

    console.log("props:", props);
    const place = props.Place;

    const [chardata, setChardata] = useState();

    useEffect(() => {

        setChardata({
            labels: ['January', 'February', 'March',
                'April', 'May'],
            datasets: [
                {
                    label: 'ניקוד',
                    backgroundColor: 'rgba(75,192,192,1)',
                    borderColor: 'rgba(0,0,0,1)',
                    borderWidth: 2,
                    data: [1,2,3]
                }
            ]
        })
    }, []);


    return (
        <div className="chart"><br /><h5> מיקומך הינו {place} </h5>
            <br />
            <h6>מי צמוד אליך:</h6>
            <Bubble
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


export default ChartPodium;

