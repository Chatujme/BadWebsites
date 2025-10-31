#!/bin/bash
# Script to update badwebsites list from API

echo "Downloading latest data from API..."
curl -s https://api.chatujme.cz/bad-websites/list > data/source.json

# Check if download was successful
if [ $? -ne 0 ] || [ ! -s data/source.json ]; then
    echo "Error: Failed to download data from API"
    exit 1
fi

# Validate JSON
if ! jq empty data/source.json 2>/dev/null; then
    echo "Error: Downloaded data is not valid JSON"
    exit 1
fi

echo "Data successfully updated!"
echo "To commit and push:"
echo "  git add data/source.json"
echo "  git commit -m 'Update badwebsites list'"
echo "  git push origin main"
