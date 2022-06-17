export default function Todo({ todo }) {
  console.log(todo);
  return (
    <div
      style={{
        alignItems: "center",
        display: "flex",
        flex: 1,
        width: "100%",
        height: "100%",
        justifyContent: "center"
      }}
    >
      <p>
        {todo.id} - {todo.name} - {todo.createdAt}
      </p>
    </div>
  );
}

// This function gets called at build time
export async function getStaticPaths() {
  // Call an external API endpoint to get posts
  const res = await fetch("https://localhost:7284/api/Todo");
  const todos = await res.json();

  // Get the paths we want to pre-render based on todos
  const paths = todos.map((todo) => ({
    params: { id: String(todo.id) },
  }));

  // We'll pre-render only these paths at build time.
  // { fallback: false } means other routes should 404.
  return { paths, fallback: false };
}

// This also gets called at build time
export async function getStaticProps({ params }) {
  // params contains the post `id`.
  // If the route is like /posts/1, then params.id is 1
  const res = await fetch(`https://localhost:7284/api/Todo/${params.id}`);
  const todo = await res.json();

  // Pass todo data to the page via props
  return { props: { todo } };
}
