//import Scene from './components/scene';
import dynamic from 'next/dynamic';

const Scene = dynamic(() => import('./components/scene'), {
  //  loading: () => <p>Loading...</p>, 
  ssr: false
});



export default function Home(){
    return (

      <main className="relative h-screen">
        <Scene />
      </main>
    )
}
