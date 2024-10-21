const approvedResponse = {
    status: 'APPROVED',
    max_amount: 10000,
};

const deniedResponse = {
    status: 'DENIED',
};

export const getScore = async (payload) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            if (payload.income > 2000) {
                resolve(approvedResponse);
            } else {
                resolve(deniedResponse);
            }
        }, 2000);
    });
};
