'use strict';

// app/controller/users.js
const Controller = require('egg').Controller;

function toInt(str) {
  if (typeof str === 'number') return str;
  if (!str) return str;
  return parseInt(str, 10) || 0;
}

class PermissionController extends Controller {
  async index() {
    const ctx = this.ctx;
    const query = { limit: toInt(ctx.query.limit), offset: toInt(ctx.query.offset) };
    ctx.body = await ctx.model.Permission.findAll(query);
  }

  async create() {
    const ctx = this.ctx;
    const { resource_name, group_name, permission } = ctx.request.body;
    const { owner, group, other } = permission;

    const resource = await ctx.model.Resources.findOne({
      where: {
        id: ctx.app_id,
        resource_name: resource_name
      }
    });

    const group = await ctx.model.Group.findOne({
      where: {
        id: ctx.app_id,
        group_name: group_name
      }
    });

    const pmso = [owner, group, other];
    const pmsn = [0, 0, 0];
    for(var i=0; i<pmso.length; i++){
      pmso[i].readable === true ? pmsnp[i]+=4 : '';
      pmso[i].writable === true ? pmsnp[i]+=2 : '';
      pmso[i].executable === true ? pmsnp[i]+=1 : '';
    };

    const permission = await ctx.model.Permission.create({
      application_id: ctx.app_id,
      resource_id: resource.id,
      group_id: group.id,
      owner: pmsn[0],
      group: pmsn[1],
      other: pmsn[2]
    });

    ctx.status = 201;
    ctx.body = permission;
  }
}

module.exports = PermissionController;