import React from 'react';
import '@testing-library/jest-dom';
import {
    act,
    fireEvent,
    render,
    screen,
    waitFor,
} from '@testing-library/react';
import { User_Data } from '../../../context/UserContext';
import { jest, describe, expect, test, beforeEach } from '@jest/globals';
import LoanResponse from '../LoanResponse';
import { getScore } from './../../../app/api/MockApi';

jest.mock('./../../../app/api/MockApi', () => ({
    getScore: jest.fn(() => Promise.resolve()),
}));

const mockPush = jest.fn();
jest.mock('next/router', () => ({
    useRouter: () => ({
        push: () => {
            mockPush();
        },
    }),
}));

act(() => ({
    setLoading: () => {
        jest.mockImplementation();
    },
    setStatus: () => {
        jest.mockImplementation();
    },
}));

jest.fn().mockImplementation(() => Promise.resolve());

describe('LoanResponse Component', () => {
    const userContextValue = {
        userName: 'John Doe',
        userIncome: 50000,
        userEmail: 'john.doe@example.com',
    };

    beforeEach(() => {
        localStorage.clear();
        jest.clearAllMocks();
    });

    test('deve mostrar a tela carregando inicialmente', async () => {
        render(
            <User_Data.Provider value={userContextValue}>
                <LoanResponse />
            </User_Data.Provider>,
        );

        expect(screen.getByTestId('text-wait')).toBeInTheDocument();
        expect(screen.getByTestId('circular-progress')).toBeInTheDocument();
    });

    test('deve mostrar o component ApprovedRequest quando o status é APPROVED', async () => {
        getScore.mockResolvedValueOnce({ status: 'APPROVED' });

        render(
            <User_Data.Provider value={userContextValue}>
                <LoanResponse />
            </User_Data.Provider>,
        );

        await waitFor(() => {
            expect(getScore).toHaveBeenCalledWith({ income: 50000 });
        });

        expect(screen.getByTestId('approved-response')).toBeInTheDocument();
    });

    test('deve mostrar o component DeniedRequest quando o status é DENIED', async () => {
        getScore.mockResolvedValueOnce({ status: 'DENIED' });

        render(
            <User_Data.Provider value={userContextValue}>
                <LoanResponse />
            </User_Data.Provider>,
        );

        await waitFor(() => {
            expect(getScore).toHaveBeenCalledWith({ income: 50000 });
        });

        expect(screen.getByTestId('denied-response')).toBeInTheDocument();
    });

    test('deve redicionar para a pagina inicial ao clicar no botão', async () => {
        getScore.mockResolvedValueOnce({ status: 'DENIED' });

        render(
            <User_Data.Provider value={userContextValue}>
                <LoanResponse />
            </User_Data.Provider>,
        );

        await waitFor(() => {
            expect(getScore).toHaveBeenCalledWith({ income: 50000 });
        });

        const button = screen.getByTestId('button-back-home');
        fireEvent.click(button);

        expect(mockPush).toHaveBeenCalled();
    });

    test('should save user request to localStorage after API call', async () => {
        getScore.mockResolvedValueOnce({ status: 'APPROVED' });

        render(
            <User_Data.Provider value={userContextValue}>
                <LoanResponse />
            </User_Data.Provider>,
        );

        await waitFor(() => {
            expect(getScore).toHaveBeenCalledWith({ income: 50000 });
        });

        const savedRequests = JSON.parse(localStorage.getItem('userRequests'));
        expect(savedRequests).toHaveLength(1);
        expect(savedRequests[0]).toMatchObject({
            name: 'John Doe',
            email: 'john.doe@example.com',
            status: {
                status: 'APPROVED',
            },
        });
    });
});
