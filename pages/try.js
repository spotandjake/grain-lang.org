import { useState, useRef } from 'react';
import Nav from "../components/nav";
import Button from "../components/button";
import Editor from '../components/editor';
import Console from '../components/console';

function Playground() {
  const editorRef = useRef(null);
  const [stdout, setStdout] = useState([]);
  function runCode() {
    // Clear Console
    setStdout([]);
    // Get Value
    const editorValue = editorRef.current.getValue();
    console.log(editorValue);
    // TODO: Compile
    setStdout((oldVal) => [...oldVal, '$ Building...']);
    setStdout((oldVal) => [...oldVal, '$ Completed in 1.13 seconds']);
    // TODO: Run
    setStdout((oldVal) => [...oldVal, '$ Output:']);
    setStdout((oldVal) => [...oldVal, 'Hello World']);
    setStdout((oldVal) => [...oldVal, 'Hello World']);
    setStdout((oldVal) => [...oldVal, 'test']);
  }
  return (
    <div className="flex flex-col h-screen">
      {/* TODO: Mobile UI */}
      <Nav />
      {/* PlayGround ToolBar */}
      <div className="bg-gray-20 h-16 px-16 py-2 flex">
        {/* Run Button */}
        <Button onClick={runCode} >
          {/* TODO: Perfect me */}
          <span className="px-8">Run</span>
        </Button>
        {/* Right Side Links */}
        <ul className="flex ml-auto my-auto">
          {/* TODO: Perfect Positioning */}
          <li>
            <button><span>Share</span></button>
          </li>
          <li>
            <button><span>Settings</span></button>
          </li>
          <li>
            <button><span>Something</span></button>
          </li>
        </ul>
      </div>
      {/* Editor Grid */}
      <div className="grid grid-cols-2 grow">
        {/* Editor */}
        <Editor editorRef={editorRef}/>
        {/* Console */}
        <Console output={stdout}/>
      </div>
    </div>
  );
}

export default Playground;
