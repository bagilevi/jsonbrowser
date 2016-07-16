import React, { Component } from 'react';
import {observable} from 'mobx';
import {observer} from 'mobx-react';
import $ from "jquery";

// import DevTools from 'mobx-react-devtools';

import EntryForm from './EntryForm'
import Browser from './Browser'
import Share from './Share'

@observer export default class App extends Component {
  @observable json;
  @observable url;

  constructor(props) {
    super(props);
    this.json = this.props.document;
    if (location.pathname != '/') {
      this.url = location.href;
    }
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
        <Share json={this.json} url={this.url} onUrlReady={this.handleUrl}/>
        {/*<DevTools />*/}
      </div>
    );
  }
  handleInput = (json) => {
    this.json = json;
    this.url = undefined;

    // User changes JSON while on /documents/abcd => clear the path
    if (window.location.pathname != '/') {
      history.pushState(null, null, '/');
      window.onpopstate = function(event) {
        window.location.reload();
      };
    }
  }
  handleUrl = (url) => {
    this.url = url;
    $('#share-url-field').select();
  }
}
