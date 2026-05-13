import { render, screen } from '@testing-library/react'
import { createMemoryRouter, RouterProvider } from 'react-router'
import { describe, expect, it } from 'vitest'
import App from './App'
import Home from './pages/Home'

describe('Home 頁', () => {
  it('渲染派對主標題', () => {
    const router = createMemoryRouter(
      [
        {
          path: '/',
          element: <App />,
          children: [{ index: true, element: <Home /> }],
        },
      ],
      { initialEntries: ['/'] },
    )
    render(<RouterProvider router={router} />)
    expect(screen.getByRole('heading', { name: /訂婚派對/ })).toBeInTheDocument()
  })
})
