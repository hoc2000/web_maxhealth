import db from '../models/index';
import CRUDService from "../services/CRUDService"


//lien ket db voi controller
let getHomePage = async (req,res) =>{
    try {
        let data = await db.User.findAll()
        return res.render('homepage.ejs',{
            data:JSON.stringify(data) //truyen key data value data
        });
    
    }
    catch(e){
        console.log(e)
    }

}
let getAboutPage = (req,res) =>{
    return res.render('test/about.ejs');
}
 let getCRUD = (req, res) =>{
     return res.render('crud.ejs')
 }
// object:{
//     key:'',
//     value:''
// }

let postCRUD = async (req, res) =>{
    let message = await CRUDService.createNewUser(req.body);
    console.log(message);
    return res.send('post crud form server');
}

let displayGetCRUD = async(req,res)=>{
    let data = await CRUDService.getAllUser();
    console.log('----------------------------------------------------')
    console.log(data)
    console.log('----------------------------------------------------')
    return res.render('displayCRUD.ejs', {
        dataTable :data
    })
}

let getEditCRUD =async (req,res)=>{
     let userId = req.query.id

    if (userId) {
        let userData = await CRUDService.getUserById(userId)

        return res.render('Edit-CRUD.ejs', {
            userData: userData
        })

    } else {
        return res.send('User not found')
    }

}

let putCRUD = async (req, res) => {
    let data = req.body;
    let allusers = await CRUDService.updateUserData(data)
    return res.render('displayCRUD.ejs', {
        dataTable: allusers
    })
}

let deleteCRUD = async (req, res) => {
    let id = req.query.id
    if (id) {
        await CRUDService.deleteUserById(id)
        return res.send('Delete Successfully')
    }else{
        return res.send('Delete Fail !')
    }

}


module.exports = {
    getHomePage : getHomePage,
    getAboutPage : getAboutPage,
    getCRUD: getCRUD,
    postCRUD :postCRUD,
    displayGetCRUD: displayGetCRUD,
    getEditCRUD:getEditCRUD,
    putCRUD:putCRUD,
    deleteCRUD :deleteCRUD,
    
}