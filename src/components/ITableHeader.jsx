import React from "react"

export default function ITableHeader() {
    return (
        <>
            <thead>
                <tr>
                    {
                        columns.map(element =>
                            <th>{element}</th>
                        )
                    }
                </tr>
            </thead>
        </>
    )
}

const columns = ['Rank', 'Name', 'Date of Birth', 'Points']