import chai from "chai";
import chaiHttp = require("chai-http");
import app from "../app";
chai.use(chaiHttp);

const expect = chai.expect;

describe('Testing all routes', () => {
    it('should respond with HTTP 200 status', () => {
        return chai.request(app)
            .get('/add')
            .end((err, res) => {
                expect(res.status).to.be.equal(200);
                res.body.should.be.a('array');
            });
    });
    it('should respond with HTTP 200 status', () => {
        return chai.request(app)
            .get('/delete')
            .end((err, res) => {
                expect(res.status).to.be.equal(200);
                res.body.should.be.a('string');
            });
    });
})
