import Thread from './Thread.jsx';
import { Link } from "react-router-dom";

export const Home = () => {
    return (
    <>
    <header className='header'>
      <p>掲示板</p>
      <button>
        <Link to={'/threads/new'}>スレッドを新規作成</Link>
      </button>
    </header>

    <div className='body'>
      <p>新着スレッド</p>
      <Thread />
    </div>
    </>
    );
};

export default Home;