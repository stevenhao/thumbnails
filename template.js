export default ({ body, title, icon }) => {
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta name="viewport" content="width=device-width,  initial-scale=1, maximum-scale=1.0, user-scalable = no">
        <link rel="apple-touch-icon" sizes="57x57" href="${icon}">
        <title>${title}</title>
      </head>
      <body>
        <div id="root">${body}</div>
      </body>
    </html>
  `;
};
