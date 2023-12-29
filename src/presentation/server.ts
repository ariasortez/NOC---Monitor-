import { CroneService } from '../config/cron/crone-service';
import { CheckService } from '../domain/use-cases/checks/check-service';

export class ServerApp {
  public static start() {
    console.log('Server initialized');
    const url = 'https://www.google.com/';
    CroneService.createJob('*/5 * * * * *', () => {
      new CheckService(
        () => console.log(`The url: ${url} is OK`),
        (error) => console.log(error)
      ).execute(url);
    });
  }
}
