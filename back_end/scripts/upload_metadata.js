const { Web3Storage, getFilesFromPath } = require('web3.storage')

function getAccessToken() {
    return process.env.WEB3_STORAGE_TOKEN
};

function makeStorageClient() {
    return new Web3Storage({ token: getAccessToken() })
}

async function getFiles (path) {
    const files = await getFilesFromPath(path)
    console.log(`reading ${files.length} files from ${path}`)
    return files
}

async function storeFiles (files) {
    const client = makeStorageClient()
    const cid = await client.put(files)
    console.log(`stored ${files.length} files with cid ${cid}`)
    return cid
}

async function main() {
    const client = makeStorageClient()
    const files = getFiles("../ticket_metadata")
    await storeFiles(files)
}

main().catch((error) => {
    console.error(error)
    process.exitCode = 1
});