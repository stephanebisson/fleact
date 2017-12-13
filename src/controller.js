import initStore from './store'
import { getHeader } from './api'

export default class Controller {
	constructor( state ) {
		this.store = initStore( state )
	}

	getState() {
		return this.store.getState()
	}

	onStateChange( callback ) {
		this.store.subscribe( () => callback( this.store.getState() ) )
	}

	editHeaderPrepare() {
		this.store.dispatch( { type: 'edit-header-prepare' } )
		getHeader().then(
			( description ) => {
				this.store.dispatch( { type: 'edit-header-ready', description } )
			}
		)
	}

	editHeaderCancel() {
		this.store.dispatch( { type: 'edit-header-cancel' } )
	}

	editHeaderSave( { content } ) {
		console.log( 'saving content as', content );
	}
}
