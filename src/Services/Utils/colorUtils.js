export const rgbRE = /^(rgb|rgba)/
export const rgbNumberRE =
  /^(0|255|25[0-4]|2[0-4]\d|1\d\d|0?\d?\d),(0|255|25[0-4]|2[0-4]\d|1\d\d|0?\d?\d),(0|255|25[0-4]|2[0-4]\d|1\d\d|0?\d?\d)$/
export const leadingHashRE = /^(#)/
export const hexShorthandRE = /^#?([a-f\d])([a-f\d])([a-f\d])$/i
export const hexFullRE = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i

/**
 * #eee -> length hex shorthand, shorthand with alpha, classic, hex alpha
 */
export const isHexColor = (color) =>
  leadingHashRE.test(color) && [4, 7, 5, 9].includes(color.length)

export const isRgbColor = (color) => rgbRE.test(color)

export const isRGBNumbers = (color) => rgbNumberRE.test(color)

export const hexToRgb = (color) => {
  color = color.replace(hexShorthandRE, (_, r, g, b) => r + r + g + g + b + b)
  const res = hexFullRE.exec(color)

  return res
    ? {
        r: Number.parseInt(res[1], 16),
        g: Number.parseInt(res[2], 16),
        b: Number.parseInt(res[3], 16),
      }
    : null
}

export const getRGBColor = (color) => {
  if (isRGBNumbers(color)) {
    return color
  }

  if (isRgbColor(color)) {
    const arrayColor = color.replace(/[rgba()]/g, '').split(',')
    return `${arrayColor[0]}, ${arrayColor[1]}, ${arrayColor[2]}`
  }

  if (isHexColor(color)) {
    const rgb = hexToRgb(color)
    if (rgb) {
      return `${rgb.r}, ${rgb.g}, ${rgb.b}`
    }
  }

  console.warn(`colorUtils(setColor): the color (${color}) isn't correct`)

  return color
}
