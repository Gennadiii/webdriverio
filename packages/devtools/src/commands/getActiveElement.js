import findElement from './findElement'
import command from '../scripts/getActiveElement'
import cleanUp from '../scripts/cleanUpSerializationSelector'
import { SERIALIZE_PROPERTY } from '../constants'

export default async function getActiveElement () {
    const page = this.windows.get(this.currentWindowHandle)
    const selector = `[${SERIALIZE_PROPERTY}]`

    /**
     * set data property to active element to allow to query for it
     */
    const hasElem = await page.$eval('html', command, SERIALIZE_PROPERTY)

    if (!hasElem) {
        throw new Error('no element active')
    }

    /**
     * query for element
     */
    const activeElement = await findElement.call(this, {
        using: 'css selector',
        value: selector
    })

    /**
     * clean up data property
     */
    await page.$eval(selector, cleanUp, SERIALIZE_PROPERTY)

    return activeElement
}
