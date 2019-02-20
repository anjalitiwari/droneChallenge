import { handler as delDrone } from '../handlers/delete';
import { ExpressApplication } from '../interfaces/index';

function deleteDrone(app: ExpressApplication): void {
  app.post('/delete', delDrone);
  }
  export default deleteDrone;
