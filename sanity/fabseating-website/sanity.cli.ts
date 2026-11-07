import {defineCliConfig} from 'sanity/cli'

export default defineCliConfig({
  api: {
    projectId: 'n59kaaxb',
    dataset: 'production'
  },
  /**
   * Enable auto-updates for studios.
   * Learn more at https://www.sanity.io/docs/cli#auto-updates
   */
  studioHost: 'fabseating',
  deployment: {
    appId: 'rzmxfg6ey1lytoi4zjgshfiw',
    autoUpdates: true,
  },
})
