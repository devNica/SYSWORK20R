
const queryAdministrationModel = {

    degrees:{
        list_degrees: `SELECT * FROM degree`
    },

    person:{

        view_persons_records: ` SELECT 
            P.idperson,
            P.dni,
            P.first_name,
            P.last_name,
            P.address,
            P.phone,
            D.degree,
            IF(P.is_customer = 1, 'CUSTOMER', 'STAFF') AS type,
            IF(P.is_active = 1, "ACTIVE", "INACTIVE") AS state,
            P.is_active,
            P.is_customer,
            P.is_staff
    
    
            FROM person as P
            INNER JOIN degree as D ON D.iddegree = P.fk_degree
            WHERE 1
            `
        ,

        get_person: (idperson)=>{
            return ` SELECT 
            P.idperson,
            P.dni,
            P.first_name,
            P.last_name,
            P.address,
            P.phone,
            D.degree,
            IF(P.is_customer = 1, 'CUSTOMER', 'STAFF') AS type,
            IF(P.is_active = 1, "ACTIVE", "INACTIVE") AS state,
            P.is_active,
            P.is_customer,
            P.is_staff
    
    
            FROM person as P
            INNER JOIN degree as D ON D.iddegree = P.fk_degree
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
                '${data.customer}', 
                '${data.staff}')`
        },

        edit_person_record: ()=>{
            return ``
        }
    }
}


module.exports = queryAdministrationModel;