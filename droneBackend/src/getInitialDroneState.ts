import { drone } from '../interfaces/drone'
import { quadrantBoundary } from '../interfaces/drone';


export function getInitialState(bucket: any, soc: any, data: quadrantBoundary) {
    bucket.get('activeDrones', (err: Error, result: any) => {
        if (err) throw err;
        let drones = result.value;
        soc.emit('activeDrones', drones);
        callSetInterval(bucket, soc, data);
    });
}

export function callSetInterval(bucket: any, socket: any, data: quadrantBoundary) {
    setInterval(() => {
        let movedDrones: drone[] = [];
        bucket.get('activeDrones', (err: Error, result: any) => {
            let drones = result.value;
            drones.forEach((drone: any) => {
                const minX = 1;
                const maxX = data.width;
                const minY = 1;
                const maxY = data.height;
                let randX = Math.random() * (maxX - minX) + minX;
                let randY = Math.random() * (maxY - minY) + minY;
                let newDrone = {
                    id: drone.id,
                    x: randX,
                    y: randY,
                    quadrant: drone.quadrant
                }
                movedDrones.push(newDrone);
            });
            bucket.upsert('activeDrones', movedDrones, (err: Error) => {
                if (err) throw err;
                socket.emit('activeDrones', movedDrones);
            });
        });
    }, 3000);
}
