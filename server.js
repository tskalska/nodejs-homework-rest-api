const app = require('./app')

app.listen(3000, () => {
  console.log("Server running. Use our API on port: 3000")
})


// const { PORT = 3000 } = process.env;
// app.listen(PORT, () => {
//   console.log(`Server running. Use our API on port: ${PORT}`)
// });