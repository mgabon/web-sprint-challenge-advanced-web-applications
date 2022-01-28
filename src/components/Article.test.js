import React from 'react';
import '@testing-library/jest-dom';

import userEvent from '@testing-library/user-event';
import MutationObserver from 'mutationobserver-shim';

import Article from './Article';
import { render, screen } from '@testing-library/react';

test('renders component without errors', () => {
    render(<Article article={{ createdOn: "" }} />)
});

test('renders headline, author from the article when passed in through props', () => {
    const article = { headline: 'text', author: 'english', createdOn: '' }

    render(<Article article={article} />)
    let headline = screen.queryByTestId('headline')
    let author = screen.queryByTestId('author')

    expect(headline).toHaveTextContent('text')
    expect(author).toHaveTextContent('english')
});

test('renders "Associated Press" when no author is given', () => {
    render(<Article article={{ createdOn: "" }} />)
    let author = screen.queryByTestId('author')
    expect(author).toHaveTextContent('Associated Press')
});

test('executes handleDelete when the delete button is pressed', () => {
    const handleDelete = jest.fn()
    render(<Article handleDelete={handleDelete} article={{ createdOn: "" }} />)
    const button = screen.queryByTestId('deleteButton')
    userEvent.click(button)
    expect(handleDelete).toBeCalled();
});

//Task List:
//1. Complete all above tests. Create test article data when needed.