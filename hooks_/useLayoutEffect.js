// ======================================================
// useLayoutEffect
// ======================================================

// useLayoutEffect runs AFTER React updates the DOM
// but BEFORE the browser displays/paints the updated UI.
//
// Main use:
// → Measure layout (height, width, position)
// → Make layout changes before user sees them
//
// Easy visualization:
//
// React updates DOM
//       ↓
// useLayoutEffect
//       ↓
// Browser displays UI
//       ↓
// useEffect


import { useLayoutEffect, useRef, useState } from "react";

function App() {

  const [toggle, setToggle] = useState(false);

  // useRef → gives us access to the element
  const textRef = useRef(null);


  useLayoutEffect(() => {

    // DOM is already updated,
    // so now we can measure the element

    const dimension =
      textRef.current.getBoundingClientRect();

    console.log("Height:", dimension.height);
    console.log("Width:", dimension.width);

    // Example:
    // We can also change the layout here
    // before the user sees the UI.

  }, [toggle]);


  return (
    <>

      <button onClick={() => setToggle(!toggle)}>
        Toggle
      </button>

      {/* React updates this element in the DOM */}
      <p ref={textRef}>
        Hi, Welcome to React!
      </p>

    </>
  );
}