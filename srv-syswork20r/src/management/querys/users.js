const queryUserModel={

    user:{
        signin: (data)=>{
            return `SELECT 

            usr.iduser,
            usr.username,
            usr.password,
            usr.token,
            usr.is_active as usr_status,
            usr.fk_employee,
            prf.idprofile,
            prf.profile,
            prf.is_active as prf_status,
            GROUP_CONCAT(DISTINCT(mdl.module))as modules,
            GROUP_CONCAT(pms.permission) as permissions
            
            FROM user as usr
            INNER JOIN user_has_profile as uhp ON usr.iduser = uhp.fk_user
            INNER JOIN profile as prf ON uhp.fk_profile = prf.idprofile
            INNER JOIN profile_has_permission as php ON prf.idprofile = php.fk_profile
            INNER JOIN permission as pms ON php.fk_permission = pms.idpermission
            INNER JOIN user_has_module as uhm ON usr.iduser = uhm.fk_user
            INNER JOIN module as mdl ON uhm.fk_module = mdl.idmodule
            
            
            WHERE usr.username = '${data.username}'`
        },

        get_users: (data)=>{
            return `SELECT 
            
            usr.iduser,
            usr.username,
            usr.password,
            usr.token,
            usr.is_active,
            IF(usr.is_active = 1, 'ACTIVE', 'INACTIVE') AS state
            FROM user as usr
            WHERE ${data}`
            
        },

        createUser: (data)=>{
            return `INSERT INTO user (iduser, username, password, token, is_active, fk_employee, created_at, updated_at) VALUES 
            (NULL, '${data.name}', '${data.password}', '${data.token}', '1', '${data.fk_employee}', '${data.created_at}', '${data.updated_at}')`
        }
    },

    permission:{

    },

    profile:{
        
        getProfiles: 'SELECT * FROM profile',
        
        createProfile: (data)=>{
            return `INSERT INTO profile (idprofile, profile, created_at, updated_at, is_active) VALUES 
            (NULL, '${data.profile}', '${data.created}', '${data.updated}', '1')`
        }
    }
    

}

module.exports = queryUserModel;