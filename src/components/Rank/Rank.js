import React, { Component } from 'react';

class Rank extends Component {
  constructor() {
    super()
    this.state = {
      emoji: ''
    }
  }

  componentDidMount() {
    this.generateEmoji(this.props.entries);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.entries === this.props.entries) {
      return null
    }
    this.generateEmoji(this.props.entries)
  }

  generateEmoji = (count) => {
    fetch(`https://l56p8j01ie.execute-api.us-east-1.amazonaws.com/prod/rank?rank=${count}`)
      .then(response => response.json())
      .then(data => this.setState({emoji: data.input}))
      .catch(console.log)
  }

  render() {
    const { name, entries } = this.props;
    return (
      <div>
        <div className='white f3'>
          {`${name}, your current entry count is...`}
        </div>
        <div className='white f1'>
          {entries}
        </div>
        <div className= 'white f3'>
          {`Rank badge: ${this.state.emoji}`}
        </div>
      </div>
    );
  }
}

export default Rank;
