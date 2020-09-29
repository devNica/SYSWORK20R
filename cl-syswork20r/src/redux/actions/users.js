import api from '../../api/api'
import {GET_LIST_USER_ACCOUNTS} from '../actions/types'
import {models} from '../../models/index'


export const fn_list_user_accounts = data => dispatch =>{
    api.user.findAll(data)
    .then(response=>{
        
        let info = models.users(response.users)
        
        dispatch({
            type: GET_LIST_USER_ACCOUNTS,
            payload: {
                accounts: info
            }
        })
    })
    .catch(error => console.log(error))
}