import React from 'react'
import t from 't'

import { until } from 'modules/format/date'
import { appVersion } from 'modules/native'
import { getBrowserName } from 'modules/browser'
import { getCurrentTheme } from 'co/style/colors'

import {
	Image, Platform
} from 'react-native'
import {
	Form,
	ScrollForm,
	SubInfoText
} from 'co/style/form'
import {
	ButtonLink
} from 'co/common/button'
import Goto from 'co/common/goto'
import Toggle from 'co/common/toggle'

const
	icon_pro = <Image source={require('assets/images/pro.png')} />,
	icon_profile = <Image source={require('assets/images/profile.png')} />,
	icon_howto = <Image source={require('assets/images/howto.png')} />,
	icon_support = <Image source={require('assets/images/support.png')} />,
	icon_darkTheme = <Image source={require('assets/images/darkTheme.png')} />,
	icon_browser = <Image source={require('assets/images/browser.png')} />

export default class Settings extends React.PureComponent {
	render() {
		const {
			theme,
			user,
			browser,
			onPro,
			onTheme,
			onProfile,
			onHowTo,
			onHelp,
			onLogout,
			onBrowser,
			onCollectionsSort
		} = this.props;

		const proStatus = until(user.proExpire)

		return (
			<ScrollForm>
				<Form first>
					<Goto
						label={t.s('upgradeAccount')}
						subLabel={proStatus}
						iconComponent={icon_pro}
						onPress={onPro} />

					<Goto last
						label={t.s('profile')}
						subLabel={user.fullName}
						iconComponent={icon_profile}
						onPress={onProfile} />
				</Form>

				<Form>
					<Goto
						label={t.s('interfaceStyle')}
						subLabel={getCurrentTheme().name}
						iconComponent={icon_darkTheme}
						onPress={onTheme} />

					<Goto last
						label={t.s('openInBrowser')}
						subLabel={getBrowserName(browser)}
						iconComponent={icon_browser}
						onPress={onBrowser} />

					<Goto
						label={t.s('collectionsSorting')}
						iconComponent={icon_darkTheme}
						onPress={onCollectionsSort} />
				</Form>

				<Form>
					<Goto
						label={t.s('howToUse')}
						iconComponent={icon_howto}
						onPress={onHowTo} />
					<Goto last
						label={t.s('support')}
						iconComponent={icon_support}
						onPress={onHelp} />
				</Form>

				<SubInfoText>Raindrop.io {appVersion} ({Platform.OS})</SubInfoText>
				<ButtonLink danger onPress={onLogout}>{t.s('logOut')}</ButtonLink>
			</ScrollForm>
		)
	}
}