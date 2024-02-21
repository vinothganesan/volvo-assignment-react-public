import React from "react";
import { Switch, Route } from "react-router-dom";
import "./App.css";
import { View, Logo, Spacer } from "vcc-ui";
import Home from "./views/Home";
import Learn from "./views/Learn";
import Shop from "./views/Shop"; 

function App() {
  return (
    <div className="App">
      <header>
        <View
          extend={({ theme }) => ({
            background: theme.color.background.primary,
            height: "auto",
            width: "100vw",
            justifyContent: "center",
          })}
        >
          <Spacer size={2} />
          <Logo type="spreadmark" height={12} />
          <Spacer size={2} />
        </View>
      </header>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/learn:id" component={Learn} />
        <Route path="/shop:id" component={Shop} />
      </Switch>
    </div>
  );
}

export default App;
