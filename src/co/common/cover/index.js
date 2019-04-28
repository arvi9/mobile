import React from 'react'
import { getColorForString } from 'data/helpers/colors'
import {CoverImage} from './style'

export default class Cover extends React.PureComponent {
	constructor(props) {
		super(props)
		this.state = this.prepareState(props)
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.src != this.props.src || nextProps.images != this.props.images)
			this.setState(this.prepareState(nextProps))
	}

	prepareState(props) {
		var state = {}

		if (props.src)
			state.source = {uri: props.src}
		else if (props.images){
			switch(props.size) {
				case 'simple':
				case 'list':
					if (props.images.small)
						state.source = {uri: props.images.small}
					break;

				case 'grid': 
					if (props.images.medium)
						state.source = {uri: props.images.medium}
					break;
			}
		}

		return state
	}

	onError = ()=>{
		this.setState({fallbackColor: getColorForString(this.props.domain||'')+'40'})
	}

	render() {
		return (
			<CoverImage 
				source={this.state.source}
				size={this.props.size}
				fallbackColor={this.state.fallbackColor}
				style={this.props.style}
				onError={this.onError} />
		)
	}
}