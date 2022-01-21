/*
 * @Description: 
 * @Author: RayseaLee
 * @Date: 2021-12-09 14:13:38
 * @FilePath: \koa2-generator\models\dao.js
 * @LastEditTime: 2021-12-10 16:36:04
 * @LastEditors: RayseaLee
 */
 const _model = module.exports = {};

 _model.findAndCountAll = async function (Model, condition) {
   return await Model.findAndCountAll(condition);
 }
 
 _model.findAll = async function (Model, condition) {
   return await Model.findAll(condition);
 }
 
 _model.findOne = async function (Model, condition) {
   return await Model.findOne(condition)
 }

 _model.findOrCreate = async function (Model, condition) {
   console.log(Model);
   console.log(condition);
   return await Model.findOrCreate(condition)
 } 
 
 _model.findById = async function (Model, id) {
   return await Model.findOne({
     where: {
       id: id
     }
   });
 };
 _model.create = async function (Model, model) {
   return await Model.create(model);
 };
 
 // UPDATE bannars_bannar SET rank=2 WHERE id IN ('0','1')
 _model.update = async function (Model, setStatement, condition) {
   return await Model.update(setStatement, condition);
 }
 
 _model.deleteAll = async function (Model, condition) {
   return await Model.destroy(condition);
 }
 
 _model.insertAll = async function (Model, articles) {
   return await Model.bulkCreate(articles);
 }
 _model.count= async function (Model, condition) { 
   return await Model.count(condition);
 }
 
 _model.build = function (Model,articles) {
   return Model.build(articles);
 }
 