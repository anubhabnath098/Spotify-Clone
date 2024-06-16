
import "./App.css"
import Home from "./pages/Home/Home";
import Login from './components/Login/Login';
import React, {useEffect} from "react"
import { useStateProvider } from './utils/StateProvider';
import { reducerCases } from './utils/Constants';


function App() {
  const[{token},dispatch] = useStateProvider();

  useEffect(()=>{
    const hash = window.location.hash;
    // console.log(hash);
    if(hash){
      const token = hash.substring(1).split("&")[0].split('=')[1];
      dispatch({type:reducerCases.SET_TOKEN, token})
    }
  },[token, dispatch])

  return (
    <>
      <div>{token? <Home/>:<Login/>}</div>
    </>
  );
}

export default App;
