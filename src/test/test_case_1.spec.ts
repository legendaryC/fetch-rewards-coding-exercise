import server from "../server";
import chaiHttp = require("chai-http");
import chai from "chai";
import "mocha";

var expect = chai.expect;
chai.use(chaiHttp);
chai.should();

const test_case_1 = {
  INPUT: {
    transactionsSequenceCalls: [
      '{ "payer": "DANNON", "points": 1000, "timestamp": "2020-11-02T14:00:00Z" }',
      '{ "payer": "UNILEVER", "points": 200, "timestamp": "2020-10-31T11:00:00Z" }',
      '{ "payer": "DANNON", "points": -200, "timestamp": "2020-10-31T15:00:00Z" }',
      '{ "payer": "MILLER COORS", "points": 10000, "timestamp": "2020-11-01T14:00:00Z" }',
      '{ "payer": "DANNON", "points": 300, "timestamp": "2020-10-31T10:00:00Z" }',
    ],
    spendPointsSequenceCall: '{ "points": 5000 }',
  },
  OUTPUT: {
    response_spendPointsSequenceCall: [
      { payer: "DANNON", points: -100 },
      { payer: "UNILEVER", points: -200 },
      { payer: "MILLER COORS", points: -4700 },
    ],
    response_balance: { DANNON: 1000, UNILEVER: 0, "MILLER COORS": 5300 },
  },
};

describe("/***************** Test case 1  *******************/", () => {
  /*
   *Test case 1
   */

  // To test posting 5 transactions
  test_case_1.INPUT.transactionsSequenceCalls.forEach((sCall) => {
    describe("POST /api/new-transactions", () => {
      it("It should add a transaction", (done) => {
        chai
          .request(server)
          .post("/api/new-transactions")
          .send(JSON.parse(sCall))
          .end((err, response) => {
            response.should.have.status(200);
            response.body.should.have.property("message").eq("added a transaction successfully!");
            done();
          });
      });
    });
  });

  // To test spending 5000 points
  describe("POST /api/spend-points", () => {
    it("It should spend points", (done) => {
      chai
        .request(server)
        .post("/api/spend-points")
        .send(JSON.parse(test_case_1.INPUT.spendPointsSequenceCall))
        .end((err, response) => {
          // console.log(response.body);
          response.should.have.status(200);
          expect(response.body).to.eql(test_case_1.OUTPUT.response_spendPointsSequenceCall);
          done();
        });
    });
  });

  // To test getting balance
  describe("GET /api/get-balance", () => {
    it("It should GET balance", (done) => {
      chai
        .request(server)
        .get("/api/get-balance")
        .end((err, response) => {
          // console.log(response.body);
          response.should.have.status(200);
          expect(response.body).to.eql(test_case_1.OUTPUT.response_balance);
          done();
        });
    });
  });
});
