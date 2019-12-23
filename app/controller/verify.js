'use strict';

const Controller = require('egg').Controller;

function toInt(str) {
  if (typeof str === 'number') return str;
  if (!str) return str;
  return parseInt(str, 10) || 0;
}

class ResourceController extends Controller {
  async accessable() {
    const ctx = this.ctx;
    const { username, resource_name } = ctx.request.body;

    var pms = await ctx.model.Group.findAll({
        where: {
            
        }
    })
    const query = { limit: toInt(ctx.query.limit), offset: toInt(ctx.query.offset) };
    ctx.body = await ctx.model.Resource.findAll(query);
  }
}

module.exports = ResourceController;