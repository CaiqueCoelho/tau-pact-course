const path = require("path")
const { Verifier } = require("@pact-foundation/pact")
const { server, importData } = require("../../../src/provider")

const SERVER_URL = "http://localhost:8081"

server.listen(8081, () => {
    importData()
    console.log(`Clients Service listening on ${SERVER_URL}`)
  })
  
  describe("Clients Service Verification", () => {
    it("validates the expectations of Client Service", () => {
      let opts = {
            provider: "Clients Service",
            logLevel: "DEBUG",
            providerBaseUrl: SERVER_URL,
            // get from url, directory or pact broker
            //pactUrls: [
            //  path.resolve(
            //    process.cwd(), "./__tests__/contract/pacts/frontend-clientsservice.json"
            //  )
            //],
            //ClientService is the name of our provider, and Frontend the name of the consumer
            pactUrls: ['http://localhost:9292/pacts/provider/ClientsService/consumer/Frontend/latest'],
            consumerVersionTags: ["dev"],
            providerVersionTags: ["dev"],
            //publishVerificationResult: false, // true if publish in pact broker
            publishVerificationResult: true,
            providerVersion: "1.0.2"
          }
        return new Verifier(opts).verifyProvider().then(output => {
            console.log("Pact Verification Complete!")
            console.log(output)
        })
    })
})