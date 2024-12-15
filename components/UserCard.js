export default function UserCard(ctx) {
  const { name, age } = ctx.attributes;

  return () => `
        <h1 class="title is-4">User Card</h1>
        <p>Name: ${name}</p>
        <p>Age: ${age}</p>
    `;
}
