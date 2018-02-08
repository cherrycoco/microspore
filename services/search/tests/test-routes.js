const chai = require('chai');
const should = chai.should();
const chaiHttp = require('chai-http');
chai.use(chaiHttp);
const server = require('../index.js');


describe('Search Endpoints', () => {
  
  describe('GET /search/:page', () => {
    it('should return correct searched items', (done) => {
      chai.request(server)
        .get('/search/2?query=shoes')
        .end((err, res) => {
          should.not.exist(err);
          res.status.should.eql(200);
          res.body.should.exist;
          res.body.length.should.eql(20);
          done();
        });
    });

    it('should not return error if no results found', (done) => {
      chai.request(server)
        .get('/search/1?query=zzzzzz')
        .end((err, res) => {
          should.not.exist(err);
          res.status.should.eql(200);
          res.body.length.should.eql(0);
          done();
        });
    });

    
  });

  describe('POST /search/:productID', () => {
    it('should correctly update product info', (done) => {
      chai.request(server)
        .post('/search/2')
        .send({
          title: 'New Sauce 1.0',
          price: 2.99
        })
        .end((err, res) => {
          should.not.exist(err);
          res.status.should.eql(200);
          res.body.should.exist;
          res.body._id.should.eql('2');
          res.body._shards.failed.should.eql(0);
          res.body.result.should.eql('updated');
          done();
        });
    });

    it('should correctly index new product', (done) => {
      chai.request(server)
        .post('/search/1000002')
        .send({
          title: 'New Sauce 2.0',
          price: 12.99
        })
        .end((err, res) => {
          should.not.exist(err);
          res.status.should.eql(200);
          res.body.should.exist;
          res.body._id.should.eql('1000002');
          res.body._shards.failed.should.eql(0);
          res.body.result.should.eql('created' || 'updated');
          done();
        });
    });
  });

  describe('DELETE /search/:productID', () => {
    it('should delete the correct product from search database', (done) => {
      chai.request(server)
        .delete('/search/1000002')
        .end((err, res) => {
          should.not.exist(err);
          res.status.should.eql(200);
          res.body.should.exist;
          res.body.result.should.eql('deleted');
          done();
        });
    });

    it('should correctly index new product', (done) => {
      chai.request(server)
        .post('/search/1000002')
        .send({
          title: 'New Sauce 2.0',
          price: 12.99
        })
        .end((err, res) => {
          should.not.exist(err);
          res.status.should.eql(200);
          res.body.should.exist;
          res.body._id.should.eql('1000002');
          res.body._shards.failed.should.eql(0);
          res.body.result.should.eql('created');
          done();
        });
    });
  });
});