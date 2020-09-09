export const positions_model = (data) => {

    let rows = data;

    return {
        data: {
            columns: [
                {
                    label: '#',
                    field: 'idposition',
                    sort: 'asc',
                    width: 50
                },
                {
                    label: 'Position',
                    field: 'position',
                    sort: 'asc',
                    width: 150
                },
                {
                    label: 'Status',
                    field: 'state',
                    sort: 'asc',
                    width: 150
                },
            ],
            rows,
        }
    }
}