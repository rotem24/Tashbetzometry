import React, { useState, useEffect, useContext } from 'react';
import { Bar } from "react-chartjs-2";
import { MDBContainer } from "mdbreact";
//Context Api
import { UserDetailsContext } from '../Contexts/UserDetailsContext';

const BarChart = () => {

    //ContextApi
    const { UserDetails } = useContext(UserDetailsContext);
    const user = UserDetails;

    var userListScore = [];
    var userList = [];

    const [pod3, setPod3] = useState('');
    const [place, setplace] = useState();

    useEffect(() => {
        getScoresPodium();
    }, []);


    let local = false;
    let apiUrl = 'http://proj.ruppin.ac.il/bgroup11/prod/api/';
    if (local) {
        apiUrl = 'http://localhost:50664/api/';
    }


    const getScoresPodium = async () => {
        try {
            const res = await fetch(apiUrl + 'User/Users', {
                method: 'GET',
                headers: new Headers({
                    'Content-Type': 'application/json; charset=UTF-8',
                })
            })
            let result = await res.json();

            for (let i = 0; i < result.length; i++) {
                userList.push(result[i])
            }
            userList.sort((a, b) => (a.Score < b.Score) ? 1 : -1)
            var s = {
                FirstName: ' ',
                Score: 0
            }
            for (let i = 0; i < userList.length; i++) { 
                if (userList[i].Mail === user.Mail) {
                    setplace(i + 1);
                    if (userList[i - 2] === undefined) {
                        userListScore.push(s);
                    }
                    else {
                        userListScore.push(userList[i - 2]);
                    }
                    if (userList[i - 1] === undefined) {
                        userListScore.push(s);
                    }
                    else {
                        userListScore.push(userList[i - 1]);
                    }
                    if (userList[i] === undefined) {
                        userListScore.push(s);
                    }
                    else {
                        userListScore.push(userList[i]);
                    }
                    if (userList[i + 1] === undefined) {
                        userListScore.push(s);
                    }
                    else {
                        userListScore.push(userList[i + 1]);
                    }
                    if (userList[i + 2] === undefined) {
                        userListScore.push(s);
                    }
                    else {
                        userListScore.push(userList[i + 2]);
                    }

                }
            }

            setPod3({
                dataBar: {
                    labels: [userListScore[0].FirstName, userListScore[1].FirstName, userListScore[2].FirstName, userListScore[3].FirstName, userListScore[4].FirstName],//userList[0].FirstName, userList[1].FirstName, userList[2].FirstName
                    datasets: [
                        {
                            label: "אני",
                            data: [userListScore[0].Score, userListScore[1].Score, userListScore[2].Score, userListScore[3].Score, userListScore[4].Score],//userList[0].FirstName, userList[1].Score, userList[2].Score
                            backgroundColor: [
                                "rgba(255, 218, 128,0.4)",
                                "rgba(98,  182, 239,0.4)",
                                "rgba(255, 218, 128,0.4)",
                                "rgba(113, 205, 205,0.4)",
                                "rgba(170, 128, 252,0.4)",
                                "rgba(255, 177, 101,0.4)"
                            ],
                            borderWidth: 3,
                            borderColor: [
                                "rgba(255, 218, 128, 1)",
                                "rgba(98,  182, 239, 1)",
                                "rgba(255, 218, 128, 1)",
                                "rgba(113, 205, 205, 1)",
                                "rgba(170, 128, 252, 1)",
                                "rgba(255, 177, 101, 1)"
                            ]
                        }
                    ]
                },
                barChartOptions: {
                    responsive: true,
                    maintainAspectRatio: false,
                    scales: {
                        xAxes: [
                            {
                                barPercentage: 1,
                                gridLines: {
                                    display: true,
                                    color: "rgba(0, 0, 0, 0.1)"
                                }
                            }
                        ],
                        yAxes: [
                            {
                                gridLines: {
                                    display: true,
                                    color: "rgba(0, 0, 0, 0.1)"
                                },
                                ticks: {
                                    beginAtZero: true
                                }
                            }
                        ]
                    }
                }
            })

        }
        catch (error) {
            console.log('ErrorGetUsersScore', error);
        }


    }




    return (
        <div>  
            <h5> מיקומך הינו {place} מכלל המשתתפים </h5>
            <h6>מי צמוד אליך:</h6>
            <MDBContainer>
                {pod3 && <Bar
                    data={pod3.dataBar}
                    options={pod3.barChartOptions}
                    height={200}
                    width={10}
                />}
            </MDBContainer>
        </div>
    );
}


export default BarChart;
