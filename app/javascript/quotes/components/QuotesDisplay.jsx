import React from 'react';
import { Redirect } from 'react-router-dom';
import queryString from 'query-string';
import axios from 'axios';
import QuoteText from './QuoteText';
import QuoteNavigation from './QuoteNavigation';
import QuoteFooter from './QuoteFooter';
import QuoteAdd from './QuoteAdd';

class QuotesDisplay extends React.Component {
  constructor () {
    super()
    this.state = {
      quote: {},
      value: ''
}
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
     /* fireRedirect: false*/
    
  }

  fetchQuote (id) {
    axios.get(`api/quotes/${id}`)
        .then(response => {
          this.setState({ quote: response.data })
        })
        .catch(error => {
          console.error(error)
          /*this.setState({ fireRedirect: true })*/
        })
  }

  setQuoteIdFromQueryString (qs) {
    this.qsParams = queryString.parse(qs)
    if (this.qsParams.quote) {
      this.quoteId = Number(this.qsParams.quote)
    } else {
      this.quoteId = this.props.startingQuoteId
      this.props.history.push(`/?quote=${this.quoteId}`)
    }
  }

  componentDidMount () {
    this.setQuoteIdFromQueryString(this.props.location.search)
    this.fetchQuote(this.quoteId)
  }

  componentWillReceiveProps (nextProps) {
    
    this.setQuoteIdFromQueryString(nextProps.location.search)
    this.fetchQuote(this.quoteId)
  }


  handleChange(event) {
    console.log(event.target);
     axios.get(`api/quotes/new/${event.target.value}`)
        .then(response => {
          this.setState({ quote: response.data })
        })
        .catch(error => {
          console.error(error)
          /*this.setState({ fireRedirect: true })*/
        })
    this.setState({value: event.target.value});
  }

  handleSubmit(event) {
    alert('A name was submitted: ' + this.state.value);
    event.preventDefault();
  }

  render () {
    const quote = this.state.quote
    const nextQuoteId = quote.next_id
    const previousQuoteId = quote.previous_id

    return (
      <div>
        <div className='quote-container'>
          {this.state.fireRedirect &&
          <Redirect to={'/'} />
            }
          {previousQuoteId &&
          <QuoteNavigation direction='previous' otherQuoteId={previousQuoteId} />
            }
          <QuoteText quote={this.state.quote} />
          {nextQuoteId &&
          <QuoteNavigation direction='next' otherQuoteId={nextQuoteId} />
            }
        </div>
        {this.state.quote.id !== parseInt(this.props.startingQuoteId, 10) &&
        <QuoteFooter startingQuoteId={this.props.startingQuoteId} />
          }
          <form onSubmit={this.handleSubmit}>
        <label>
          Name:
          <input type="text" value={this.state.value} onChange={this.handleChange} />
        </label>
        <input type="submit" value="Submit" />
      </form>
      </div>
    )
  }
}

export default QuotesDisplay