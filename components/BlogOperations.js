import React, { Component } from "react";
import "react-quill/dist/quill.snow.css";
import { firestore } from "../firebase";
import toast from "react-hot-toast";

export default class FormHtmlEditor extends Component {
  constructor(props) {
    super(props);
    if (document) {
      this.quill = require("react-quill");
    }
    this.state = {
      text: props.defaultValues.content,
      published: props.defaultValues.published,
    };
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange(value) {
    this.setState({ text: value });
  }

  //create a function to save the changes to the database
  saveBlog = () => {
    console.log(this.state);
    const { slug } = this.props.defaultValues;
    const { text, published } = this.state;
    const blogRef = firestore.collection("blogs").doc(slug);
    blogRef.update({
      content: text,
      published: published,
    });
    toast.success("Blog updated successfully");
  };

  render() {
    const Quill = this.quill;
    if (Quill) {
      return (
        <div>
          <Quill
            value={this.state.text}
            onChange={this.handleChange}
            theme="snow"
          />
          {this.state.published ? (
            <input
              type="checkbox"
              value={this.state.published}
              onChange={() =>
                this.setState({ published: !this.state.published })
              }
              checked
            />
          ) : (
            <input
              type="checkbox"
              value={this.state.published}
              onChange={() =>
                console.log(this.setState({ published: !this.state.published }))
              }
            />
          )}
          <lable>Published</lable>
          <button
            style={{
              color: "white",
              backgroundColor: "hsl(129, 76%, 42%)",
              padding: 10,
              margin: 10,
              borderRadius: 10,
              border: "none",
            }}
            onClick={this.saveBlog}
          >
            Save Changes
          </button>
        </div>
      );
    } else {
      return null;
    }
  }
}
