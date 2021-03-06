import { Navigation } from 'react-native-navigation'
import { isExtension } from 'modules/native'

/*
    Most used:
        showModal(this.props, 'screen/path', {_id: 1})
        push(this.props, 'screen/path', {_id: 1})
        close(this.props)
        mergeOptions(this.props, options)
        replace(this.props, 'screen/path', {_id: 1})

    Use if only sure:
        dismissModal(this.props)
        dismissAllModals()
        pop(this.props)

    ...All other react-native-navigation methods
*/

const uber = {
    getComponent(screenName, passProps) {
        return {
            component: {
                name: screenName,
                passProps
            }
        }
    },

    async showModal({ componentId, isModal }, screenName, passProps) {
        if (isModal || await isExtension())
            return uber.push({ componentId }, screenName, passProps)
            
        return Navigation.showModal({
            stack: {
                children: [
                    uber.getComponent(screenName, {
                        ...passProps,
                        isModal: true
                    })
                ]
            }
        })
    },

    push({ componentId }, screenName, passProps) {
        return Navigation.push(componentId, uber.getComponent(screenName, passProps))
    },

    close({ componentId, isModal, isOverlay }) {
        if (isModal)
            return uber.dismissModal({ componentId })
        else if (isOverlay)
            return uber.dismissOverlay({ componentId })
        else
            return uber.pop({ componentId })
    },



    async dismissModal({ componentId }) {
        if (await isExtension())
            return require('modules/extension').close()
        else
            return Navigation.dismissModal(componentId)
    },

    async dismissAllModals() {
        return Navigation.dismissAllModals()
    },

    pop({ componentId }) {
        return Navigation.pop(componentId)
    },

    mergeOptions({ componentId }, options) {
        return Navigation.mergeOptions(componentId, options)
    },

    showOverlay({ componentId }, screenName, passProps) {
        return Navigation.showOverlay(
            uber.getComponent(screenName, {
                ...passProps,
                isOverlay: true
            })
        )
    },

    dismissOverlay({ componentId }) {
        return Navigation.dismissOverlay(componentId);
    },


    //Custom
    replace({ componentId, isModal }, screenName, passProps) {
        return uber.setStackRoot(componentId, uber.getComponent(screenName, {...passProps, isModal}))
    },



    //Proxy
    events() {
        return Navigation.events()
    },

    setDefaultOptions(props) {
        return Navigation.setDefaultOptions(props)
    },

    setRoot(props) {
        return Navigation.setRoot(props)
    },

    setStackRoot(name, props) {
        return Navigation.setStackRoot(name, props)
    },

    registerComponent(name, props) {
        return Navigation.registerComponent(name, props)
    }
}

export default uber