import React, { Component } from 'react';
import {observable} from 'mobx';
import {observer} from 'mobx-react';
import DevTools from 'mobx-react-devtools';

import EntryForm from './EntryForm'
import Browser from './Browser'

@observer export default class App extends Component {
  @observable json = "null";

  render() {
    return (
      <div>
        <h1>JSON Browser</h1>
        <EntryForm onInput={this.handleInput}/>
        <Browser json={this.json}/>
        <DevTools />
      </div>
    );
  }
  handleInput = (json) => {
    this.json = json;
  }
}
