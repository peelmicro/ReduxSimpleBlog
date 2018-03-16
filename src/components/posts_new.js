import React, { Component } from "react"
import { Field, reduxForm } from "redux-form"
import { Link } from "react-router-dom"
import { connect } from "react-redux"
import { createPost } from "../actions"

class PostNew extends Component {
  renderField({ input, label, type, meta: { touched, error } }) {
    const className = `form-group ${touched && error ? "has-danger" : ""}`
    return (
      <div className={className}>
        <label>{label}</label>
        <input className="form-control" {...input} type={type} />
        {touched && error && <span className="text-help">{error}</span>}
      </div>
    )
  }

  onSubmit(values) {
    this.props.createPost(values, () => {
      this.props.history.push("/")
    })
  }

  render() {
    const { handleSubmit } = this.props

    return (
      <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
        <Field
          label="Title"
          name="title"
          component={this.renderField}
          type="input"
        />
        <Field
          label="Categories"
          name="categories"
          component={this.renderField}
          type="input"
        />
        <Field
          label="Post Content"
          name="content"
          component={this.renderField}
          type="input"
        />
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
        <Link to="/" className="btn btn-danger">
          Cancel
        </Link>
      </form>
    )
  }
}

const validate = values => {
  const errors = {}

  // validate the inputs from 'values'
  if (!values.title) {
    errors.title = "Enter a title!"
  } else if (values.title.length < 3) {
    errors.title = "Must be at least 3 characters long!"
  }
  if (!values.categories) {
    errors.categories = "Enter some categories!"
  }
  if (!values.content) {
    errors.content = "Enter some content please."
  }

  // if errors is empty, the form is fine to submit
  // if errors has *any* properties, redux form assumes form is invalid
  return errors
}

export default reduxForm({
  validate,
  form: "PostsNewForm" // It must be unique
})(connect(null, { createPost })(PostNew))
