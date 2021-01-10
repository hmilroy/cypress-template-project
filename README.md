# cypress-template-project
cypress-template-project with excel data feeder

npm init
npm install cypress --save-dev

npx cypress open     

npm install hmilroy/excel-data-loader
"""load-data"": ""rm -rf ./data/data.json && node node_modules/excel-data-loader/index.js excel-folder-path=./data json-file-path=./data/data.json"",
"

npm install -D cypress-xpath
Add >> require('cypress-xpath') >> to support >> index.js

"start": "cypress open",
