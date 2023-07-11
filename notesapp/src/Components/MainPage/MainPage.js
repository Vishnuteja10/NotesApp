import "./MainPage.css";
import NotesDataComponent from "../NotesDataComponent/NotesDataComponent";
import CreateNotes from "../CreateNotes/CreateNotes";
import { useState, useEffect } from "react";
import bgImage from "./bg.png";
import lockImg from "./lock.png";

function MainPage() {
  const [createNotes, setCreateNotes] = useState(false);
  const [notesData, setNotesData] = useState([]);
  const [selectedNote, setSelectedNote] = useState("");

  const [selected, setSelected] = useState(false);

  const [revertBack, setRevertBack] = useState(false);

  console.log("selectDDDDDDDDD is", selected);

  // const handleRevertBack = () => {
  //   setRevertBack(true);
  //   console.log("revert back isssssssssss", revertBack);
  // };

  const [color, setColor] = useState("");

  const [dataFromCN, setDataFromCN] = useState([]);

  const handleChildData = (value) => {
    setDataFromCN(value);
    setNotesData(value);
  };

  console.log("notes data in main", notesData);
  console.log("data from child", dataFromCN);

  let data1 = "";

  useEffect(() => {
    data1 = JSON.parse(localStorage.getItem("NotesGrpData"));
    setNotesData(data1);
    console.log("data inside notes compo", data1);
  }, []);

  function NoteComponent() {
    const handleClick = (groupName, color) => {
      console.log("Clicked on", groupName);
      setSelectedNote(groupName);
      setColor(color);
      setSelected(true);
      setRevertBack(false);
      console.log("selected node is", selectedNote);
    };
    return (
      notesData &&
      notesData.map(({ groupName, color }) => {
        const backgroundColor = { backgroundColor: color };
        const bg = {
          backgroundColor: "white",
        };
        const sel = {
          backgroundColor: "#F7ECDC",
        };
        return (
          <div
            style={
              (selected ? { display: "none" } : {},
              revertBack ? { display: "flex" } : {})
            }
            // ${createNotes ? "bb" : ""}
            className={` notes`}
            key={groupName}
            onClick={() => handleClick(groupName, color)}
          >
            <div style={backgroundColor} className={`  notesLogo`}>
              <p className={`  notesShortName`}>{groupName.slice(0, 2)}</p>
            </div>
            <div style={bg} className={` notesName`}>
              {groupName}
            </div>
          </div>
        );
      })
    );
  }

  function createNewNotes() {
    setCreateNotes((prevNotes) => !prevNotes);
  }

  const mainStyle = {
    position: `relative`,
    width: "100%",
    height: "100%",
    // backgroundColor: "rgba(0, 0, 0, 0.5)",
    zIndex: 999,
  };

  const cardStyle = {
    position: "absolute",
    top: "30vh",

    zIndex: "20",
  };

  const cardNone = {
    display: "none",
  };
  return (
    <div style={createNotes ? mainStyle : {}} className="main">
      {createNotes ? <div className="overlay"></div> : " "}
      <div style={createNotes ? cardStyle : cardNone} className="notesCard">
        <CreateNotes
          handleChildData={handleChildData}
          setCreateNotes={setCreateNotes}
        />
      </div>
      <div
        // ${revertBack ? "leftBlockB" : " "}
        className={` ${selected ? "leftBlockN" : " leftBlock "} leftBlock `}
      >
        <p className="appName">Pocket Notes</p>
        <button
          onClick={createNewNotes}
          // ${revertBack ? "createNotesBtnB" : ""}
          className={` ${
            selected ? "createNotesBtnN" : "createNotesBtn "
          } createNotesBtn`}
        >
          {" "}
          + Create Notes Group
        </button>
        <div
          // ${revertBack ? "notesListB" : "notesListN "}
          className={`${selected ? "notesListN" : "notesList "} `}
        >
          {NoteComponent()}
          {/* <NoteComponent createNotes={createNotes} /> */}
        </div>
      </div>
      <div className={`${selected ? "rightBlock" : "rightBlockN"}`}>
        {selectedNote ? (
          <NotesDataComponent
            color={color}
            selectedNote={selectedNote}
            handleRevertBack={setRevertBack}
            setSelected={setSelected}
            revertBack={revertBack}
            createNotes={createNotes}
          />
        ) : (
          <div className="rightBlockMain  rightBlockMainN">
            <img src={`${bgImage}`}></img>
            <p className="pktNotes">Pocket Notes</p>
            <p className="mainTxt">
              Send and recieve messages without keeping your phone online.{" "}
              <br></br>
              Use Pocket Notes on up to 4 linked devices and 1 mobile phone
            </p>
            <div className="footerBox">
              <img src={`${lockImg}`} className="lockImg"></img>
              <p className="ete">end-to-end encrypted</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default MainPage;
