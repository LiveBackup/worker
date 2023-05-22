export abstract class BaseTemplate {
  protected name: string;
  readonly subject: string;

  constructor(name: string, subject: string) {
    this.name = name;
    this.subject = subject;
  }

  protected buildStyles(): string {
    return '';
  }

  protected abstract buildBody(): string;

  public buildTemplate(): string {
    const styles = this.buildStyles();
    const body = this.buildBody();
    const html = `
      <!DOCTYPE html>
      <html lang="es">

      <head>
        <title>${this.name}</title>
        <meta charset="utf-8">

        <style>
          ${styles}
        </style>
      </head>

      <body>
        ${body}
      </body>

      </html>
    `;

    // TODO: evaluate if the html can be formated and unnecesary spaces and new
    // lines can be deleted. Regex were used but they could introduce a vulnerability
    return html;
  }
}
