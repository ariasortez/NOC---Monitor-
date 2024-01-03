import { LogEntity, LogSeverityLevel } from '../../entities/log.entity';
import { LogDataSource } from '../../repository/log.repository';

interface CheckServiceUseCase {
  execute(url: string): Promise<boolean>;
}

type SuccessCallBack = () => void;
type ErrorCallBack = (error: string) => void;

export class CheckService implements CheckServiceUseCase {
  constructor(
    private readonly logRepository: LogDataSource,
    private readonly successCallBack: SuccessCallBack,
    private readonly errorCallBack: ErrorCallBack
  ) {}

  async execute(url: string): Promise<boolean> {
    try {
      const req = await fetch(url);
      if (!req.ok) throw new Error(`Error on service with URL: ${url}`);
      const log = new LogEntity(
        `Service ${url} is working`,
        LogSeverityLevel.low
      );
      this.logRepository.saveLog(log);
      this.successCallBack();
      return true;
    } catch (error) {
      const errorMessage = `${error}`;
      const log = new LogEntity(errorMessage, LogSeverityLevel.high);
      this.logRepository.saveLog(log);
      this.errorCallBack(errorMessage);
      return false;
    }
  }
}
