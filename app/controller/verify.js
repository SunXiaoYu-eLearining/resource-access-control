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
    const app = this.app;
    const { username, resource_name } = ctx.request.body;
    const Op = await app.Sequelize.Op;

    var user = await ctx.model.User.findOne({
        where: {
            application_id: ctx.app_id,
            user_name: username,
        }
    });

    var groups = await ctx.model.Member.findAll({
        where: {
            application_id: ctx.app_id,
            user_id: user.id
        }
    });
    ctx.body = groups;
    // const query = { limit: toInt(ctx.query.limit), offset: toInt(ctx.query.offset) };
    // ctx.body = await ctx.model.Resource.findAll(query);
  }
}

module.exports = ResourceController;