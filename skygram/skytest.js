const { SkynetClient, genKeyPairFromSeed } = require("skynet-js");

const client = new SkynetClient();
const { privateKey, publicKey } = genKeyPairFromSeed("Yet another instagram clone without censorship using skynet blockchain skydb and idx");

const dataKey = "skyGram";
const json =   {
    "id": "1307215701304346376",
    "code": "BIkKcEhDwcI",
    "time": "2016-08-01T11:51:16.000Z",
    "type": "GraphImage",
    "comment": 1,
    "text": "#amazing #awesome #fantastic #midianoinsta #villa #design #beautiful #residence #project #modern #interior #exterior #geometry #success #world #designer #decor  #mansion",
    "media": "https://instagram.fqsc1-1.fna.fbcdn.net/v/t51.2885-15/e35/13732323_530396013818495_1363691294_n.jpg?_nc_ht=instagram.fqsc1-1.fna.fbcdn.net&_nc_cat=111&_nc_ohc=SHyioOK_PgUAX_ZMy3P&tp=1&oh=7700fcc59721ff13d2ff90c99d542622&oe=5FE41B02",
    "image": "images/BIkKcEhDwcI.jpg"
};

function getEntryUrl() {
  try {
    const url = client.registry.getEntryUrl(publicKey, dataKey);
  } catch (error) {
    console.log(error);
  }
}  

async function setJSONPost() {
  try {
    await client.db.setJSON(privateKey, dataKey, json);
  } catch (error) {
    console.log(error);
  }
}

setJSONPost();