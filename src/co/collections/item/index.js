import React from 'react'
import Navigation from 'modules/navigation'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as collectionsActions from 'data/actions/collections'
import { collection } from 'data/selectors/collections'

import View from './view'
import SwipeableContainer from 'co/common/swipeable'

const buttons = [
	{name: 'add', icon: require('assets/images/addCollection.png')},
	{name: 'more', icon: require('assets/images/edit.png')},
	{name: 'remove', icon: require('assets/images/remove.png'), danger: true}
]
const buttonsEmpty = []

class CollectionItemContainer extends React.Component {
	onItemTap = ()=>{
		this.props.onItemTap(this.props.item)
	}

	onToggle = ()=>{
		this.props.actions.collections.oneToggle(this.props.item._id)
	}

	onActionPress = (name)=>{
		switch(name){
			case 'more':
				Navigation.showModal(this.props, 'collection/edit', this.props.item)
			break

			case 'add':
				this.props.onAdd(this.props.item._id)
			break

			case 'remove':
				Navigation.showModal(this.props, 'collection/remove', this.props.item)
			break
		}
	}

	render() {
		return (
			<SwipeableContainer buttons={this.props.item._id>0?buttons:buttonsEmpty} onPress={this.onActionPress}>
				<View
					{...this.props}
					onItemTap={this.onItemTap}
					onToggle={this.onToggle}
					/>
			</SwipeableContainer>
		)
	}
}

export default connect(
	(state, { collectionId })=>({
		item: collection(state, collectionId),
		color: state.collections.colors[collectionId]
	}),
	(dispatch)=>({
		actions: {
			collections: bindActionCreators(collectionsActions, dispatch)
		}
	})
)(CollectionItemContainer)