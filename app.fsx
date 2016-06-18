// Start the web server
#load "scripts/buildClient.fsx"
#load "src/GenUnitApp/Scripts/Start.fsx"

// Build the client, i.e. run npm install
// making sure all javascript libs are in place
BuildClient.npmInstall()
// And build the client, i.e. generate bundled client
// in generated/dist dir
BuildClient.buildClient()

// Start the webserver
Start.start ()


