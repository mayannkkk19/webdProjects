export function formatCurrency(matchingProduct){
    return (Math.round(matchingProduct.priceCents)/100).toFixed(2);
}