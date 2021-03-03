const { server } = require("./consumer")

server.listen(9292, () => {
  console.log("Frontend running on http://localhost:9292")
})