import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import styles from "../styles/Home.module.css";

const Scheduled: NextPage = ({ data }) => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="To do list" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <Link href="/">To do list</Link>
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
  return {
    props: {
      data: data.sort(function (a, b) {
        // Turn your strings into dates, and then subtract them
        // to get a value that is either negative, positive, or zero.
        return new Date(b.createdAt) - new Date(a.createdAt);
      }),
    },
  };
}

export default Scheduled;
