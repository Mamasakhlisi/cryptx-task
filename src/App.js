import React, { useState } from "react";
import MyTree from "./components/Tree/MyTree";
import CreateModal from "./components/Tree/CreateModal";

function App() {
  return (
    <div className="App">
      <CreateModal />
      <MyTree />
    </div>
  );
}

export default App;
