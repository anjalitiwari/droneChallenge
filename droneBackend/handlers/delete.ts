import { drone } from '../interfaces/drone'
import lodash from 'lodash';

import { ExpressHandler, ExpressRequest, ExpressResponse } from '../interfaces/index'

const handler: ExpressHandler = (request: ExpressRequest, response: ExpressResponse) => {
    const payload: drone = request.body;
    request["bucket"].get('activeDrones', (err: Error, result: any) => {
        if (err) throw err;
        else {
            const data = result.value
            const filteredData = lodash.remove(data, function (drones: any) {
                return drones.id !== payload.id;
            });
            request["bucket"].upsert('activeDrones', filteredData, (err: Error, result: any) => {
                try {
                    request["io"].emit("mychannel", filteredData)
                    return response.status(200).send({ message: 'Drone removed successfully' });
                } catch (error) {
                    console.error(`Error: ${error.code}`);
                    return response.status(500).send({ message: 'Something went wrong' });

                }

            });
        }
    });
}

export { handler }