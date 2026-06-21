import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, test, expect } from 'vitest'
import App from './App'

describe('App (integration)', () => {
  test('Show the todo list initially', () => {
    render(<App />)

    expect(screen.getByText('Task 1')).toBeInTheDocument()
    expect(screen.getByText('Task 2')).toBeInTheDocument()
    expect(screen.getByText('Task 3')).toBeInTheDocument()
  })

  test('Add new task and show in the list', async () => {
    const user = userEvent.setup()
    render(<App />)

    await user.type(screen.getByLabelText(/name/i), 'Buy milk')
    await user.type(screen.getByLabelText(/description/i), 'Get 2L milk')
    await user.click(screen.getByRole('button', { name: /add todo/i }))

    expect(screen.getByText('Buy milk')).toBeInTheDocument()
    expect(screen.getByText('Get 2L milk')).toBeInTheDocument()
  })

  test('Delete task after press the Delete button', async () => {
    const user = userEvent.setup()
    render(<App />)

    expect(screen.getByText('Task 1')).toBeInTheDocument()

    await user.click(
      screen.getByRole('button', { name: /delete task "task 1"/i })
    )

    expect(screen.queryByText('Task 1')).not.toBeInTheDocument()
  })

  test('Mark as complete and undo', async () => {
    const user = userEvent.setup()
    render(<App />)

    const toggleButton = screen.getByRole('button', {
      name: /mark "task 1" as complete/i,
    })

    await user.click(toggleButton)
    expect(
      screen.getByRole('button', { name: /mark "task 1" as not complete/i })
    ).toBeInTheDocument()

    await user.click(
      screen.getByRole('button', { name: /mark "task 1" as not complete/i })
    )
    expect(
      screen.getByRole('button', { name: /mark "task 1" as complete/i })
    ).toBeInTheDocument()
  })
})