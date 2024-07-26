import './App.css'
import Home from './Pages/Home'
import logo from './assets/logo.png'

function App() {

  return (
    <div className='pt-20 w-[100vw] h-[100vh] bg-slate-950 text-white overflow-hidden'>
      <div className="logo absolute top-5 left-10 flex flex-col justify-center items-center">
        <img className='w-[3rem]' src={logo} alt="" />
        <div className='font-bold m-[-0.7rem]'>MOVIE</div>
        <div className='font-bold'>RECOMMEND</div>
      </div>
      <Home />
    </div>
  )
}

export default App
