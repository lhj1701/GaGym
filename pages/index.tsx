import Head from 'next/head'
import styles from '../styles/Home.module.css'
import Reservation from '../provider/modules/reservation/AddReservation'

interface Todo {
  userId: number;
  id : number;
  completed:boolean;
}

const Home = () => {

  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        GaGym
      </main>

      <footer className={styles.footer}>
      {/* <Reservation/> */}
      </footer>
    </div>
  )
}

// 여기 함수 부분의 코드를 실행하여 반환 값을 컴포넌트 속성을 넣어줌
export async function getServerSideProps(){

  const res = await fetch('https://jsonplaceholder.typicode.com/todos/1')
  const todo : Todo = await res.json();

  // prop : {속성객체}
  // 속성객체를 컴포넌트의 속성을 넣어줌
  return {props:{todo}};
}
export default Home
