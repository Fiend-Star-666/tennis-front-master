import React from "react";
export default function CustomTable(playersData) {

    function viewDate(data) {
        const rawDate = new Date(data);
        const date = rawDate.toLocaleDateString();
        return date;
    }

    function columns() {
        return [
            {
                Header: 'Rank',
                accessor: 'rankOfPlayer',
                Cell: props => <span className='number'>{props.value}</span>
            },
            {
                Header: 'Name',
                accessor: 'name',
                Cell: props => <span className='number'>{props.value}</span>
            },
            {
                Header: 'Date of Birth',
                accessor: 'dateOfBirth',
                Cell: props => <span className='number'>{viewDate(props.value)}</span>
            },
            {
                Header: 'Points',
                accessor: 'points',
                Cell: props => <span className='number'>{props.value}</span>
            }
        ]
    }

    function columnData(data) {
        let columnHeader;
        for (let index = 0; index < 1; index++) {

            (Object.keys(playersData[0])).forEach(element => {
                return console.log(element);
            })


        }
    }

    return (
        <>
            <div className="row">
                <table className="table table-striped table-bordered">
                    <thead>
                        <tr>
                            {
                                /*
                                    (Object.keys(playersData)).forEach(element => {
                                        console.log(element);
                                    })
                                */
                            }
                            <th>Rank</th>
                            <th>Name</th>
                            <th>Date of Birth</th>
                            <th>Points</th>
                        </tr>
                    </thead>

                    <tbody>
                        {
                            playersData.map(
                                playerData =>
                                    <tr key={playerData.id}>
                                        <td>    {playerData.rankOfPlayer}                                </td>
                                        <td>    {playerData.name}                                        </td>
                                        <td style={{ width: '200px' }}>{viewDate(playerData.dateOfBirth)}</td>
                                        <td>    {playerData.points}                                      </td>
                                    </tr>
                            )
                        }
                    </tbody>
                </table>
            </div>
        </>
    )
}

/*

                            {
                                (Object.keys(playerData)).forEach(element => (
                                   <td>{playerData[element]}</td>
                                ))
                            }
*/