import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import Link from "next/link";

const Home: NextPage = ({ data }) => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="To do list" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main style={{ display: "flex" }}>
        <div style={{ justifyContent: "space-between" }}>
          <Link href="/"><button>To do list</button></Link>
          <Link href="/scheduled"><button>Schedule</button></Link>
          <Link href="/add-new"><button>Add new</button></Link>
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          {data.map((todo, index) => (
            <Link href={`/todo/${todo.id}`} key={index}>
              <p>
                {todo.createdAt} - {todo.name}
              </p>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
};

export async function getServerSideProps() {
  process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

  // Fetch data from external API
  const res = await fetch(`https://localhost:7284/api/Todo`);
  const data = await res.json();

  // Pass data to the page via props
  return { props: { data } };
}

export default Home;
