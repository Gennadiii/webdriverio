import fs from 'fs'
import path from 'path'
import uuidv4 from 'uuid/v4'

import logger from '@wdio/logger'

import ElementStore from './elementstore'
import { validate } from './utils'

const log = logger('remotedriver')

export default class DevToolsDriver {
    constructor (browser, pages) {
        this.commands = {}
        this.elementStore = new ElementStore()
        this.windows = new Map()
        this.activeDialog = null
        this.browser = browser

        const dir = path.resolve(__dirname, 'commands')
        const files = fs.readdirSync(dir)
        for (let filename of files) {
            const commandName = path.basename(filename, path.extname(filename))
            this.commands[commandName] = require(path.join(dir, commandName)).default
        }

        for (const page of pages) {
            const pageId = uuidv4()
            this.windows.set(pageId, page)
            this.currentWindowHandle = pageId
        }

        const page = this.windows.get(this.currentWindowHandle)
        page.on('dialog', ::this.dialogHandler)
    }

    register (commandInfo) {
        const self = this
        const { command, ref, parameters, variables = [] } = commandInfo

        /**
         * check if command is implemented
         */
        if (typeof this.commands[command] !== 'function') {
            return () => { throw new Error('Not yet implemented') }
        }

        /**
         * within here you find the webdriver scope
         */
        return async function (...args) {
            const params = validate(command, parameters, variables, ref, args)
            const result = await self.commands[command].call(self, params)

            log.info('RESULT', command.toLowerCase().includes('screenshot')
                && typeof result === 'string' && result.length > 64
                ? `${result.substr(0, 61)}...` : result)

            return result
        }
    }

    dialogHandler (dialog) {
        this.activeDialog = dialog
    }
}
