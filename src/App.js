import React, { Component } from 'react';
import {observable} from 'mobx';
import {observer} from 'mobx-react';
// import DevTools from 'mobx-react-devtools';

import EntryForm from './EntryForm'
import Browser from './Browser'

@observer export default class App extends Component {
  @observable json = '{"type":"Program","body":[{"type":"ExpressionStatement","expression":{"type":"CallExpression","callee":{"type":"MemberExpression","computed":false,"object":{"type":"Identifier","name":"Object"},"property":{"type":"Identifier","name":"defineProperty"}},"arguments":[{"type":"Identifier","name":"exports"},{"type":"Literal","value":"File","raw":"\\"File\\""},{"type":"ObjectExpression","properties":[{"type":"Property","key":{"type":"Identifier","name":"enumerable"},"computed":false,"value":{"type":"Literal","value":true,"raw":"true"},"kind":"init","method":false,"shorthand":false},{"type":"Property","key":{"type":"Identifier","name":"get"},"computed":false,"value":{"type":"FunctionExpression","id":{"type":"Identifier","name":"get"},"params":[],"defaults":[],"body":{"type":"BlockStatement","body":[{"type":"ReturnStatement","argument":{"type":"MemberExpression","computed":false,"object":{"type":"CallExpression","callee":{"type":"Identifier","name":"_interopRequireDefault"},"arguments":[{"type":"Identifier","name":"_file"}]},"property":{"type":"Identifier","name":"default"}}}]},"generator":false,"expression":false},"kind":"init","method":false,"shorthand":false}]}]}}],"sourceType":"script"}';

  render() {
    return (
      <div id="main">
        <div id="entry-pane">
          <header>
            <h1>JSON Browser</h1>
          </header>
          <EntryForm onInput={this.handleInput}/>
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
