const queries = require('../utils/queries');

exports.restaurant_menuService = function restaurant_menuService(info, callback) {
  console.log("Inside Kafka Backend restaurant menu service === ", info);
  switch (info.type) {
    case "addSection":
        addSection(info.message, callback);
        break;
    case "getSections":
        getSections(info.message, callback);
        break;
    case "deleteSection":
        deleteSection(info.message, callback);
        break;
    case "updateSection":
        updateSection(info.message, callback);
        break;
    case "addMenu":
        addMenu(info.message, callback);
        break;
    case "getMenus":
        getMenus(info.message, callback);
        break;
    case "deleteMenu":
        deleteMenu(info.message, callback);
        break;
    case "updateMenu":
        updateMenu(info.message, callback);
        break;
    case "updateMenuImage":
        updateMenuImage(info.message, callback);
        break;
  }
};

function addSection(section, callback) {
    console.log("Inside Kafka Backend Add Section service");
  
    queries.addSection(section, result => {
        console.log("Section added with section id: " + result);
        callback(null, result);
    }, err=>{
        let errorDetails = {};
        if(err.code === "DUPLICATE_SECTION"){
            errorDetails.statusCode = 401;
            errorDetails.info = { success: false, message: err.message };
            callback(errorDetails, null);
        }else{
            errorDetails.statusCode = 500;
            errorDetails.info = { success: false, message: `Something failed when adding section in the table. ${err.message}` };
            callback(errorDetails, null);
        }
    });
}
  
function getSections(ownerId, callback) {
    console.log("Inside Kafka Backend Get Sections service");

    queries.getSectionsByOwnerId(ownerId, result => {
        callback(null, result);
    }, err => {
        let errorDetails = {};
        errorDetails.statusCode = 500;
        errorDetails.info = {success: false, message: `Something failed when getting sections from the table. ${err}`};
        callback(errorDetails, null);
    });
}

function deleteSection(section, callback) {
    console.log("Inside Kafka Backend Delete Section service");
    
    queries.deleteSection(section, result => {
        console.log("Section deleted successfully");
        callback(null, result);
    }, err => {
        let errorDetails = {};
        errorDetails.statusCode = 500;
        errorDetails.info = { success: false, mesage: `Something failed when deleting section from the table. ${err}` };
        callback(errorDetails, null);
    });
}

function updateSection(section, callback) {
  console.log("Inside Kafka Backend Update Section service");

  queries.updateSection(section, result => {
    console.log("Section updated successfully");
    callback(null, result);   
    }, err => {
        let errorDetails = {};
        if(err.code === "DUPLICATE_SECTION"){
            errorDetails.statusCode = 401;
            errorDetails.info = { success: false, message: err.message};
            callback(errorDetails, null);
        } else {
            errorDetails.statusCode = 500;
            errorDetails.info = { success: false, message: `Something failed when updating section. ${err}`};
            callback(errorDetails, null);
        }
    });
}

function addMenu(menu, callback) {
    console.log("Inside Kafka Backend Add Menu service");

    queries.addMenu(menu, result => {
        console.log("Menu created with id: " + result);
        callback(null, result);
    }, err=>{
        let errorDetails = {};
        if(err.code === "DUPLICATE_MENU"){
            errorDetails.statusCode = 401;
            errorDetails.info = { success: false, message: err.message };
            callback(errorDetails, null);
        }else{
            errorDetails.statusCode = 500;
            errorDetails.info = { success: false, message: `Something failed when adding menu in the collection. ${err.message}` };
            callback(errorDetails, null);
        }
    });
}

function getMenus(ownerId, callback) {
    console.log("Inside Kafka Backend Get Menus service");

    queries.getMenus(ownerId, result => {
        callback(null, result);
    }, err => {
        let errorDetails = {};
        errorDetails.statusCode = 500;
        errorDetails.info = {success: false, message: `Something failed when getting menus from the collection. ${err}`};
        callback(errorDetails, null);
    });
}

function deleteMenu(menu, callback) {
    console.log("Inside Kafka Backend Delete Menu service");
    
    queries.deleteMenu(menu, result => {
        console.log("Menu deleted successfully");
        callback(null, result);
    }, err => {
        let errorDetails = {};
        errorDetails.statusCode = 500;
        errorDetails.info = { success: false, mesage: `Something failed when deleting menu from the collection. ${err}` };
        callback(errorDetails, null);
    });
}

function updateMenu(menu, callback) {
    console.log("Inside Kafka Backend Update Section service");

  queries.updateMenu(menu, result => {
    console.log("Menu updated successfully");
    callback(null, result);   
    }, err => {
        let errorDetails = {};
        if(err.code === "DUPLICATE_MENU"){
            errorDetails.statusCode = 401;
            errorDetails.info = { success: false, message: err.message};
            callback(errorDetails, null);
        } else {
            errorDetails.statusCode = 500;
            errorDetails.info = { success: false, message: `Something failed when updating menu. ${err}`};
            callback(errorDetails, null);
        }
    });
}

function updateMenuImage(menu, callback) {
    console.log("Inside Kafka Backend Update Menu Image service");

    queries.updateMenuImage({id: menu.id, sectionId:menu.sectionId, ownerId:menu.ownerId,  image: menu.image}, result => {
        console.log("Menu Image updated succesfully");
        callback(null, result);     
    }, err => {
        let errorDetails = {};
        errorDetails.statusCode = 500;
        errorDetails.info = {success: false, message: `Something wrong when updating menu image in the collection. ${err}`};
        callback(errorDetails, null);
    });
}