export const locations_model = (data) => {

    let rows = data;

    return {
        data: {
            columns: [
                {
                    label: '#',
                    field: 'idlocation',
                    sort: 'asc',
                    width: 50
                },
                {
                    label: 'Location',
                    field: 'location',
                    sort: 'asc',
                    width: 150
                },
                {
                    label: 'Depends On',
                    field: 'depends_on',
                    sort: 'asc',
                    width: 150
                },
                {
                    label: 'State',
                    field: 'state',
                    sort: 'asc',
                    width: 150
                },

              
            ],
            rows,
        }
    }
}