import React from 'react'
import ReactDOM from 'react-dom';
import { getQueriesForElement } from '@testing-library/dom';
import { render, fireEvent, waitFor, screen } from '@testing-library/react'

import App from '../App'

test("Renders the correct content", () => {
    // Render the React App component to DOM
    const root = document.createElement("div")
    ReactDOM.render(<App />, root)

    const { getByText, getByLabelText } = getQueriesForElement(root)

    // Use DOM APIs (querySelector) to make assertions
    // Testing landing page, user not logged in
    expect(root.querySelector("p").textContent).toBe("Welcome Guest")
    expect(getByText("Who are we?")).not.toBe(null)
    expect(getByText("What we offer?")).not.toBe(null)
    expect(getByText("Where to find us")).not.toBe(null)

    expect(root.querySelector("header")).not.toBe(null)
    // Should not have an Admin or logout link if guest is not signed in
    expect(root.querySelector("span").title).not.toBe("Admin")
    expect(root.querySelector("span").textContent).not.toBe("Logout")
    expect(root.querySelector("span").title).not.toBe("Login")
    expect(root.querySelector("button").textContent).toBe("Register")
})
