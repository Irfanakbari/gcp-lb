import express from 'express';
import bodyParser from "express";
import * as gcpMetadata from "gcp-metadata";

const app = express();

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

app.listen(process.env.PORT || 3000, ()=>{
    console.log("app running")
})