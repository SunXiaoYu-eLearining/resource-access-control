'use strict';

// app/controller/users.js
const Controller = require('egg').Controller;

function toInt(str) {
  if (typeof str === 'number') return str;
  if (!str) return str;
  return parseInt(str, 10) || 0;
}

class UserController extends Controller {
  async index() {
    const ctx = this.ctx;
    const query = { where: {
      application_id: ctx.app_id,
    }, limit: toInt(ctx.query.limit), offset: toInt(ctx.query.offset) };
    ctx.body = await ctx.model.User.findAll(query);
  }

  async show() {
    const ctx = this.ctx;
    ctx.body = await ctx.model.User.findByPk(toInt(ctx.params.id));
  }

  async create() {
    const ctx = this.ctx;
    const { username } = ctx.request.body;
    
    const user = await ctx.model.User.create({ 
      application_id: ctx.app_id,
      user_name: username,
    });

    const group = await ctx.model.Group.create({
      application_id: ctx.app_id,
      group_name: username,
    });

    const member = await ctx.model.Member.create({
      application_id: ctx.app_id,
      group_id: group.id,
      user_id: user.id,
      role: 'admin',
    })

    ctx.status = 201;
    ctx.body = {
      user: user,
      group: group
    };
  }

  async update() {
    const ctx = this.ctx;
    const id = toInt(ctx.params.id);
    const user = await ctx.model.User.findByPk(id);
    if (!user) {
      ctx.status = 404;
      return;
    }

    const { name, age } = ctx.request.body;
    await user.update({ name, age });
    ctx.body = user;
  }

  async destroy() {
    const ctx = this.ctx;
    const id = toInt(ctx.params.id);
    const user = await ctx.model.User.findByPk(id);
    if (!user) {
      ctx.status = 404;
      return;
    }

    await user.destroy();
    ctx.status = 200;
  }

}

module.exports = UserController;