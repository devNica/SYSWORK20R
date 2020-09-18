const queryEmployeeModel = {
   
    sf_suggest_employee_number: `SELECT FN_SUGGEST_EMPLOYEE_NUMBER() AS emp_number`,

    upload_image: (data)=>{
        let query=`UPDATE 
        employee SET photo = '${data.photo}' 
        WHERE  employee.idemployee = ${data.idemployee}`
        return query
    },

    download_image: (data)=>{
        let query = `SELECT employee.photo FROM employee WHERE employee.idemployee = ${data.filter}`
        return query
    },

    list_employees_records: (data)=>{
        let query = `SELECT 
        EMP.idemployee, 
        EMP.emp_number, 
        CONCAT(EMP.salary, ' ', CRR.currency) AS salary,
        EMP.fk_currency,
        CONCAT(P.first_name, ' ', P.last_name) AS person,
        P.idperson,
        PST.position,
        PST.idposition,
        LCT.location,
        LCT.idlocation,
        IF(EMP.is_active = 1, 'ACTIVE', 'INACTIVE') AS state,
        EMP.is_active,
        IF(EMP.is_user = 1, 'N-ACC', 'W-ACC') as access,
        EMP.is_user
        
        
        FROM employee as EMP 
        INNER JOIN currency AS CRR ON CRR.idcurrency = EMP.fk_currency
        LEFT JOIN person AS P ON P.idperson = EMP.fk_person
        INNER JOIN position AS PST ON PST.idposition = EMP.fk_position
        INNER JOIN location AS LCT ON LCT.idlocation = EMP.fk_location
        WHERE ${data.filter} ORDER BY EMP.idemployee ASC `

        return query;
    },

    create_employee_record: (data)=>{
        let query = `INSERT INTO employee (
            idemployee, 
            emp_number, 
            salary, 
            fk_currency, 
            fk_person, 
            fk_position, 
            fk_location, 
            is_active, 
            is_user,
            created_at,
            updated_at,
            photo) 
            VALUES (
            NULL, 
            '${data.emp_number}', 
            ${data.salary}, 
            ${data.currency}, 
            ${data.fk_person}, 
            ${data.fk_position}, 
            ${data.fk_location}, 
            '1', 
            '0',
            '${data.created_at}',
            '${data.updated_at}',
            NULL)`
        return query
    },
    
} 


module.exports = queryEmployeeModel;