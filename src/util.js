// module.exports = function say() {
//   console.log('hello world');
// }

export default function getData() {
  return new Promise((resolve, reject) => {
    resolve('ok');
  })
}