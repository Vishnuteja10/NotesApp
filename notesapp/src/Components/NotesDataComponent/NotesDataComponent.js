import "./NotesDataComponent.css";
import { useState, useEffect } from "react";
import image from "./send.png";
import { compose } from "redux";
import revertImg from "./revert.png";
function NotesDataComponent(props) {
  const [textareaValue, setTextareaValue] = useState("");

  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const [reverted, setReverted] = useState(false);

  const handleRevert = () => {
    props.handleRevertBack(true);
    props.setSelected(false);
    setReverted(true);
  };

  const [msg, setMsg] = useState([]);

  let currentTime;

  let notesData;

  const name = props.selectedNote.slice(0, 2);

  const currentDate = new Date();

  const formatDate = (date) => {
    const options = { day: "numeric", month: "long", year: "numeric" };
    return date.toLocaleDateString(undefined, options);
  };

  const formattedDate = formatDate(currentDate);

  const formatTime = (date) => {
    const options = { hour: "numeric", minute: "2-digit", hour12: true };
    return date.toLocaleTimeString(undefined, options);
  };

  const formattedTime = formatTime(currentDate);

  const time = formattedTime + "," + formattedDate;

  const backgroundColor = {
    backgroundColor: `${props.color}`,
  };
  useEffect(() => {
    setMsg("");
    notesData = JSON.parse(localStorage.getItem(props.selectedNote));
    console.log("extracted from browser data", notesData);
    if (notesData !== null && msg !== null) {
      setMsg(notesData);
    }
  }, [props.selectedNote]);

  const handleTextareaChange = (event) => {
    setTextareaValue(event.target.value);
  };
  function handleBtn(e) {
    e.preventDefault();
    const newData = {
      time: time,
      data: textareaValue,
    };
    let Data;
    if (msg !== null) {
      Data = [...msg, newData];
      setMsg(Data);
    } else {
      const d = newData;
      setMsg(d);
      console.log("d", d);
      localStorage.setItem(props.selectedNote, JSON.stringify(d));
    }
    if (Data !== undefined) {
      localStorage.setItem(props.selectedNote, JSON.stringify(Data));
    }
    setTextareaValue("");
  }

  const btnStyle = {
    button: {
      display:
        window.innerWidth >= 200 && window.innerWidth <= 800
          ? "inline"
          : "none",
      backgroundImage:
        window.innerWidth >= 200 && window.innerWidth <= 800
          ? `url(${revertImg})`
          : "none",
    },
  };

  return (
    <div
      className={`${props.revertBack ? `outerDivN` : ""} ${
        props.createNotes ? "bb" : ""
      } outerDiv`}
    >
      {/* ${props.createNotes ? "bb" : ""}  */}

      <div className={` notesHeading`}>
        {/* {windowWidth < 700 && ( */}
        <button
          style={btnStyle.button}
          className={`${props.revertBack ? `revertBN` : ""} revertB`}
          onClick={handleRevert}
        ></button>
        {/* )} */}

        <div
          style={backgroundColor}
          className={`${props.revertBack ? `notesLogoN` : ""}  notesLogo`}
        >
          <p
            className={`${
              props.revertBack ? `notesShortNameN` : ""
            }   notesShortName`}
          >
            {name}
          </p>
        </div>
        <div className={`${props.revertBack ? `notesNameN` : ""}  notesName`}>
          {props.selectedNote}
        </div>
      </div>
      <div className={`${props.revertBack ? `notesBlockN` : ""}  notesBlock`}>
        {msg &&
          msg.map(({ time, data }) => {
            const timeArray = time.split(",");
            return (
              <div
                className={`${props.createNotes ? "eachNotesR" : ""} eachNotes`}
              >
                {props.createNotes ? <div className="overlay"></div> : ""}
                <div className={` date`}>
                  <p className={` time`}>
                    {timeArray[0]}
                    <br></br>
                    {timeArray[1]}
                  </p>
                </div>
                <div className={` data`}>{data}</div>
              </div>
            );
          })}
      </div>

      <div className={`${props.createNotes ? "inputTextR" : ""} inputText`}>
        {props.createNotes ? <div className="overlay"> </div> : ""}
        <form>
          <textarea
            className={`${props.createNotes ? "bb" : ""} input`}
            value={textareaValue}
            placeholder="Enter your text here ...."
            onChange={handleTextareaChange}
          />
          <button
            style={{
              backgroundImage: `url(${image})`,
              backgroundRepeat: `no-repeat`,
              backgroundSize: `100% 100%`,
            }}
            onClick={handleBtn}
            className={`${props.createNotes ? "bb" : ""} sendBtn`}
          ></button>
        </form>
      </div>
    </div>
  );
}

export default NotesDataComponent;
