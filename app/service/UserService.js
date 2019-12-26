const Service = require('egg').Service;

class UserService extends Service {
    async getUserInfo(username) {
        const user = await this.ctx.module.Users.findOne({
            where: {
                application_id: this.ctx.app_id,
                user_name: username,
            }
        });
        return user;
    };

    async createUser(username) {
        const user = await this.ctx.module.Users.create({
            application_id: this.ctx.app_id,
            user_name: username,
        });

        const group = await ctx.model.Group.create({
            application_id: this.ctx.app_id,
            group_name: username,
        });

        const member = await ctx.model.Member.create({
            application_id: this.ctx.app_id,
            group_id: group.id,
            user_id: user.id,
            role: 'admin',
        });

        return {
            user: user,
            group: group,
        }
    }
}