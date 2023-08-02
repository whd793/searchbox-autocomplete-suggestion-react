import "./styles.css";
import Searchbox from "./Components/Searchbox";
// import Searchresults from "./Components/Searchresults";
import { useRef } from "react";

export default function App() {
  const bod = useRef();

  return (
    <div className="App" ref={bod}>
      <Searchbox bod={bod} />
      {/* <Searchresults /> */}
    </div>
  );
}
