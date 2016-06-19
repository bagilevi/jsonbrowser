import React, { Component } from 'react';
import {observable} from 'mobx';
import {observer} from 'mobx-react';
import DevTools from 'mobx-react-devtools';

var todos = observable(
  [
    {id: 1, author: "Pete Hunt", text: "This is one comment", hidden: false},
    {id: 2, author: "Jordan Walke", text: "This is *another* comment", hidden: false},
  ]
);
window.todos = todos;

export default class App extends Component {
  render() {
    return (
      <div>
        <h1>Hello, world!</h1>
        <CommentBox />
        <DevTools />
      </div>
    );
  }
}


@observer class CommentBox extends Component {
  handleCommentSubmit(comment) {
    comment.id = Date.now();
    comment.hidden = false;
    todos.push(comment);
  }
  render() {
    return (
      <div className="comment-box">
        <CommentList data={todos} />
        <CommentForm onCommentSubmit={this.handleCommentSubmit} />
      </div>
    )
  }
}


@observer class CommentList extends Component {
  render() {
    return (
      <div className="comment-list">
        {
          this.props.data.filter((comment) => ! comment.hidden).map((comment) => (
            <Comment comment={comment} key={comment.id} />
          ))
        }
      </div>
    )
  }
}

@observer class Comment extends Component {
  render() {
    let comment = this.props.comment;
    return (
      <div className="comment" style={{ marginBottom: '1em' }}>
        <AuthorName comment={comment}/>
        <p>{comment.text}</p>
        <small><a href="#" onClick={this.handleClick}>[hide]</a></small>
      </div>
    )
  }
  handleClick = (ev) => {
    this.props.comment.hidden = true;
  }
}

@observer class AuthorName extends Component {
  render() { return <strong>{this.props.comment.author}</strong> }
}

var CommentForm = React.createClass({
  getInitialState: function() {
    return {author: '', text: ''};
  },
  handleAuthorChange: function(e) {
    this.setState({author: e.target.value});
  },
  handleTextChange: function(e) {
    this.setState({text: e.target.value});
  },
  handleSubmit: function(e) {
    e.preventDefault();
    var author = this.state.author.trim();
    var text = this.state.text.trim();
    if (!text || !author) {
      return;
    }
    this.props.onCommentSubmit({author: author, text: text});
    this.setState({author: '', text: ''});
  },
  render() {
    return (
      <div className="comment-form" onSubmit={this.handleSubmit}>
        <form>
          <div><input name="author" size="20" value={this.state.author} onChange={this.handleAuthorChange} /></div>
          <div><input name="text"   size="20" value={this.state.text  } onChange={this.handleTextChange  } /></div>
          <div><input type="submit" /></div>
        </form>
      </div>
    )
  }
});
