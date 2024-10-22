import React from 'react';
import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import PersonalLoanForm from '../PersonalLoanForm';
import { User_Data } from '../../../context/UserContext';
import { jest, describe, it, expect } from '@jest/globals';

const mockPush = jest.fn();
jest.mock('next/router', () => ({
    useRouter: () => ({
        push: () => {
            mockPush();
        },
    }),
}));

const mockSetUserName = jest.fn();
const mockSetUserIncome = jest.fn();

const renderComponent = () => {
    return render(
        <User_Data.Provider
            value={{
                setUserName: mockSetUserName,
                setUserIncome: mockSetUserIncome,
            }}
        >
            <PersonalLoanForm />,
        </User_Data.Provider>,
    );
};

describe('PersonalLoanForm Component', () => {
    // beforeEach(() => {
    //     mockUseRouter.mockReturnValue(push);
    // });

    it('deve renderizar o formulário corretamente', () => {
        renderComponent();
        expect(screen.getByTestId('input-name')).toBeInTheDocument();
        expect(screen.getByTestId('input-idade')).toBeInTheDocument();
        expect(screen.getByTestId('input-renda')).toBeInTheDocument();
        expect(screen.getByTestId('input-cidade')).toBeInTheDocument();
    });

    it('deve mostrar erro quando o nome tiver menos de 8 caracteres', () => {
        renderComponent();
        const nameInput = screen
            .getByTestId('input-name')
            .querySelector('input');
        const button = screen.getByTestId('button-verify');

        fireEvent.change(nameInput, { target: { value: 'Ana' } });
        fireEvent.click(button);

        expect(
            screen.getByText('Digite seu nome completo.'),
        ).toBeInTheDocument();
    });

    it('deve mostrar erro quando a idade for inválida', () => {
        renderComponent();
        const ageInput = screen
            .getByTestId('input-name')
            .querySelector('input');
        const button = screen.getByTestId('button-verify');

        fireEvent.change(ageInput, { target: { value: '17' } });
        fireEvent.click(button);

        expect(
            screen.getByText(
                'Você deve ter entre 18 e 65 anos para solicitar um empréstimo.',
            ),
        ).toBeInTheDocument();
    });

    it('deve mostrar erro quando a renda for inválida', () => {
        renderComponent();
        const incomeInput = screen
            .getByTestId('input-renda')
            .querySelector('input');
        const button = screen.getByTestId('button-verify');

        fireEvent.change(incomeInput, { target: { value: '-1000' } });
        fireEvent.click(button);

        expect(
            screen.getByText('Sua renda mensal deve ser maior que zero.'),
        ).toBeInTheDocument();
    });

    it('deve chamar o setUserName e setUserIncome corretamente quando o formulário for válido', () => {
        renderComponent();
        const nameInput = screen
            .getByTestId('input-name')
            .querySelector('input');
        const ageInput = screen
            .getByTestId('input-idade')
            .querySelector('input');
        const incomeInput = screen
            .getByTestId('input-renda')
            .querySelector('input');
        const cityInput = screen
            .getByTestId('input-cidade')
            .querySelector('input');
        const button = screen.getByTestId('button-verify');

        fireEvent.change(nameInput, { target: { value: 'Ana Maria' } });
        fireEvent.change(ageInput, { target: { value: '25' } });
        fireEvent.change(incomeInput, { target: { value: '2000' } });
        fireEvent.change(cityInput, { target: { value: 'São Paulo' } });

        fireEvent.click(button);

        expect(mockSetUserName).toHaveBeenCalledWith('Ana Maria');
        expect(mockSetUserIncome).toHaveBeenCalledWith(2000);
    });

    it('deve navegar para a página de empréstimos ao submeter o formulário válido', () => {
        renderComponent();
        const nameInput = screen
            .getByTestId('input-name')
            .querySelector('input');
        const ageInput = screen
            .getByTestId('input-idade')
            .querySelector('input');
        const incomeInput = screen
            .getByTestId('input-renda')
            .querySelector('input');
        const cityInput = screen
            .getByTestId('input-cidade')
            .querySelector('input');
        const button = screen.getByTestId('button-verify');

        fireEvent.change(nameInput, { target: { value: 'Ana Maria' } });
        fireEvent.change(ageInput, { target: { value: '25' } });
        fireEvent.change(incomeInput, { target: { value: '2000' } });
        fireEvent.change(cityInput, { target: { value: 'São Paulo' } });

        fireEvent.click(button);

        expect(mockPush).toHaveBeenCalled();
    });
});
