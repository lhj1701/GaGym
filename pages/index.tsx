import Head from 'next/head'
// import styles from '../styles/globals.css'
import Layout from '../components/layout'
import Reservation from '../provider/modules/reservation'

interface AddReserve {
  userId: number;
  id : number;
  completed:boolean;
}

const Home = () => {

  return (
    <Layout>
    <div>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {/* <Reservation/> */}

      <footer>
      </footer>
    </div>
  </Layout>
  )
}

// 여기 함수 부분의 코드를 실행하여 반환 값을 컴포넌트 속성을 넣어줌
export async function getServerSideProps(){

  const res = await fetch('https://jsonplaceholder.typicode.com/todos/1')
  const add : AddReserve = await res.json();

  // props : {속성객체}
  // 속성객체를 컴포넌트의 속성을 넣어줌
  return {props:{add}};
}
export default Home