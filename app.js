const get       = require('./util').get;
const http      = require('http');
const Koa       = require('koa');
const serve     = require('koa-static');
const Router    = require('koa-router');

const port = process.env.PORT || 8085;
const app = new Koa();
const router = new Router();

router.get('/movie', async (ctx, next) => {
    let query = ctx.request.query;
    let {q} = query;
    let url = `https://api.douban.com/v2/movie/search?q=${encodeURIComponent(q)}&start=0&count=25`;
    let res = await get(url);
    ctx.response.body = res;
});
app.use(router.routes());
app.use(serve(__dirname + '/public'));
app.listen(port, () => {
    console.log(`listen on port: ${port}`);
});