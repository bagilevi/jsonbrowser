import React, { Component } from 'react';
import $ from "jquery";

export default class Share extends Component {
  render() {
    if (this.props.url) {
      return (
        <div id="share">
          <div id="share-url-container">
            <input id="share-url-field" type="text" defaultValue={this.props.url} />
          </div>
        </div>
      );
    } else {
      return (
        <div id="share">
          <button id="share-button" onClick={this.handleShare.bind(this)}>Share</button>
        </div>
      );
    }
  }
  handleShare = () => {
    $.ajax({
      type: "POST",
      url: "/documents?return=json",
      contentType: 'application/json',
      data: this.props.json,
      success: (response) => {
        var url = window.location.protocol + "//" + window.location.host + response.path;
        console.log("Response: ", response, url);
        this.props.onUrlReady(url);
      },
      dataType: 'json'
    })
  }
}
