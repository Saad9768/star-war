import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import CardComponent from '../card-component';
import { fetchAssets } from '../../services/asset-service';
import { mapKeyForUrl } from '../../mapping';

jest.mock('../../services/asset-service');
jest.mock('../../mapping');

const mockedNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockedNavigate,
    useLocation: () => ({
        pathname: '/some-path',
    }),
}));

describe('CardComponent', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('renders loading state initially', () => {
        fetchAssets.mockResolvedValueOnce([]);
        mapKeyForUrl.mockReturnValueOnce([]);

        render(<CardComponent />);

        expect(screen.getByText('Loading...')).toBeInTheDocument();
    });

    test('renders error state on fetch failure', async () => {
        fetchAssets.mockRejectedValueOnce(new Error('Fetch error'));
        mapKeyForUrl.mockReturnValueOnce([]);

        render(<CardComponent />);

        await waitFor(() => expect(screen.getByText('Error: Fetch error')).toBeInTheDocument());
    });

    test('renders data correctly when fetch is successful', async () => {
        const mockData = [{ name: 'Luke Skywalker', url: '/people/1/' }];
        fetchAssets.mockResolvedValueOnce({ results: mockData });
        mapKeyForUrl.mockReturnValueOnce([{ key: 'name', val: 'Name' }]);

        render(<CardComponent />);

        await waitFor(() => expect(screen.getByText('Luke Skywalker')).toBeInTheDocument());
    });

    test('navigates to the correct URL on card click', async () => {
        const mockData = [{ name: 'Luke Skywalker', url: '/people/1/' }];
        fetchAssets.mockResolvedValueOnce({ results: mockData });
        mapKeyForUrl.mockReturnValueOnce([{ key: 'name', val: 'Name' }]);

        render(<CardComponent />);

        await waitFor(() => expect(screen.getByText('Luke Skywalker')).toBeInTheDocument());

        screen.getByText('Luke Skywalker').click();
        expect(mockedNavigate).toHaveBeenCalledWith('/people/1/');
    });
});
