const API_URL = 'https://www.arkabahcemiz.com.tr/api/Book';

export const getBooks = async () => {
    try {
        const response = await fetch(API_URL);
        if (!response.ok) throw new Error('Failed to fetch books');
        return await response.json();
    } catch (error) {
        throw error;
    }
};

export const addBook = async (book) => {
    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(book),
        });
        if (!response.ok) throw new Error('Failed to add book');
        return await response.json();
    } catch (error) {
        throw error;
    }
};

export const updateBook = async (id, book) => {
    try {
        const response = await fetch(`${API_URL}/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(book),
        });
        if (!response.ok) throw new Error('Failed to update book');
        return await response.json();
    } catch (error) {
        throw error;
    }
};

export const deleteBook = async (id) => {
    try {
        const response = await fetch(`${API_URL}/${id}`, {
            method: 'DELETE',
        });
        if (!response.ok) throw new Error('Failed to delete book');
        return await response.json();
    } catch (error) {
        throw error;
    }
};
