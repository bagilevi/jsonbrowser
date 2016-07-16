import React, { Component } from 'react';
import {observable} from 'mobx';
import {observer} from 'mobx-react';
// import DevTools from 'mobx-react-devtools';

import EntryForm from './EntryForm'
import Browser from './Browser'

@observer export default class App extends Component {
  @observable json;

  constructor(props) {
    super(props);
    this.json = this.props.document;
  }

  render() {
    return (
      <div id="main">
        <div id="entry-pane">
          <header>
            <h1>JSON Browser</h1>
          </header>
          <EntryForm onInput={this.handleInput} json={this.json}/>
          <footer>
            <div>made by: <a href="http://levente.bagi.name/" className="author">Lev</a></div>
            <div><a href="https://github.com/bagilevi/jsonbrowser">source code</a></div>
          </footer>
        </div>
        <div id="contents">
          <Browser json={this.json}/>
        </div>
        {/*<DevTools />*/}
      </div>
    );
  }
  handleInput = (json) => {
    this.json = json;
  }
}
