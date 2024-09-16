function formatOutput(number) {
    const parts = number.toString().split('.');
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    return parts.join('.');
}

export function formatOutputNumber(value, outputElement) {
    if (typeof value === 'number') {
        outputElement.innerHTML = formatOutput(value);
    }
}
