'use strict';
// abastecimento.js

// const mongoose = require('mongoose');
const Jornada = require('../app/model/jornada.model');
const Const = require('../config/const');
const data = require('./jornada.data');

process.env.NODE_ENV = Const.test;

const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../app');
const should = chai.should();
const expect = chai.expect;
const assert = chai.assert;
const util = require('../app/tools/util');

chai.use(chaiHttp);

describe('Jornadas', () => {
  beforeEach((done) => {
    Jornada.remove({}, (err) => {
      done();
    });
  });

  describe('Mockgoose', () => {

    it('should be on test env', (done) => {
      expect(server.isTest()).to.be.equal(true);
      done();
    });

    it('should be mocked', (done) => {
      expect(server.isMocked()).to.be.equal(true);
      done();
    });
  });

  describe('/GET jornadas', () => {
    it('should ask for the token', (done) => {
      chai.request(server)
        .get('/jornadas')
        .end((err, res) => {
          res.should.have.status(403);
          res.error.text.should.contain('No token provided');
          done();
        });
    });
  });

  describe('Sending', () => {
    it('Should retrieve one jornada ready to send', (done) => {
      let jornada = new Jornada(data.jornada);
      jornada.save((err) => {
        Jornada.allJornadas((err, jornadas) => {
          assert.isNull(err);
          expect(jornadas).to.have.length(1);
          done();
        });
      });
    });
  });

  describe('Validation', () => {
    it('should add the missing decimal places in the abastecimento', (done) => {
      let jornada = new Jornada(data.jornada);
      let text = jornada.serialize();
      let firstLine = text.split('\n')[0];
      let fuelAmount = firstLine.substring(28, 39);
      assert.isNotNull(text);
      expect(fuelAmount).to.be.equal('0000007.000');
      done();
    });

    it('should print two refuellings from the same car', (done) => {
      let jornada = new Jornada(data.jornadaMesmoVeiculo);
      let text = jornada.serialize();

      let abastecimentos = text.match(/40412/g);
      expect(abastecimentos).to.have.length(3);
      done();
    });
  });

});
