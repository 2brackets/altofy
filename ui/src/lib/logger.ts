export class Logger {

  private static debugEnabled : boolean = false;

  private static formatMessage(level: string, args: unknown[]) {
  const timestamp = new Date().toISOString();
  return [`[${timestamp}] [${level.toUpperCase()}]`, ...args];
  }

  public static enableDebug(enabled: boolean): void {
    Logger.debugEnabled = enabled;
  }

  public static isDebugEnabled(): boolean {
    return Logger.debugEnabled
  }

  public static info(...args: unknown[]): void {
    console.log(...Logger.formatMessage("info", args));
  }

  public static warn(...args: unknown[]): void {
    console.warn(...Logger.formatMessage("warn", args))
  }

  public static error(...args: unknown[]): void {
    console.error(...Logger.formatMessage("error", args));
  }

  public static debug(...args: unknown[]): void {
    if(Logger.debugEnabled){
      console.debug(...Logger.formatMessage("debug", args));
    } 
  }
  
}
