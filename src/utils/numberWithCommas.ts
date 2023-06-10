const numberWithCommas = (x = 0): string =>
  x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")

export default numberWithCommas
