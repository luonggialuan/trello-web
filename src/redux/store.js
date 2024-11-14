// Redux: State management tool
import { configureStore } from '@reduxjs/toolkit'
import { activeBoardReducer } from './activeBoard/activeBoardSlice'
import { userReducer } from './user/userSlice'
// https://www.npmjs.com/package/redux-persist
import { combineReducers } from 'redux'
import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web
import { activeCardReducer } from './activeCard/activeCardSlice'
import { notificationReducer } from './notifications/notificationsSlice'

const rootPersistConfig = {
  key: 'root',
  storage: storage,
  whitelist: ['user'] // định nghĩa các slice ĐƯỢC PHÉP duy trì qua mỗi lần f5 trình duyệt
  // blacklist: []
}

// Combine các reducers
const reducers = combineReducers({
  user: userReducer,
  activeBoard: activeBoardReducer,
  activeCard: activeCardReducer,
  notifications: notificationReducer
})

// persist Reducer
const persistedReducers = persistReducer(rootPersistConfig, reducers)

export const store = configureStore({
  reducer: persistedReducers,
  // https://redux-toolkit.js.org/usage/usage-guide#working-with-non-serializable-data
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false
    })
})
