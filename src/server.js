import React from 'react'
import ReactDOMServer from 'react-dom/server'
import Board from './App'
import { convert } from './api'

global.renderFleactServer = function ( apiResponse, action ) {
	const board = convert( apiResponse )

	return ReactDOMServer.renderToString( 
		<Board description={board.description} topics={board.topics} />
	)
}
