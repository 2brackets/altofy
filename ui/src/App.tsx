import Navbar from "./components/Navbar";
import './App.css'

function App() {

  return (
    <>
      <Navbar/>
      <div className="avatar avatar-placeholder">
  <div className="bg-neutral text-neutral-content w-24 rounded-full">
    <span className="text-3xl">D</span>
  </div>
</div>
<div className="avatar avatar-online avatar-placeholder">
  <div className="bg-neutral text-neutral-content w-16 rounded-full">
    <span className="text-xl">AI</span>
  </div>
</div>
<div className="avatar avatar-placeholder">
  <div className="bg-neutral text-neutral-content w-12 rounded-full">
    <span>SY</span>
  </div>
</div>
<div className="avatar avatar-placeholder">
  <div className="bg-neutral text-neutral-content w-8 rounded-full">
    <span className="text-xs">UI</span>
  </div>
</div>
    </>
  )
}

export default App
