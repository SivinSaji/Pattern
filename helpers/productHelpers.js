var db = require('../config/connection')
var collection = require('../config/collections')
var objectId = require('mongodb').ObjectID;
const { PRODUCT_COLLECTION } = require('../config/collections');
const { response } = require('express');

module.exports = {
    getAllProducts:()=>{
       return new Promise(async(resolve,reject)=>{
           let products = await db.get().collection(collection.PRODUCT_COLLECTION).find().toArray()
           resolve(products)
       })

        }
        ,
    addProduct:(product,proId)=>{
        db.get().collection('products').insertOne(product).then((data)=>{
            proId(data.ops[0]._id)
        })
    },

    getProductDetails:(proId)=>{
        return new Promise((resolve,reject)=>{
            db.get().collection(collection.PRODUCT_COLLECTION).findOne({_id:objectId(proId)}).then((product)=>{
                resolve(product)
            })
        })
    },


    updateProduct:(proId, proData)=>{
        return new Promise((resolve,reject)=>{
            db.get().collection(collection.PRODUCT_COLLECTION).findOne({_id:objectId(proId)},
            {
                $set:{
                    Name:proData.Name,
                    Price:proData.Price,
                    Category:proData.Category,
                    Quantity:proData.Quantity,
                    Description:proData.Description,

                }
            }).then(()=>{
                resolve()
            })
        })
    }
    ,

    deleteProduct:(proId)=>{
        return new Promise((resolve,reject)=>{
            db.get().collection(collection.PRODUCT_COLLECTION).removeOne({_id:objectId(proId)}).then(()=>{
                resolve()
            })
        })
        
    }


}