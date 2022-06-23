import React from "react";
export default function table(playersData){

    function viewDate(data) {
        const rawDate = new Date(data);
        const date = rawDate.toLocaleDateString();
        return date;
    }

    return(
        <>
        <div className="row">
        <table className="table table-striped table-bordered">
            <thead>
                <tr>
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