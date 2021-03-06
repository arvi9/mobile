import React from 'react'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as bookmarksActions from 'data/actions/bookmarks'
import { makeStatusMain, makeSearchEmpty } from 'data/selectors/bookmarks'

import View from './view'
import LoadingView from 'co/common/loadingView'

class SpaceEmptyContainer extends React.Component {
	onRefresh = ()=>{
		this.props.actions.refresh(this.props.spaceId)
	}

	render() {
		const isLoading = (this.props.status=='idle' || this.props.status=='loading')

		return (
			<LoadingView loading={isLoading}>
				<View 
					spaceId={this.props.spaceId}
					status={this.props.status}
					searchEmpty={this.props.searchEmpty}
					onRefresh={this.onRefresh}
					componentId={this.props.componentId} />
			</LoadingView>
		)
	}
}

const makeMapStateToProps = () => {
	const 
		getStatusMain = makeStatusMain(),
		getSearchEmpty = makeSearchEmpty()

	const mapStateToProps = (state, {spaceId})=>{
		return {
			status: getStatusMain(state, spaceId),
			searchEmpty: getSearchEmpty(state, spaceId)
		}
	}

	return mapStateToProps
}

export default connect(
	makeMapStateToProps,
	(dispatch)=>({
		actions: bindActionCreators(bookmarksActions, dispatch)
	})
)(SpaceEmptyContainer)