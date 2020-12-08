import React from 'react'
import ReactDOM from 'react-dom'
import { getQueriesForElement } from '@testing-library/dom'

import { App } from '../App'

test("Renders the correct content", () => {
    // Render the React App component to DOM
    const root = document.createElement("div")
    ReactDOM.render(<App />, root)

    const { getByText, getByLabelText } = getQueriesForElement(root)

    // Use DOM APIs (querySelector) to make assertions
    // expect(root.querySelector("h1").textContent).toBe("Home")

    expect(getByText("Guest")).not.toBeNull();
    
})