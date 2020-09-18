
const queryAdministrationModel = {

    degrees:{
        list_degrees: `SELECT * FROM degree`
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