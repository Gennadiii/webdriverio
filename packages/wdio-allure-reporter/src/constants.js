const PASSED = 'passed'
const FAILED = 'failed'
const BROKEN = 'broken'
const PENDING = 'pending'
const CANCELED = 'canceled'

const testStatuses = {
    PASSED,
    FAILED,
    BROKEN,
    PENDING
}

const stepStatuses = {
    PASSED,
    FAILED,
    BROKEN,
    CANCELED
}

const events = {
    addFeature: 'allure:addFeature',
    addStory: 'allure:addStory',
    addSeverity: 'allure:addSeverity',
    addIssue: 'allure:addIssue',
    addTestId: 'allure:addTestId',
    addEnvironment: 'allure:addEnvironment',
    addDescription: 'allure:addDescription',
    addAttachment: 'allure:addAttachment',
    startStep: 'allure:startStep',
    endStep: 'allure:endStep',
    addStep: 'allure:addStep',
    addArgument: 'allure:addArgument'
}

const mochaEachHooks = ['"before each" hook', '"after each" hook']
const mochaAllHooks = ['"before all" hook', '"after all" hook']

export { testStatuses, stepStatuses, events, mochaEachHooks, mochaAllHooks }
