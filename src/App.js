import React, { Component } from 'react';
import {observable} from 'mobx';
import {observer} from 'mobx-react';
import DevTools from 'mobx-react-devtools';

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

class EntryForm extends Component {
  render() {
    return (
      <form className="entry-form" onSubmit={this.handleSubmit}>
        <div>
          <textarea name="json" style={{width: 600, height: 400}}/>
        </div>
        <div>
          <input type="submit"/>
        </div>
      </form>
    )
  }
  handleSubmit = (ev) => {
    ev.preventDefault();
    this.props.onInput(ev.target.elements.namedItem('json').value);
  }
}

class Browser extends Component {
  render() {
    return (
      <div className="browser">
        {this.props.json}
      </div>
    )
  }
}
