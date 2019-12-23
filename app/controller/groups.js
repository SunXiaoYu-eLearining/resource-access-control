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
    const { group_name } = ctx.request.body;
    
    const group = await ctx.model.Group.create({
      application_id: ctx.app_id,
      group_name: group_name,
    });

    ctx.status = 201;
    ctx.body = group
  }
}

module.exports = GroupController;