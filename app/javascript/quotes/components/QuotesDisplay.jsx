import React from 'react';
import { Redirect } from 'react-router-dom';
import queryString from 'query-string';
import axios from 'axios';
import QuoteText from './QuoteText';
import QuoteNavigation from './QuoteNavigation';
import QuoteFooter from './QuoteFooter';
import QuoteAdd from './QuoteAdd';
import AddButton from './AddButton';

class QuotesDisplay extends React.Component {
  constructor () {
    super()
    this.state = {
      quote: {},
      addQuote: false,
      text: '',
      author: '',
      notification: false
}
    this.handleTextChange = this.handleTextChange.bind(this);
    this.handleAuthorChange = this.handleAuthorChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
    this.addb = this.addb.bind(this);
    fireRedirect: false
    
  }

  getInitialState(){
    return { addQuote: false }
  }

  fetchQuote (id) {
    axios.get(`api/quotes/${id}`)
        .then(response => {
          this.setState({ quote: response.data })
        })
        .catch(error => {
          this.setState({ fireRedirect: true })
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

  handleTextChange(evt){
    this.setState({ text: evt.target.value })
  }

  handleAuthorChange(evt){
    this.setState({ author: evt.target.value })
  }

  handleChange(event) {
    console.log(event.target);
    this.setState({value: event.target.value});
  }

  handleSubmit(event) {
    var text = this.refs.quote.value;
    var author = this.refs.author.value;
    this.setState({
      text: text,
      author: author
    })

   if (text != '' && author != '') {
    const quote = {
      text: text,
      author: author
    };

    axios.post(`api/quotes/new`, { quote })
      .then(response => {
        this.setState({
          text: '',
          author: ''
        })
        this.setState({notification: true})
          setTimeout(function() { this.setState({notification: false}); }.bind(this), 5000);
        })
      .catch(error => {
        this.setState({ fireRedirect: true })
      })
        event.preventDefault();
    }
    else
      alert("Lütfen gerekli alanları doldurunuz.")
  }

  handleCancel(){
    this.setState({addQuote: false})
  }

  addb(){
    this.setState({addQuote: true});
  }
    
  render () {
    const quote = this.state.quote
    const nextQuoteId = quote.next_id
    const previousQuoteId = quote.previous_id
    const addQuote = this.state.addQuote
    const noti = this.state.notification

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
       
        {
          !addQuote &&
          <div className="add-quote">
            <button className="addButton" onClick={this.addb}>
              Add Quote
            </button>
          </div>
        }
          
        {
          addQuote && 
          <div className="add-quote">
            <div>
              <input type="text" ref="quote" placeholder="Quote.." value={this.state.text} onChange={this.handleTextChange}/>
              <br />
              <input type="text" ref="author" placeholder="Author.." value={this.state.author} onChange={this.handleAuthorChange}/>
              <br />
              <button className="submit" onClick={this.handleSubmit}>Create</button>
              <button className="submit" onClick={this.handleCancel}>Cancel</button>
            </div>
          </div>
        }
        
        { noti &&
          <div className="add-quote-container">
            *Kaydınız alınmıştır, lütfen onaylanmasını bekleyin. 
            <br/> 
            Teşekkürler ^^
          </div>
        }
              
        <div>
          {this.state.quote.id !== parseInt(this.props.startingQuoteId, 10) &&
            <QuoteFooter startingQuoteId={this.props.startingQuoteId} />
              }
        </div>
      </div>
    )
  }
}

export default QuotesDisplay