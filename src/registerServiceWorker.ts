/* eslint-disable no-console */

import { register } from 'register-service-worker'

function dispatchEvent(name: string, timeout = 8000) {
  setTimeout(() => {
    document.dispatchEvent(new Event(name))
  }, timeout)
}

interface BeforeInstallPromptEvent extends Event {
  /**
   * Returns an array of DOMString items containing the platforms on which the event was dispatched.
   * This is provided for user agents that want to present a choice of versions to the user such as,
   * for example, "web" or "play" which would allow the user to chose between a web version or
   * an Android version.
   */
  readonly platforms: Array<string>

  /**
   * Returns a Promise that resolves to a DOMString containing either "accepted" or "dismissed".
   */
  readonly userChoice: Promise<{
    outcome: 'accepted' | 'dismissed'
    platform: string
  }>

  /**
   * Allows a developer to show the install prompt at a time of their own choosing.
   * This method returns a Promise.
   */
  prompt(): Promise<void>
}

window.addEventListener('beforeinstallprompt', event => {
  const eventt: BeforeInstallPromptEvent = event as BeforeInstallPromptEvent
  // Prevent Chrome <= 67 from automatically showing the prompt
  eventt.preventDefault()
  // Show the modal add to home screen dialog
  eventt.prompt()
  eventt.userChoice.then(choice => {
    dispatchEvent(`install:${choice.outcome}`)
  })
})

if (process.env.NODE_ENV === 'production') {
  register(`${process.env.BASE_URL}service-worker.js`, {
    ready() {
      console.log(
        'App is being served from cache by a service worker.\n' +
          'For more details, visit https://goo.gl/AFskqB'
      )
    },
    cached() {
      console.log('Content has been cached for offline use.')
    },
    updatefound() {
      console.log('New content is downloading.')
    },
    updated(registration) {
      dispatchEvent('sw:update')
      dispatchEvent('sw:update', 8000 * 5)
    },
    registered(registration) {
      registration.update()
    },
    error(error) {
      dispatchEvent('sw:error')
      console.error('Error during service worker registration:', error)
    },
    offline() {
      console.log(
        'No internet connection found. App is running in offline mode.'
      )
    },
  })
}
