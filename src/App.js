import React from "react"; 
import ReactDOM from "react-dom/client";
import Header from "./components/Header";
import Body from "./components/Body";
//import About from "./components/About";


const AppLayout = () => {
        return (
        <div className="app">
                <Header/>
                <Body />
        </div>
        );
};

const root=ReactDOM.createRoot(document.getElementById("root"));

root.render(<AppLayout/>);

























































// const heading = React.createElement("h1", {}, "Hello world form React");

//         const root=ReactDOM.createRoot(document.getElementById("root"));

//         root.render(heading);


/*
<div id="parent">
     <div id="child1">
         <h1>i am h1 tag</h1>
         <h2>i am h2 tag</h2>
         </div>
     <div id="child2">
         <h1>i am h1 tag</h1>
         <h2>i am h2 tag</h2>
         </div>    
</div>         

*/ 

