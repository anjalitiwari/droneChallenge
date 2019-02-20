"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function getInitialState(bucket, soc) {
    bucket.get('activeDrones', (err, result) => {
        if (err)
            throw err;
        else {
            let drones = result.value;
            soc.emit('activeDrones', drones);
            callSetInterval(bucket, soc);
        }
    });
}
exports.getInitialState = getInitialState;
function callSetInterval(bucket, socket) {
    setInterval(() => {
        let movedDrones = [];
        bucket.get('activeDrones', (err, result) => {
            let drones = result.value;
            drones.forEach((drone) => {
                const min = 1;
                const max = 100;
                let randX = Math.random() * (max - min) + min;
                let randY = Math.random() * (max - min) + min;
                let newDrone = {
                    id: drone.id,
                    x: randX,
                    y: randY,
                    quadrant: drone.quadrant
                };
                movedDrones.push(newDrone);
            });
            bucket.upsert('activeDrones', movedDrones, (err) => {
                if (err)
                    throw err;
                socket.emit('activeDrones', movedDrones);
            });
        });
    }, 3000);
}
exports.callSetInterval = callSetInterval;
//# sourceMappingURL=getInitialDroneState.js.map