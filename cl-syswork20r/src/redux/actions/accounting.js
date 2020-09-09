import {GET_LIST_CURRENCIES} from './types';
import api from '../../api/api'

export const fn_get_list_currencies = data => dispatch => {
    api.accounting.get_list_currencies(data)
    .then(response =>{
        dispatch({
            type: GET_LIST_CURRENCIES,
            payload:{
                currencies: response.currencies
            }
        })
    })
    .catch(error => console.log(error))
}
