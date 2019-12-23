module.exports = options => {
    return async function filter(ctx, next){
        console.log(ctx.request.header);
        var apikey = await ctx.request.header.apikey;
        if(!apikey){
            ctx.status = 403;
        }else{
            var app = await ctx.model.Application.findOne({
                where: {
                    api_key: apikey
                }
            });
            console.log(app);
            ctx.app_id = app.id;
            await next();
        }
    }
}