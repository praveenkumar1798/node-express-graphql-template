import get from 'lodash/get';
import { testApp } from '@server/utils/testUtils/testApp';
const request = require('supertest');

describe('Address graphQL-server-DB query tests', () => {
  const addressOne = `
  query {
    address (id: 1) {
      id
      address1
    }
  }
  `;
  const allFields = `
  query {
    address (id: 1) {
      id
      address1
      address2
      city
      country
      lat
      long
      createdAt
      updatedAt
      deletedAt
    }
  }
  `;

  it('should return the fields mentioned in the query', async done => {
    await request(testApp)
      .post('/graphql')
      .type('form')
      .send({ query: addressOne })
      .set('Accept', 'application/json')
      .then(response => {
        const result = get(response, 'body.data.address');
        const resultFields = Object.keys(result);
        expect(resultFields).toEqual(['id', 'address1']);
        done();
      });
  });

  it('should return all the valid fields in the model definition', async done => {
    await request(testApp)
      .post('/graphql')
      .type('form')
      .send({ query: allFields })
      .set('Accept', 'application/json')
      .then(response => {
        const result = get(response, 'body.data.address');
        const resultFields = Object.keys(result);
        expect(resultFields).toEqual([
          'id',
          'address1',
          'address2',
          'city',
          'country',
          'lat',
          'long',
          'createdAt',
          'updatedAt',
          'deletedAt'
        ]);
        done();
      });
  });
});
