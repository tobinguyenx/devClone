import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, test, expect, vi } from 'vitest'
import AddTodoForm from './AddTodoForm'

describe('AddTodoForm', () => {
  test('Call onAdd with the name and description when type full', async () => {
    const user = userEvent.setup()
    const mockAdd = vi.fn()

    render(<AddTodoForm onAdd={mockAdd} />)

    await user.type(screen.getByLabelText(/name/i), 'Buy milk')
    await user.type(screen.getByLabelText(/description/i), 'Get 2L milk')
    await user.click(screen.getByRole('button', { name: /add todo/i }))

    expect(mockAdd).toHaveBeenCalledWith({
      name: 'Buy milk',
      description: 'Get 2L milk',
    })
  })

  test('Delete input after submitting successfully', async () => {
    const user = userEvent.setup()

    render(<AddTodoForm onAdd={() => {}} />)

    const nameInput = screen.getByLabelText(/name/i)
    const descInput = screen.getByLabelText(/description/i)

    await user.type(nameInput, 'Buy milk')
    await user.type(descInput, 'Get 2L milk')
    await user.click(screen.getByRole('button', { name: /add todo/i }))

    expect(nameInput).toHaveValue('')
    expect(descInput).toHaveValue('')
  })

  test('Show the error and do not call onAdd when submit input empty', async () => {
    const user = userEvent.setup()
    const mockAdd = vi.fn()

    render(<AddTodoForm onAdd={mockAdd} />)

    await user.click(screen.getByRole('button', { name: /add todo/i }))

    expect(screen.getByRole('alert')).toBeInTheDocument()
    expect(mockAdd).not.toHaveBeenCalled()
  })

  test('Show the error when just type the backspace', async () => {
    const user = userEvent.setup()
    const mockAdd = vi.fn()

    render(<AddTodoForm onAdd={mockAdd} />)

    await user.type(screen.getByLabelText(/name/i), '   ')
    await user.type(screen.getByLabelText(/description/i), '   ')
    await user.click(screen.getByRole('button', { name: /add todo/i }))

    expect(screen.getByRole('alert')).toBeInTheDocument()
    expect(mockAdd).not.toHaveBeenCalled()
  })
})