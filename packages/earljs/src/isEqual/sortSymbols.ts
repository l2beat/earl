export function sortSymbols(symbols: symbol[], otherSymbols: symbol[]): symbol[] {
  return symbols
    .map((x): [symbol, string] => [x, `${x.toString()}${otherSymbols.indexOf(x)}`])
    .sort((a, b) => a[1].localeCompare(b[1]))
    .map((x) => x[0])
}
