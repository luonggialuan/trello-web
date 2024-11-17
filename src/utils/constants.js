// export const API_ROOT = 'http://localhost:8017'

// console.log('🐾 ~ file: constants.js:3 ~ import.meta.env:', import.meta.env)

// 🐾 ~ file: constants.js:3 ~ import.meta.env:
// {BASE_URL: '/', MODE: 'development', DEV: true, PROD: false, SSR: false}
// BASE_URL: "/"
// DEV: true
// MODE: "development"
// PROD: false
// SSR: false

// Github issues process.env
// https://www.youtube.com/redirect?event=video_description&redir_token=QUFFLUhqa1FyQks4bzNfV00zVjYxVjVOU2pHUGoyRTl4Z3xBQ3Jtc0ttYUc5TGhzVncyektPVkxySkxwdXZWd0NEeEY1aXlxQS1USEQwOW1JVEFEUk55azB0MWllWDQ5NkZDbVlVcURCSFhsMmlWV3lDcFRwNjNQQXEtODRYSGtfd29SRG1aVjl2ZVBPRzF4ek04X3B5ckJvNA&q=https%3A%2F%2Fgithub.com%2Fvitejs%2Fvite%2Fissues%2F1973&v=N48cnnDCOp8

let apiRoot = ''
if (process.env.BUILD_MODE === 'dev') {
  apiRoot = 'http://localhost:8017'
}
if (process.env.BUILD_MODE === 'production') {
  apiRoot = 'https://trello-api-8q4b.onrender.com'
}

// console.log('🐾 ~ file: constants.js:16 ~ process.env:', process.env)
// console.log('🐾 ~ file: constants.js:4 ~ apiRoot:', apiRoot)

export const API_ROOT = apiRoot

export const DEFAULT_PAGE = 1
export const DEFAULT_ITEMS_PER_PAGE = 12

export const CARD_MEMBER_ACTIONS = {
  ADD: 'ADD',
  REMOVE: 'REMOVE'
}
