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

        var resource = await ctx.model.Resource.findOne({
            where: {
                application_id: ctx.app_id,
                resource_name: resource_name,
            }
        });

        if (!user) {
            ctx.status = 422,
                ctx.body = {
                    error: `user ${username} cannot be found`,
                }
            return;
        }

        if (!resource) {
            ctx.status = 422,
                ctx.body = {
                    error: `resource ${resource_name} is not defined`,
                }
            return;
        }

        var leadgroups = await ctx.model.Member.findAll({
            where: {
                application_id: ctx.app_id,
                user_id: user.id,
                role: 'admin'
            }
        });

        var mygroups = [];
        for(var m=0; m<leadgroups.length; m++){
            mygroups.push(leadgroups[m].group_id);
        }

        var members = await ctx.model.Member.findAll({
            where: {
                application_id: ctx.app_id,
                user_id: user.id
            }
        });

        var gpset = [];
        for (let i = 0; i < members.length; i++) {
            gpset.push(members[i].group_id);
        };

        var permissions = await ctx.model.Permission.findAll({
            where: {
                application_id: ctx.app_id,
                resource_id: resource.id,
                [Op.or]: [
                    {
                        [Op.and]: {
                            group_id: {
                                [Op.in]: mygroups
                            },
                            owner: {
                                [Op.gt]: 0
                            },
                        }
                    },
                    {
                        [Op.and]: {
                            group_id: {
                                [Op.in]: gpset
                            },
                            group: {
                                [Op.gt]: 0,
                            }
                        }
                    },
                    {
                        [Op.and]: {
                            group_id: {
                                [Op.notIn]: gpset
                            },
                            other: {
                                [Op.gt]: 0,
                            }
                        }
                    }
                ]
            }
        });

        const PERMISSION_MAPPER = {
            '0': {
                readable: false,
                writable: false,
                executable: false
            },
            '1': {
                readable: false,
                writable: false,
                executable: true
            },
            '2': {
                readable: false,
                writable: true,
                executable: false
            },
            '3': {
                readable: false,
                writable: true,
                executable: true
            },
            '4': {
                readable: true,
                writable: false,
                executable: false
            },
            '5': {
                readable: true,
                writable: false,
                executable: true
            },
            '6': {
                readable: true,
                writable: true,
                executable: false
            },
            '7': {
                readable: true,
                writable: true,
                executable: true
            },
        };

        var pms = [];
        
        for(var i=0; i<permissions.length; i++){
            var p = {
                permission_id: permissions[i].id,
                resource_id: permissions[i].resource_id,
                group_id: permissions[i].group_id,
                // owner: PERMISSION_MAPPER[permissions[i].owner],
                // group: PERMISSION_MAPPER[permissions[i].group],
                // other: PERMISSION_MAPPER[permissions[i].other]
            };
            if(resource.creator === user.id){
                p.role = 'owner',
                p.premission = PERMISSION_MAPPER[permissions[i].owner]
            }else if(mygroups.indexOf(permissions[i].group_id) > -1){
                p.role = 'member',
                p.premission = PERMISSION_MAPPER[permissions[i].group]
            }else{
                p.role = 'guest',
                p.premission = PERMISSION_MAPPER[permissions[i].other]
            }
            pms.push(p);
        }


        ctx.body = {
            user_name: username,
            resource_name: resource_name,
            permission: pms,
        }
        // const query = { limit: toInt(ctx.query.limit), offset: toInt(ctx.query.offset) };
        // ctx.body = await ctx.model.Resource.findAll(query);
    }
}

module.exports = ResourceController;