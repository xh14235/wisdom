let test = {
  getTestList (max, length) {
    let list = []
    for (let i = 0; i < length; i++) {
      list.push(Math.floor((Math.random() * (max - max * 0.6)) + (max * 0.6)))
    }
    return list
  }
}
export default test
