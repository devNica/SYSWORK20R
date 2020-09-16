
const queryAdministrationModel = {

    degrees:{
        list_degrees: `SELECT * FROM degree`
    },

    employee:{
        /**stored function*/
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
    },

    person:{

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
    },

    position:{
        jobs_list: (data)=>{
            return `SELECT 
            PST.idposition,
            PST.position,
            PST.is_active,
            if(PST.is_active = 1, 'ACTIVE', 'INACTIVE')AS state
            
            FROM position as PST  
            WHERE ${data.filter}`
        }
    },

    location:{
        locations_list: (data)=>{
            return `SELECT 

            LC.idlocation,
            LCT.location as depends_on,
            LC.location AS location,
            LCT.is_active,
            IF(LCT.is_active = 1, 'ACTIVE', 'INACTIVE') AS state
            
            FROM location AS LCT
            INNER JOIN location AS LC ON LC.depends_on = LCT.idlocation
            
            WHERE ${data.filter}`
            
        }
    }
}


module.exports = queryAdministrationModel;