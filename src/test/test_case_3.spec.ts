import server from "../server";
import chaiHttp = require("chai-http");
import chai from "chai";
import "mocha";

var expect = chai.expect;
chai.use(chaiHttp);
chai.should();

const test_case_3 = {
  INPUT: {
    transactionsSequenceCalls: [],
    spendPointsSequenceCall: '{ "points":999999 }',
  },
  OUTPUT: {
    response_spendPointsSequenceCall: [
      { payer: "MILLER COORS", points: -5300 },
      { payer: "DANNON", points: -1000 },
    ],
    response_balance: { DANNON: 0, UNILEVER: 0, "MILLER COORS": 0 },
  },
};

describe("/***************** Test case 3  *******************/", () => {
  /*
   *Test case 3
   */
  // To test posting 0 transactions
  test_case_3.INPUT.transactionsSequenceCalls.forEach((sCall) => {
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

  // To test spending 999999 points
  describe("POST /api/spend-points", () => {
    it("It should spend points", (done) => {
      chai
        .request(server)
        .post("/api/spend-points")
        .send(JSON.parse(test_case_3.INPUT.spendPointsSequenceCall))
        .end((err, response) => {
          // console.log(response.body);
          response.should.have.status(200);
          expect(response.body).to.eql(test_case_3.OUTPUT.response_spendPointsSequenceCall);
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
          expect(response.body).to.eql(test_case_3.OUTPUT.response_balance);
          done();
        });
    });
  });
});
