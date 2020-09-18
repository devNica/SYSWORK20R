export const employees_model = (data) => {

    let rows = data;

    return {
        data: {
            columns: [
                {
                    label: '#',
                    field: 'idemployee',
                    sort: 'asc',
                    width: 50
                },
                {
                    label: 'DNI',
                    field: 'emp_number',
                    sort: 'asc',
                    width: 150
                },
                {
                    label: 'Person',
                    field: 'person',
                    sort: 'asc',
                    width: 150
                },
                {
                    label: 'Salary',
                    field: 'salary',
                    sort: 'asc',
                    width: 150
                },

                {
                    label: 'Position',
                    field: 'position',
                    sort: 'asc',
                    width: 150
                },

                {
                    label: 'Location',
                    field: 'location',
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
                    label: 'Access',
                    field: 'access',
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