import React, { Component } from 'react';
import PlayerService from '../services/PlayerService';
import Moment from 'moment';


export default class CustomPage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            playersData: [],
            currentpage: 0
        }
    }

    componentDidMount() {
        PlayerService.getPagedPlayers().then((res) => {
            this.setState({ playersData: res.data });
        });
    }


    render() {

        return (
            <div >
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
                                this.state.playersData.map(
                                    playerData =>
                                        <tr key={playerData.id}>
                                            <td>    {playerData.rankOfPlayer}                              </td>
                                            <td>    {playerData.name}               </td>
                                            <td style={{ width: '200px' }}>    {Moment(playerData.dateOfBirth).format('DD-MM-yyyy')}                    </td>
                                            <td>    {playerData.points}              </td>


                                        </tr>
                                )
                            }
                        </tbody>
                    </table>
                </div>

            </div>
        )
    }
}

