import { render } from "preact";
import { useObservable } from "rxjs-hooks";
import { interval } from "rxjs";
import { map } from "rxjs/operators";

import "./styles.css";

function App() {
  const value = useObservable(() => interval(500).pipe(map((val) => val * 3)));

  return (
    <div className="App">
      <h1>Incremental number: {value}</h1>
    </div>
  );
}

if (typeof window !== "undefined") {
  render(<App />, document.getElementById("root"));
}
