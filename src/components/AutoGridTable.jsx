import GridTable from '@nadavshaar/react-grid-table';
import React, { useEffect, useState } from 'react';
import PlayerService from '../services/PlayerService';
import Moment from 'moment';

export default function AutoGridTable() {


    const dob = ({ value }) => {
        return (
            <>{Moment(value).format('DD-MM-yyyy')}</>
        )
    }


    const columns = [
        {
            id: 1,
            field: 'rankOfPlayer',
            label: 'Rank',

        },
        {
            id: 2,
            field: 'name',
            label: 'Username',
        },
        {
            id: 3,
            field: 'dateOfBirth',
            label: 'Date of Birth',
            cellRenderer: dob,

        },
        {
            id: 4,
            field: 'points',
            label: 'Points',
        }
    ];

    const [players, getPlayers] = useState([]);

    useEffect(() => {
        getAllPlayers();
    }, []);

    const getAllPlayers = () => {
        PlayerService.getAllPlayers()
            .then((res) => {
                const allPlayers = res.data;
                getPlayers(allPlayers);
            })
    }
    console.log(players);

    return (
        <GridTable
            columns={columns}
            rows={players}
        />
    )
}
