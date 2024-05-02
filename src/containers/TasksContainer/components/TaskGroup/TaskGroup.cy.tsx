import React from 'react'
import TaskGroup from './TaskGroup'

describe('<TaskGroup />', () => {
  const groupData = {
    name: "General Info",
    tasks: [
      {
        description: "Add name and surname",
        value: 10,
        checked: true
      },
      {
        description: "Add email",
        value: 15,
        checked: false
      },
      {
        description: "Add linkedin profile",
        value: 8,
        checked: false
      },
      {
        description: "Provide websites page url",
        value: 5,
        checked: true
      }
    ]
  }

  it('calls handleTaskSelection with updated tasks when a task is clicked', () => {
    const handleTaskSelection = cy.stub().as('handleTaskSelection')
    cy.mount(<TaskGroup group={groupData} handleTaskSelection={handleTaskSelection} />)

    cy.get('.tasks-container__group').first().click();

    cy.get('.tasks-container__group-tasks').children().eq(1).click();

    cy.get('@handleTaskSelection').should('be.calledWithMatch', [
      {
        description: "Add name and surname",
        value: 10,
        checked: true
      },
      {
        description: "Add email",
        value: 15,
        checked: true
      },
      {
        description: "Add linkedin profile",
        value: 8,
        checked: false
      },
      {
        description: "Provide websites page url",
        value: 5,
        checked: true
      }
    ])
  })
})
