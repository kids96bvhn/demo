import React from "react";
import axios from "axios";
import "./App.css";

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      seen: [], 
      react: []
    };
    this.getStat = this.getStat.bind(this);
  }

  getStat() {
    var res = '';
    axios.get('http://localhost:8000/api/stat').then(response => {
      res = response.data.contents.entities;
      this.setState({
        seen: res.seen_stat,
        react: res.react_stat
      });
    });
  }

  componentDidMount() {
    this.getStat();
  }

  render() {
    const seen = this.state.seen;
    const react = this.state.react;
    let itemSeen = [];
    let itemReact = [];
    seen.forEach(element => {
      itemSeen.push(<tr><td>{element.title}</td><td>{element.count}</td></tr>);
    });
    react.forEach(element => {
      itemReact.push(<tr><td>{element.title}</td><td>{element.count}</td></tr>);
    });
    return (
      <div className="App">
        <h1>Lượt xem</h1>
        <table>
          <tr>
            <th>POST</th>
            <th>Lượt xem</th>
          </tr>
          {itemSeen}
        </table>
        <h1>Lượt tương tác</h1>
        <table>
          <tr>
            <th>POST</th>
            <th>Lượt tương tác</th>
          </tr>
          {itemReact}
        </table>
      </div>
    );
  }
}
