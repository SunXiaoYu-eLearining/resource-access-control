'use strict';

// app/controller/users.js
const Controller = require('egg').Controller;

function toInt(str) {
  if (typeof str === 'number') return str;
  if (!str) return str;
  return parseInt(str, 10) || 0;
}

class GroupController extends Controller {
  async index() {
    const ctx = this.ctx;
    const query = { where: {
      application_id: ctx.app_id,
    }, limit: toInt(ctx.query.limit), offset: toInt(ctx.query.offset) };
    ctx.body = await ctx.model.Group.findAll(query);
  }

  async create() {
    const ctx = this.ctx;
    const { group_name, creator } = ctx.request.body;
    
    const user = await ctx.model.User.findOne({
      where: {
        application_id: ctx.app_id,
        user_name: creator,
      }
    });

    if(user){
      const group = await ctx.model.Group.create({
        application_id: ctx.app_id,
        group_name: group_name,
      });
  
      const member = await ctx.model.Member.create({
        application_id: ctx.app_id,
        group_id: group.id,
        user_id: user.id,
        role: 'admin',
      })
  
      ctx.status = 201;
      ctx.body = group
    }else{
      ctx.status = 422;
      ctx.body = {
        error: `creator ${creator} cannot be found`,
      };
    }
    
  }
}

module.exports = GroupController;