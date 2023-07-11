import { useState, useEffect } from "react";
import "./CreateNotes.css";

function CreateNotes(props) {
  const [input, setInput] = useState("");
  const [notes, setNotes] = useState([]);

  const [c1, setC1] = useState(false);
  const [c2, setC2] = useState(false);
  const [c3, setC3] = useState(false);
  const [c4, setC4] = useState(false);
  const [c5, setC5] = useState(false);
  const [c6, setC6] = useState(false);

  console.log("notes is", notes);

  let data1;
  useEffect(() => {
    data1 = JSON.parse(localStorage.getItem("NotesGrpData"));
    // if (data1) {
    //   localStorage.setItem("NotesGrpData", JSON.stringify(data1));
    // }
    const note = [data1];
    setNotes(...note);
    console.log("note vallllllll", note);
    console.log("data inside create notes", data1);
  }, []);

  const handleInput = (event) => {
    setInput(event.target.value);
  };

  function handleCreate() {
    if (input.trim() !== "") {
      if (c1 || c2 || c3 || c4 || c5 || c6) {
        const newNotesGroup = {
          groupName: input,
          color: c1
            ? "#CCCCCC;"
            : c2
            ? "#FF79F2"
            : c3
            ? "#43E6FC"
            : c4
            ? "#F19576"
            : c5
            ? "#0047FF"
            : "#6691FF",
        };

        let updatedNotes;

        if (notes == null) {
          updatedNotes = [newNotesGroup];
          setNotes(updatedNotes);
          setInput("");
        } else {
          updatedNotes = [...notes, newNotesGroup];
          setNotes(updatedNotes);
          setInput("");
        }
        localStorage.setItem("NotesGrpData", JSON.stringify(updatedNotes));
        props.handleChildData(updatedNotes);
        props.setCreateNotes(false);
      }
    }
  }

  console.log("inside create notes is", notes);

  function handleC1() {
    setC1(true);
    setC2(false);
    setC3(false);
    setC4(false);
    setC5(false);
    setC6(false);
  }

  function handleC2() {
    setC2(true);
    setC1(false);
    setC3(false);
    setC4(false);
    setC5(false);
    setC6(false);
  }

  function handleC3() {
    setC3(true);
    setC1(false);
    setC2(false);
    setC4(false);
    setC5(false);
    setC6(false);
  }

  function handleC4() {
    setC4(true);
    setC1(false);
    setC2(false);
    setC3(false);
    setC5(false);
    setC6(false);
  }

  function handleC5() {
    setC5(true);
    setC1(false);
    setC2(false);
    setC3(false);
    setC4(false);
    setC6(false);
  }

  function handleC6() {
    setC6(true);
    setC1(false);
    setC2(false);
    setC3(false);
    setC4(false);
    setC5(false);
  }

  return (
    <div className="createNotes">
      <p className="createNewNotes">Create New Notes Group</p>
      <div className="grpNameBox">
        <div className="grpName">Group name</div>
        <input
          className="ip"
          type="text"
          placeholder="  Enter your group name"
          value={input}
          onChange={handleInput}
        />
      </div>

      <div className="setColor">
        <div className="chooseColor">Choose Colour</div>
        <div className="colors">
          <div onClick={handleC1} className="c1"></div>
          <div onClick={handleC2} className="c2"></div>
          <div onClick={handleC3} className="c3"></div>
          <div onClick={handleC4} className="c4"></div>
          <div onClick={handleC5} className="c5"></div>
          <div onClick={handleC6} className="c6"></div>
        </div>
      </div>
      <button onClick={handleCreate} className="createBtn">
        Create
      </button>
    </div>
  );
}

export default CreateNotes;
