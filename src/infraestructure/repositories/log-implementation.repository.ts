import { LogEntity, LogSeverityLevel } from '../../domain/entities/log.entity';
import { LogDataSource } from '../../domain/repository/log.repository';

export class LogRepositoryImpl implements LogDataSource {
  constructor(private readonly logDataSource: LogDataSource) {}
  async saveLog(log: LogEntity): Promise<void> {
    this.logDataSource.saveLog(log);
  }
  async getLogs(severityLevel: LogSeverityLevel): Promise<LogEntity[]> {
    return this.logDataSource.getLogs(severityLevel);
  }
}
