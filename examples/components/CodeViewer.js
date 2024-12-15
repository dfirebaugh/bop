function sanitize(str) {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function highlight(ctx) {
  const codeBlock = ctx.dom.querySelector("pre code");
  if (codeBlock) {
    if (window.hljs) {
      window.hljs.highlightElement(codeBlock);
    } else {
      console.error("Highlight.js is not loaded. Ensure the CDN is included.");
    }
  }
}

export default function CodeViewer(ctx) {
  let AlertMessage = `const hello = 1;`;
  ctx.setOnConnectedCallback(function () {
    ctx.update();

    fetch(ctx.attributes.src)
      .then((response) => response.text())
      .then((text) => {
        AlertMessage = text;
        ctx.update();
        highlight(ctx);
      });
  });

  return () => {
    return `<pre><code class="language-javascript">${sanitize(
      AlertMessage.trim(),
    )}</code></pre>`;
  };
}
