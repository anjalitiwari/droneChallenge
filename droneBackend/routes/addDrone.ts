import { handler as adDrone } from '../handlers/add';
import { ExpressApplication } from '../interfaces/index';

function addDrone(app: ExpressApplication): void {
  app.post('/add', adDrone);
  }
  export default addDrone;
