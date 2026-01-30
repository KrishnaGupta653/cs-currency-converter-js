import Freecurrencyapi from '@everapi/freecurrencyapi-js';
const freecurrencyapi = new Freecurrencyapi('fca_live_NbDKF8yIavOWQkAE5aarQtviwkghXwNcssu9OwVv');
// convertCurrency('USD', 'INR', 10).then(result => {
//     console.log("Final Amount:", result);
// });
export async function convertCurrency(fromCurrency, toCurrency, units) {
    try {
        // 2. Fix API parameter names
        // Most libraries use 'base_currency' and 'currencies', not 'from_currency'
        const res = await freecurrencyapi.latest({
            base_currency: fromCurrency, 
            currencies: toCurrency
        });

        const multiplier = res.data[toCurrency];

        // 3. Check if the currency actually exists in the response
        if (!multiplier) {
            console.error(`Error: Could not find rate for ${toCurrency}`);
            return null;
        }

        const convertedAmount = units * multiplier;

        // 4. RETURN the value instead of just logging it
        // This allows you to use the result elsewhere in your app
        return convertedAmount;

    } catch (error) {
        // 5. Add error handling for network issues or bad API keys
        console.error("Currency conversion failed:", error);
        return null;
    }
}
