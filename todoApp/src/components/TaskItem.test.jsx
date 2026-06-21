import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, test, expect, vi } from 'vitest'
import TaskItem from './TaskItem'

describe('TaskItem', () => {
  test('Show the name and description', () => {
    render(
      <TaskItem
        id={1}
        name="Task 1"
        description="This is my task one"
        completed={false}
        onDelete={() => {}}
        onToggleComplete={() => {}}
      />
    )

    expect(screen.getByText('Task 1')).toBeInTheDocument()
    expect(screen.getByText('This is my task one')).toBeInTheDocument()
  })

  test('Show - when completed = true', () => {
    render(
      <TaskItem
        id={1}
        name="Task 1"
        description="desc"
        completed={true}
        onDelete={() => {}}
        onToggleComplete={() => {}}
      />
    )

    const title = screen.getByText('Task 1')
    expect(title).toHaveStyle('text-decoration: line-through')
  })

  test('Call onDelete with id when press Delete button', async () => {
    const user = userEvent.setup()
    const mockDelete = vi.fn()

    render(
      <TaskItem
        id={42}
        name="Task 1"
        description="desc"
        completed={false}
        onDelete={mockDelete}
        onToggleComplete={() => {}}
      />
    )

    await user.click(screen.getByRole('button', { name: /delete task/i }))

    expect(mockDelete).toHaveBeenCalledWith(42)
  })

  test('Call onToggleComplete when press button Complete', async () => {
    const user = userEvent.setup()
    const mockToggle = vi.fn()

    render(
      <TaskItem
        id={7}
        name="Task 1"
        description="desc"
        completed={false}
        onDelete={() => {}}
        onToggleComplete={mockToggle}
      />
    )

    await user.click(screen.getByRole('button', { name: /mark.*as complete/i }))

    expect(mockToggle).toHaveBeenCalledWith(7)
  })
})