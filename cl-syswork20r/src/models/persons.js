export const persons_model = (data) => {

    let rows = data;

    return {
        data: {
            columns: [
                {
                    label: '#',
                    field: 'idperson',
                    sort: 'asc',
                    width: 50
                },
                {
                    label: 'DNI',
                    field: 'dni',
                    sort: 'asc',
                    width: 150
                },
                {
                    label: 'Firstname',
                    field: 'first_name',
                    sort: 'asc',
                    width: 150
                },
                {
                    label: 'Lastname',
                    field: 'last_name',
                    sort: 'asc',
                    width: 150
                },

                {
                    label: 'Address',
                    field: 'address',
                    sort: 'asc',
                    width: 150
                },

                {
                    label: 'Phone',
                    field: 'phone',
                    sort: 'asc',
                    width: 150
                },
                {
                    label: 'Degree',
                    field: 'degree',
                    sort: 'asc',
                    width: 150
                },
                {
                    label: 'Type',
                    field: 'type',
                    sort: 'asc',
                    width: 150
                },
                {
                    label: 'State',
                    field: 'state',
                    sort: 'asc',
                    width: 150
                },

                {
                    label: 'Options',
                    field: 'options',
                    sort: 'asc',
                    width: 150
                },
               
            ],
            rows,
        }
    }
}