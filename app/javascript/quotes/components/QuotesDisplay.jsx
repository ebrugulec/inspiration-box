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
      addQuote: false,
      text: '',
      author: '',
      notification: false
    }
  
    this.handleTextChange = this.handleTextChange.bind(this)
    this.handleAuthorChange = this.handleAuthorChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleCancel = this.handleCancel.bind(this)
    this.add = this.add.bind(this)
    this.fetchQuote = this.fetchQuote.bind(this)
    fireRedirect: false
  }
  getInitialState(){
    return { addQuote: false }
  }

  _handleKeyDown (event) {
      switch( event.keyCode ) {
          case 37:
            var prev = this.state.quote.previous_id
            if(prev)
            {
              this.fetchQuote(prev)
              this.props.history.push(`/?quote=${prev}`)
            }
            break;
          case 39:
            var next = this.state.quote.next_id
            if(next){
              this.fetchQuote(next)
              this.props.history.push(`/?quote=${next}`)
            }
            break;
      }
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
    document.addEventListener("keydown", this._handleKeyDown.bind(this));
  }

  componentWillUnmount() {
    document.removeEventListener("keydown", this._handleKeyDown.bind(this));
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
          setTimeout(function() { this.setState({notification: false}); }.bind(this), 4000);
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

  add(){
    this.setState({addQuote: true});
  }
    
  render () {
    const quote = this.state.quote
    const nextQuoteId = quote.next_id
    const previousQuoteId = quote.previous_id
    const addQuote = this.state.addQuote
    const noti = this.state.notification
   
    return (
      <div className='container'>
        <div className='quote-container'>
          {this.state.fireRedirect &&
            <Redirect to={'/'} />
          }
          
          {previousQuoteId &&
            <QuoteNavigation 
              direction='previous' 
              otherQuoteId={previousQuoteId} 
              callBackPreviousQuote={this.fetchQuote}/>
          }

          <QuoteText quote={this.state.quote} />

          {nextQuoteId &&
            <QuoteNavigation 
              direction='next' 
              otherQuoteId={nextQuoteId} 
              callBackNextQuote={this.fetchQuote}/>
          }

        </div>
        
					{
						!addQuote &&
						<div className="add-quote">
							<button className="addButton" onClick={this.add} >
								Add Quote
							</button>
							<a className="button button-outline" href="export/quotes" >
								Export Quotes | CSV
							</a>
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
								<button className="button button-create" onClick={this.handleSubmit}>Create</button>
								<button className="button button-outline" onClick={this.handleCancel}>Cancel</button>
							</div>
						</div>
					}
        { 
          noti &&
          <div className="add-quote-container">
            *Kaydınız alınmıştır, lütfen kontrol edilmesini bekleyin. 
            <br/> 
            Teşekkürler ^^
          </div>
        }
              
        <div>
          {
            this.state.quote.id !== parseInt(this.props.startingQuoteId, 10) &&
            <QuoteFooter startingQuoteId={this.props.startingQuoteId} />
          }
        </div>
      </div>
    )
  }
}

export default QuotesDisplay
