import socketIOClient from "socket.io-client";
var end_point = 'http://127.0.0.1:4001';
var opts = { forceNew: true };
import chai from "chai";
const expect = chai.expect;

describe("Teest with socket.io", function () {
    var socket_client = socketIOClient(end_point, opts);
    it('Testing quadrant Boundary emit', function (done) {
        socket_client.emit("quadrantBoundary", { "width": 400, "height": 400 })

        socket_client.on('activeDrones', function (data: any) {
            expect(data).to.be.an.instanceOf(Object);
        });

        socket_client.on('activeDrones', function (data: any) {
            expect(data).to.be.an.instanceOf(Object);
            socket_client.disconnect();
            done();
        });

    });
});
