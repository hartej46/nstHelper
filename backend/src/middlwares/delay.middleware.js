export const delayResponse = () => {
    return (req, res, next) => {
        setTimeout(() => {
            next(); 
        }, 1000);
    };
};