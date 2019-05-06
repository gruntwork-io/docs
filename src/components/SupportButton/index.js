import React from "react"

class SupportButton extends React.Component {
  render() {
    function handleClick(e) {
      e.preventDefault()
      // do something meaningful, Promises, if/else, whatever, and then
      window.location.assign("https://www.gruntwork.io/contact/")
    }

    var label = this.props.label || "Talk to a Human"

    return (
      <button class="button btn btn-outline-primary" onClick={handleClick}>
        {label}
      </button>
    )
  }
}

export default SupportButton
