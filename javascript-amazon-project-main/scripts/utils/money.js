export function formatCurrency(matchingProduct){
    return ((matchingProduct.priceCents)/100).toFixed(2);
}