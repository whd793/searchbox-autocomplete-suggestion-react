import { useState, useEffect, useRef } from "react";
import "../styles.css";

const Searchbox = ({ bod }) => {
  const [input, setInput] = useState("");
  const [options, setOptions] = useState();
  const [showOptions, setShowOptions] = useState(false);
  // const options = ["apple"];
  const inputval = useRef();

  const handleOutsideClick = (e) => {
    if (
      !e.target.classList.contains("searchbox__results") &&
      !e.target.classList.contains("searchbox__input")
    ) {
      setShowOptions(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleOutsideClick);
    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, []);

  const fetchData = (val) => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((res) => res.json())
      .then((data) => {
        const filtered = data.filter((n) => {
          return n.name.toLowerCase().includes(val.toLowerCase());
        });
        setOptions(filtered);
      });
    // setOptions(data);
  };
  // options = options.filter((n) => {
  //   return n.toLowerCase().startsWith(input.toLowerCase());
  // });

  const handleChange = (e) => {
    setShowOptions(true);
    setInput(e.target.value);
    fetchData(e.target.value);
  };

  return (
    <div className="searchbox">
      <input
        className="searchbox__input"
        onFocus={handleChange}
        onChange={handleChange}
        placeholder="Search"
        name="searchinput"
        ref={inputval}
      />
      <div
        className={
          showOptions ? "searchbox__options active" : "searchbox__options"
        }
      >
        {showOptions &&
          options &&
          options.map((item) => {
            return (
              <div
                className="searchbox__results"
                onClick={() => {
                  console.log(item.name);
                  setInput(item.name);
                  inputval.current.value = item.name;
                  setShowOptions(false);
                }}
              >
                {item.name}
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default Searchbox;
