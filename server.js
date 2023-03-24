import express from 'express';
import bodyParser from "express";
import * as gcpMetadata from "gcp-metadata";

const app = express();
const PORT = process.env.PORT || 8080

app.use(bodyParser.json());
app.get('/',async (req, res) => {
    const isAvailable = await gcpMetadata.isAvailable();
    if (isAvailable) {
        // grab all top level metadata from the service
        const instanceMetadata = await gcpMetadata.instance();
        console.log('Instance metadata:');
        console.log(instanceMetadata);

        // get all project level metadata
        const projectMetadata = await gcpMetadata.project();
        return res.send("Project metadata: " + projectMetadata)
    }
});

app.listen(PORT, ()=>{
    console.log("app running")
})