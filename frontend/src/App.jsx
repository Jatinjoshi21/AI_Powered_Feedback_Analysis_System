import React from 'react'
import { router } from './app.routes'
import { RouterProvider } from 'react-router'

export const App = () => {
  const router = router();
  return (
    <RouterProvider router={router}>
      <div>App</div>
    </RouterProvider>
  )
}
