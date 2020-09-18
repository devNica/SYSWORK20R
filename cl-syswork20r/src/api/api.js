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
    },

    administration:{
        listDegrees: () =>
            axios.get('/api/administration/list_degrees').then(res => res.data),
        view_persons_records: data =>
            axios.post('/api/administration/view_persons_records',{data}).then(res => res.data),
        create_person: data =>
            axios.post('/api/administration/create_person_record', {data}).then(res=> res.data),
        get_person: data=>
            axios.post('/api/administration/get_person',{data}).then(res => res.data),
        edit_person_record: data=>
            axios.post('/api/administration/edit_person_record',{data}).then(res => res.data),
        get_job_list: data =>
            axios.post('/api/administration/jobs_list', {data}).then(res => res.data),
        get_locations_list: data =>
            axios.post('/api/administration/locations_list', {data}).then(res => res.data),
        get_employee_numer: data =>
            axios.get('/api/administration/get_employee_number').then(res => res.data),
        create_employee: data =>
            axios.post('/api/administration/create_employee_record', data).then(res => res.data),
        view_employees_records: data =>
            axios.post('/api/administration/view_employees_records', {data}).then(res => res.data),
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
    return axios.post('/api/user/upload_image',
        data, { headers: { 'content-type': 'multipart/form-data' } }).then(res => res.data)
}

export const downloadImage = data => {
    return axios.post('/api/user/download_image', data).then(res => res.data)
}