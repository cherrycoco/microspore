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
          res.body.result.should.eql('created');
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

// process.env.NODE_ENV = 'test';
// const chai = require('chai');
// const should = chai.should();
// const chaiHttp = require('chai-http');
// chai.use(chaiHttp);
// const server = require('../server/app');

// describe('Endpoints', () => {

//   describe('GET /chunks', () => {
//     it('should return correct chunk', (done) => {
//       chai.request(server)
//         .get('/chunks/1234')
//         .end((err, res) => {
//           should.not.exist(err);
//           res.status.should.eql(200);
//           res.type.should.eql('application/json');
//           res.body.id.should.equal(1234);
//           res.body.chunk.should.exist;
//           res.body.chunk.nextchunk.should.equal(1235);
//           done();
//         });
//     });
//     it('should return empty object if chunk was not found', (done) => {
//       chai.request(server)
//         .get('/chunks/1234343434343423232323232332')
//         .end((err, res) => {
//           should.not.exist(err);
//           res.status.should.eql(200);
//           res.type.should.eql('application/json');
//           res.body.should.eql({});
//           done();
//         });
//     });
//   });
//   describe('POST /plays', () => {
//     it('should return chunk', (done) => {
//       chai.request(server)
//         .post('/plays').send({
//           userId: 13,
//           contentId: 12
//         })
//         .end((err, res) => {
//           should.not.exist(err);
//           res.status.should.eql(200);
//           res.type.should.eql('application/json');
//           res.body.start.should.equal(0);
//           res.body.end.should.equal(1);
//           done();
//         });
//     });
//     it('should return err if no body was provided', (done) => {
//       chai.request(server)
//         .post('/plays')
//         .end((err, res) => {
//           res.status.should.eql(500);
//           res.type.should.eql('application/json');
//           res.body.err.should.exist;
//           done();
//         });
//     });
//     it('should return err if no content was found', (done) => {
//       chai.request(server)
//         .post('/plays').send({
//           userId: 13,
//           contentId: 1200002302302030202020202
//         })
//         .end((err, res) => {
//           res.status.should.eql(500);
//           res.type.should.eql('application/json');
//           res.body.err.should.exist;
//           done();
//         });
//     });
//   });
//   describe('GET /unfinished', () => {
//     it('should return array of plays', (done) => {
//       chai.request(server)
//         .get('/unfinished?userId=1')
//         .end((err, res) => {
//           should.not.exist(err);
//           res.status.should.eql(200);
//           res.type.should.eql('application/json');
//           Array.isArray(res.body.results).should.be.true;
//           if (res.body.results.length) {
//             res.body.results[0].uid.should.equal(1);
//             let endDate = res.body.results[0].endDate;
//             chai.assert(endDate === null);
//           }
//           done();
//         });
//     });
//   });
// });