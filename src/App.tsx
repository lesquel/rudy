import { Router, Route } from "@solidjs/router";
import Home from "./pages/Home";
import Usuarios from "./pages/Usuarios";
import Procesos from "./pages/Procesos";

const App = () => {
  return (
    <Router>
      <Route path="/" component={Home} />
      <Route path="/usuarios" component={Usuarios} />
      <Route path="/procesos" component={Procesos} />
    </Router>
  );
};

export default App;
