import React from 'react'
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom'
import QuotesDisplay from './QuotesDisplay'

const App = (props) => (
  <div>
		<Router startingQuoteId={props.startingQuoteId}>
			<Route
				path='/'
				startingQuoteId={props.startingQuoteId}
				render={(routeProps) => <QuotesDisplay {...props} {...routeProps} />}
			/>
		</Router>
	</div>
)

export default App
