import "./App.css";
import Header from "./component/Header";
import { Outlet } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { useEffect } from "react";
import { setProductData } from "./redux/productSlice";
import { useDispatch, useSelector } from "react-redux";

function App() {
  const dispatch = useDispatch();
  const productData = useSelector((state)=>state.product)
 
  useEffect(()=>{
    (
      async () => {
        const resp = await fetch(`${process.env.REACT_APP_SERVER_DOMAIN}/product`)
        const respData = await resp.json();
        dispatch(setProductData(respData));
    })()
  },[dispatch])

  return (
    <>
      <Toaster />
      <div>
        <Header />
        <main className="pt-16 bg-slate-100 min-h-[calc(100vh)]">
          <Outlet />
        </main>
      </div>
    </>
  );
}

export default App;
