'use strict';

// app/controller/users.js
const Controller = require('egg').Controller;

function toInt(str) {
  if (typeof str === 'number') return str;
  if (!str) return str;
  return parseInt(str, 10) || 0;
}

class MemberController extends Controller {
  async index() {
    const ctx = this.ctx;
    const query = { where: {
      application_id: ctx.app_id,
    }, limit: toInt(ctx.query.limit), offset: toInt(ctx.query.offset) };
    ctx.body = await ctx.model.Member.findAll(query);
  }
}

module.exports = MemberController;