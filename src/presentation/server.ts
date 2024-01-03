import { CroneService } from '../config/cron/crone-service';
import { CheckService } from '../domain/use-cases/checks/check-service';
import { FileSystemDataSource } from '../infraestructure/data/file-system.datasource';
import { LogRepositoryImpl } from '../infraestructure/repositories/log-implementation.repository';

const fileSystemLogRepository = new LogRepositoryImpl(
  new FileSystemDataSource()
);

export class ServerApp {
  public static start() {
    console.log('Server initialized');
    const url = 'https://www.google.com/';
    CroneService.createJob('*/5 * * * * *', () => {
      new CheckService(
        fileSystemLogRepository,
        () => console.log(`The url: ${url} is OK`),
        (error) => console.log(error)
      ).execute(url);
    });
  }
}
