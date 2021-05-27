// I was unable to find a ready implementation for this so i ended up writing my own half-assed implementation. This might need tweaking...
export function encodeAnchor(input: string): string {
  return input
    .toLowerCase()
    .replace(/[()\.,:\[\]]/g, '')
    .replace(/<(.*?)>/g, '')
    .replace(/ /g, '-')
}

export function encodeLabel(input: string): string {
  return input.replace(/</g, '\\<')
}

znajdz algorytm odpowiedzialny za generarowanie linkow inaczej to lipa