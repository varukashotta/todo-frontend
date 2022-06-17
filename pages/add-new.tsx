import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import Link from "next/link";
import { useState } from "react";

const AddNew: NextPage = () => {
  const [todo, setTodo] = useState<string>("");
  const [error, setError] = useState<boolean>(false);

  const sendToDo = () => {
    setError(false);
    if (!todo || todo === "") {
      setError(true);
      return;
    }
    fetch("https://localhost:7284/api/Todo", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: JSON.stringify({name: todo,isComplete: true}),
    })
      .then((r) => console.log(r))
      .catch((e) => console.log(e));
    console.log({ todo });
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Add New</title>
        <meta name="description" content="To do list" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main style={{ display: "flex" }}>
        <div style={{ justifyContent: "space-between" }}>
          <Link href="/">
            <button>To do list</button>
          </Link>
          <Link href="/scheduled">
            <button>Schedule</button>
          </Link>
          <Link href="/add-new">
            <button>Add new</button>
          </Link>
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <h1>Add New</h1>
          <input
            name="todo"
            value={todo}
            onChange={(e) => setTodo(e.target.value)}
          />
          <button onClick={() => sendToDo()}>Submit</button>
          {error && <p style={{ color: "red" }}>Fix input</p>}
        </div>
      </main>
    </div>
  );
};

// export async function getServerSideProps() {
//   process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

//   // Fetch data from external API
//   const res = await fetch(`https://localhost:7284/api/Todo`);
//   const data = await res.json();

//   // Pass data to the page via props
//   return { props: { data } };
// }

export default AddNew;
