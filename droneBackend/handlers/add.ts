import uniqid from 'uniqid';

import { ExpressHandler, ExpressRequest, ExpressResponse } from '../interfaces/index'

import { drone } from '../interfaces/drone'

const handler: ExpressHandler = (request: ExpressRequest, response: ExpressResponse) => {
    const data: drone = request.body;
    const id = uniqid();

    const droneInfo = {
        quadrant: data.quadrant || 0, // If quadrant info doesnt come from FE, assign default
        x: data.x || 0.5,  // If x cordinate info doesnt come from FE, assign default
        y: data.y || 0.5,  // If y cordinate info doesnt come from FE, assign default
        id: id // unique id generated using uuid
    }
    request["bucket"].get('activeDrones', (err: Error, result: any) => {
        if (err) throw err;
        else {
            let data = result.value
            data.push(droneInfo);
            request["bucket"].upsert('activeDrones', data, (err: Error, result: any) => {
                try {
                    request["io"].emit("mychannel", data)
                    return response.status(200).send({ message: 'Drone added successfully' });
                } catch (error) {
                    console.error(`Error: ${error.code}`);
                    return response.status(500).send({ message: 'Something went wrong' });

                }

            });
        }
    });
}

export { handler }