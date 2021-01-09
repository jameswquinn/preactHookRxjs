import { render } from "preact";
import { useRef, useState, useEffect } from "preact/hooks";
import { useObservable } from "rxjs-hooks";
import { interval } from "rxjs";
import { map } from "rxjs/operators";
import { useSpring, animated } from "react-spring";
import useMeasure from "./useMeasure";

import "./styles.css";

function App2() {
  const [open, toggle] = useState(false);
  const [bind, { width }] = useMeasure();
  const props = useSpring({
    width: open ? width : 0,
    backgroundColor: open ? "hotpink" : "turquoise",
    config: { duration: 1000 }
  });

  return (
    <div {...bind} class="main" onClick={() => toggle(!open)}>
      <animated.div class="fill" style={props} />
      <animated.div class="content">
        {props.width.interpolate((x) =>
          Math.floor((x.toFixed(0) * 100) / width)
        )}
      </animated.div>
    </div>
  );
}

function App() {
  const value = useObservable(() => interval(500).pipe(map((val) => val * 3)));

  return (
    <div className="App">
      <h1>Incremental number: {value}</h1>
    </div>
  );
}

if (typeof window !== "undefined") {
  render(<App2 />, document.getElementById("root"));
}
