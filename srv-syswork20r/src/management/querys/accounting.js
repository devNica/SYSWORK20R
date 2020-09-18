const queryAccountingModel = {
    
    getListCurrencies: (data)=>{
        return `SELECT 

        CRR.idcurrency,
        CRR.currency,
        CRR.symbol,
        CRR.is_enabled,
        IF(CRR.is_enabled = 1, 'ENABLED', 'DISABLED') AS state,
        CRR.description
        
        FROM currency as CRR 
        
        WHERE ${data.filter}`
    }
    
}


module.exports = queryAccountingModel;