import axios from 'axios';

export default {
    user: {
        signin: credentials =>
            axios.post('/api/user/signin', { credentials }).then(res => res.data),
        signup: data =>
            axios.post('/api/user/signup', { data }).then(res => res.data),
        confirm: token =>
            axios.post('/api/user/confirmation', { token }).then(res => res.data),
        verifyPermission: data =>
            axios.post('/api/user/verify_permission', {data}).then(res => res.data),
        findAll: data =>
            axios.post('/api/user/view/users', data).then(res => res.data),
    },

    administration:{
        listDegrees: () =>
            axios.get('/api/administration/view/degrees').then(res => res.data),
        view_persons_records: data =>
            axios.post('/api/administration/view/persons',{data}).then(res => res.data),
        create_person: data =>
            axios.post('/api/administration/create/person', {data}).then(res=> res.data),
        get_person: data=>
            axios.post('/api/administration/search/person',{data}).then(res => res.data),
        edit_person_record: data=>
            axios.post('/api/administration/update/person',{data}).then(res => res.data),
        get_job_list: data =>
            axios.post('/api/administration/view/positions', {data}).then(res => res.data),
        get_locations_list: data =>
            axios.post('/api/administration/view/locations', {data}).then(res => res.data),
        get_employee_numer: data =>
            axios.get('/api/administration/fetch/employee-number').then(res => res.data),
        
        
    },

    userAccounts:{
        requestAccountData: data =>
            axios.post('/api/useraccounts/fetch/account-info',{data}).then(res => res.data),
    },

    employee:{
        create: data =>
            axios.post('/api/administration/create/employee', data).then(res => res.data),
        findAll: data =>
            axios.post('/api/administration/view/employees', {data}).then(res => res.data),
        findOne: data =>
            axios.post('/api/administration/search/employee',{data}).then(res => res.data),
        update: data =>
        axios.post('/api/administration/update/employee',data).then(res => res.data),
    },

    accounting:{
        get_list_currencies: data =>
            axios.post('/api/accounting/list_currencies', {data}).then( res => res.data),
    },
   
    notificacion: {
        revisar: data =>
            axios.post('/api/tools/review-changes-user-notifications', data).then(res => res.data),

        actualizar: data =>
            axios.post('/api/tools/update-user-notification-status', data).then(res => res.data),
    }
}


export const uploadImage = data => {
    return axios.post('/api/user/upload/image',
        data, { headers: { 'content-type': 'multipart/form-data' } }).then(res => res.data)
}

export const downloadImage = data => {
    return axios.post('/api/user/download/image', data).then(res => res.data)
}