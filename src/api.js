
const formatUser = ( rawUser ) => {
	return {
		name: rawUser.name,
		talkUrl: rawUser.links.talk.url
	}
}

const formatPost = ( postId, data ) => {
	var post = data.revisions[ data.posts[ postId ] ]
	return {
		id: postId,
		content: post.content.content,
		user:  formatUser( post.creator ),
		ts: post.timestamp,
		replies: post.replies.map( ( postId ) => formatPost( postId, data ) )
	}
}

const formatDescription = ( rawDesc ) => {
	return {
		content: rawDesc.revision.content.content,
		user: formatUser( rawDesc.revision.author ),
		actions: rawDesc.revision.actions
	}
}

export function convert ( apiResponse ) {
	const data = apiResponse[ 'blocks' ],
		description = formatDescription( data[ 'header' ] ),
		topicList = data[ 'topiclist' ],
		topics = topicList.roots.map( ( root ) => formatPost( root, topicList ) )

	return { description: { view: description }, topics }
}

export function getHeader () {
	return new mw.Api().get( {
		action: 'flow',
		submodule: 'view-header',
		page: mw.config.get( 'wgPageName' ),
		vhformat: 'wikitext'
	} ).then( function ( response ) {
		return formatDescription( response.flow['view-header']['result']['header'] )
	} )
}
