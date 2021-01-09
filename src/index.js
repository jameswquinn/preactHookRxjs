import { render } from "preact";
import { useRef, useState, useEffect } from "preact/hooks";
import { useObservable } from "rxjs-hooks";
import { interval } from "rxjs";
import { map } from "rxjs/operators";
import { useTransition, config, useSpring, animated } from "react-spring";
import useMeasure from "./useMeasure";

import "./styles.css";

const slides = [
  { id: 0, url: "photo-1551989137-334bd6577da3?ixlib=rb-1.2.1&w=3450&q=80" },
  {
    id: 1,
    url:
      "photo-1501560379-05951a742668?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=3300&q=80"
  },
  { id: 2, url: "photo-1551989137-b8ad7595d020?ixlib=rb-1.2.1&w=3300&q=80" },
  {
    id: 3,
    url:
      "photo-1503058474900-cb76710f9cd1?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=3300&q=80"
  }
];

const App3 = () => {
  const [index, set] = useState(0);
  const transitions = useTransition(slides[index], (item) => item.id, {
    from: { opacity: 0, transform: "scale(1.1)" },
    enter: { opacity: 1, transform: "scale(1)" },
    leave: { opacity: 0, transform: "scale(0.9)" },
    config: config.molasses
  });
  useEffect(
    () => void setInterval(() => set((state) => (state + 1) % 4), 2000),
    []
  );
  return transitions.map(({ item, props, key }) => (
    <animated.div
      key={key}
      class="bg"
      style={{
        ...props,
        backgroundImage: `url(https://images.unsplash.com/${item.url}&auto=format&fit=crop)`
      }}
    />
  ));
};

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
  render(<App3 />, document.getElementById("root"));
}
