'use strict';

const { assert, app } = require('egg-mock/bootstrap');

describe('test/app/controller/applications.test.js', () => {
  describe('GET /api/v1/applications', () => {
    it('should work', async () => {
      // 通过 factory-girl 快速创建 user 对象到数据库中
      await app.factory.createMany('applications', 3);
      const res = await app.httpRequest().get('/api/v1/applications?limit=2');
      assert(res.status === 200);
      assert(res.body.length === 2);
      assert(res.body[0].application_name);
      assert(res.body[0].api_key);
      assert(res.body[0].creator);
    });
  });

//   describe('GET /resources/:id', () => {
//     it('should work', async () => {
//       const user = await app.factory.create('resource');
//       const res = await app.httpRequest().get(`/resources/${user.id}`);
//       assert(res.status === 200);
//       assert(res.body.age === user.age);
//     });
//   });

//   describe('POST /resources', () => {
//     it('should work', async () => {
//       app.mockCsrf();
//       let res = await app.httpRequest().post('/resources')
//         .send({
//           age: 10,
//           name: 'name',
//         });
//       assert(res.status === 201);
//       assert(res.body.id);

//       res = await app.httpRequest().get(`/resources/${res.body.id}`);
//       assert(res.status === 200);
//       assert(res.body.name === 'name');
//     });
//   });

//   describe('DELETE /resources/:id', () => {
//     it('should work', async () => {
//       const user = await app.factory.create('resource');

//       app.mockCsrf();
//       const res = await app.httpRequest().delete(`/resources/${resource.id}`);
//       assert(res.status === 200);
//     });
//   });
});