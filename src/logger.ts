import pino from "pino";

const LOG_LEVEL = DEBUG ? "debug" : "error";
const logger: pino.Logger = pino({ name: "app", level: LOG_LEVEL });

interface DonsoleConfig {
  prefixScope?: boolean;
  scope?: "phaser" | "node" | "ui";
  prefixEmoji?: boolean;
  emoji?: {
    log: string;
    cut: string;
    error: string;
    warn: string;
    info: string;
  };
  suffixCut?: boolean;
}

const DEFAULT_EMOJIS = {
  log: "🪵",
  cut: "🪓",
  error: "🚨",
  warn: "⚠️",
  info: "ℹ️",
};
export class Donsole {
  config: DonsoleConfig;

  constructor(
    config = {
      emoji: {
        log: DEFAULT_EMOJIS.log,
        cut: DEFAULT_EMOJIS.cut,
        error: DEFAULT_EMOJIS.error,
        warn: DEFAULT_EMOJIS.warn,
        info: DEFAULT_EMOJIS.info,
      },
      prefixScope: true,
      suffixCut: true,
    }
  ) {
    this.config = config;
    window.donsole = this;
  }
  private buildArgs = (
    type: "log" | "warn" | "info" | "error",
    args: any[]
  ): any[] => {
    let logArgs = [];
    if (this.config.prefixScope && this.config.scope) {
      logArgs.push(`[${this.config.scope}] `);
    }
    logArgs.push(
      `${
        (this.config.prefixEmoji && this.config.emoji[type]) || ""
      } DONSOLE ${type.toUpperCase()} 👇
`
    );
    logArgs = [...logArgs, ...args];
    if (this.config.suffixCut) {
      logArgs.push(`
${this.config.emoji.cut} ${type.toUpperCase()} CUT`);
    }
    return logArgs;
  };

  public log = (...args: any[]): void =>
    console.log(...this.buildArgs("log", args));
  public warning = (...args: any[]): void =>
    console.log(...this.buildArgs("warn", args));
  public info = (...args: any[]): void =>
    console.log(...this.buildArgs("info", args));
  public error = (...args: any[]): void =>
    console.log(...this.buildArgs("error", args));
}

export default logger;
