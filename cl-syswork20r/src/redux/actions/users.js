import api from '../../api/api'
import {GET_LIST_USER_ACCOUNTS, CLEAR_ACCOUNTS_LIST, GET_USERACCOUNT_INFO} from '../actions/types'
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

export const fn_get_useraccount_info = data => dispatch =>{
    api.userAccounts.requestAccountData(data)
    .then(response => {
        dispatch({
            type: GET_USERACCOUNT_INFO,
            info: response.userAccountInfo
        })
    })
    .catch(error => console.log(error))
}

export const fn_clear_account_list = () => dispatch =>{
    dispatch({
        type: CLEAR_ACCOUNTS_LIST
    })
}