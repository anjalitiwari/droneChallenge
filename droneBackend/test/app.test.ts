import chai from "chai";
import chaiHttp = require("chai-http"); 
import app from "../app";  
chai.use(chaiHttp);  

const expect = chai.expect;  

describe('Testing app', () => {  
    it('should respond with HTTP 200 status', () => {
        return chai.request(app)
            .get('/')
            .then(res => {
                expect(res.status).to.be.equal(200);
            });
    });
})
