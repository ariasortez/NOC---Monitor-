interface CheckServiceUseCase {
  execute(url: string): Promise<boolean>;
}

type SuccessCallBack = () => void;
type ErrorCallBack = (error: string) => void;

export class CheckService implements CheckServiceUseCase {
  constructor(
    private readonly successCallBack: SuccessCallBack,
    private readonly errorCallBack: ErrorCallBack
  ) {}

  async execute(url: string): Promise<boolean> {
    try {
      const req = await fetch(url);
      if (!req.ok) throw new Error(`Error on service with URL: ${url}`);
      this.successCallBack();
      return true;
    } catch (error) {
      this.errorCallBack(`${error}`);
      console.log(`${error}`);
      return false;
    }
  }
}
