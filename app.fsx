// Start the web server
#load "scripts/buildClient.fsx"
#load "src/GenUnitApp/Scripts/Start.fsx"

// Build the client, i.e. run npm install
// making sure all javascript libs are in place
BuildClient.buildClient()
BuildClient.testClient()

// Start the webserver
Start.start ()


