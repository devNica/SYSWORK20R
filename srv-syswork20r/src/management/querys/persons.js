const queryPersonModel = {

    view_persons_records: (data)=>{
        let query = ` SELECT 
        P.idperson,
        P.dni,
        P.first_name,
        P.last_name,
        P.address,
        P.phone,
        D.degree,
        IF(P.is_customer = 1, 'CUSTOMER', 'STAFF') AS type,
        IF(P.is_customer = 1 AND P.is_staff = 1, 'CUSTOMER / STAFF', IF(P.is_customer = 1 AND P.is_staff = 0, 'CUSTOMER', IF(P.is_customer =0 AND P.is_staff = 1, 'STAFF','NOT DEFFINED'))) AS type,
        IF(P.is_active = 1, "ACTIVE", "INACTIVE") AS state,
        P.is_active,
        P.is_customer,
        P.is_staff

        FROM person as P
        INNER JOIN degree as D ON D.iddegree = P.fk_degree
        LEFT  JOIN employee AS EMP ON EMP.fk_person = P.idperson
        WHERE ${data.filter}
        `
        return query
    },

    get_person: (idperson)=>{
        return ` SELECT 
        P.idperson,
        P.dni,
        P.first_name,
        P.last_name,
        P.address,
        P.phone,
        D.degree,
        D.iddegree,
        IF(P.is_customer = 1, 'CUSTOMER', 'STAFF') AS type,
        IF(P.is_active = 1, "ACTIVE", "INACTIVE") AS state,
        P.is_active,
        P.is_customer,
        P.is_staff,
        EMP.is_active as emp_is_active


        FROM person as P
        INNER JOIN degree as D ON D.iddegree = P.fk_degree
        LEFT JOIN employee as EMP ON EMP.fk_person = P.idperson
        WHERE P.idperson = ${idperson}
        `

    },


    create_person_record: (data)=>{
        return `INSERT INTO person (
            idperson, 
            dni, 
            first_name, 
            last_name, 
            address, 
            phone, 
            fk_degree, 
            is_customer, 
            is_staff) 
            VALUES (
            NULL, 
            '${data.dni}', 
            '${data.firstname}', 
            '${data.lastname}', 
            '${data.address}', 
            '${data.phone}', 
            ${data.degree}, 
            ${data.customer}, 
            ${data.staff})`
    },

    edit_person_record: (data)=>{
        let query= `UPDATE 
        person SET
        dni = '${data.dni}',
        first_name = '${data.firstname}', 
        last_name = '${data.lastname}',
        address = '${data.address}',
        phone = '${data.phone}',
        fk_degree = ${data.degree},
        is_customer = ${data.is_customer},
        is_staff = ${data.is_staff},
        is_active = ${data.active}
        WHERE person.idperson = ${data.idperson}`
        return query
    }
    
}


module.exports = queryPersonModel