// // Source - https://stackoverflow.com/q
// // Posted by Kos-Mos, modified by community. See post 'Timeline' for change history
// // Retrieved 2026-01-19, License - CC BY-SA 4.0

// import {
//   persistStore,
//   persistReducer,
//   FLUSH,
//   REHYDRATE,
//   PAUSE,
//   PERSIST,
//   PURGE,
//   REGISTER,
// } from 'redux-persist'
// import storage from 'redux-persist/lib/storage'
// import { configureStore, combineReducers } from '@reduxjs/toolkit'
// import {userReducer} from "@/app/lib/features/slice/slice";

// const combinedReducers = combineReducers({
//   user: userReducer,
// })

// const persistedReducer = persistReducer(
//   {
//       key: 'root',
//       storage,
//       whitelist: ['user'],
//   },
//   combinedReducers
// )

// export const makeStore = () => {
//   return configureStore({
//     reducer: persistedReducer,
//     middleware: (getDefaultMiddleware) =>
//         getDefaultMiddleware({
//             serializableCheck: {
//                 ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
//             },
//         }),
//   })
// }

// export const persistor = persistStore(makeStore)

// export type AppStore = ReturnType<typeof makeStore>
// export type RootState = ReturnType<AppStore['getState']>
// export type AppDispatch = AppStore['dispatch']
