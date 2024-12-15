export default function ButtonExample({ attributes }) {
  return () => `
      <button class="button is-primary">${attributes.title || "default"}</button>
    `;
}
