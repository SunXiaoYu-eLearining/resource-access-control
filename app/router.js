'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  //router.resources('admins', '/api/v1/admins', controller.administrators);
  router.resources('applications', '/api/v1/applications', controller.applications);
  router.resources('groups', '/api/v1/groups', controller.groups);
  router.resources('permissions', '/api/v1/permissions', controller.permissions);
  router.resources('resources', '/api/v1/resources', controller.resources);
  router.resources('users', '/api/v1/users', controller.users);
  router.resources('members', '/api/v1/members', controller.members);

  router.get('accessable', '/api/v1/verify', controller.verify.accessable)
};
