import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'

const QuoteNavigation = (props) => {
  let element = null

  document.onkeydown = function(e) {
    switch (e.keyCode) {
        case 37:
          props.callBackPreviousQuote(props.otherQuoteId)
            break;
        case 39:
          props.callBackNextQuote(props.otherQuoteId)
            break;
    }
  }

  if (props.direction === 'previous') {
    element = (
      <Link className='link-previous' to={`/?quote=${props.otherQuoteId}`}>
        <i className='fa fa-angle-left' aria-hidden='true'><span /></i>
      </Link>
    )
  } else {
    element = (
      <Link className='link-next' to={`/?quote=${props.otherQuoteId}`}>
        <i className='fa fa-angle-right' aria-hidden='true'><span /></i>
      </Link>
    )
  }
  return element
}

export default QuoteNavigation