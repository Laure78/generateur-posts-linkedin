import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { parseBeworkRole, isChefOrAdmin, canAccessAdminPlatform } from './roles.ts';

describe('roles', () => {
  it('parseBeworkRole defaults to beworker', () => {
    assert.equal(parseBeworkRole(undefined), 'beworker');
    assert.equal(parseBeworkRole('chef_equipe'), 'chef_equipe');
  });

  it('chef and admin access admin platform', () => {
    assert.equal(isChefOrAdmin('chef_equipe'), true);
    assert.equal(isChefOrAdmin('admin'), true);
    assert.equal(isChefOrAdmin('beworker'), false);
    assert.equal(canAccessAdminPlatform('admin'), true);
  });
});
