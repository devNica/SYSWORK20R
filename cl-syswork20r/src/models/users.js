export const users_model = (data) => {

    let rows = data;

    return {
        data: {
            columns: [
                {
                    label: '#',
                    field: 'iduser',
                    sort: 'asc',
                    width: 50
                },
                {
                    label: 'Nick',
                    field: 'username',
                    sort: 'asc',
                    width: 150
                },
                {
                    label: 'Password',
                    field: 'password',
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