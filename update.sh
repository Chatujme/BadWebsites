#!/bin/bash
# Script to update badwebsites list from API

echo "Downloading latest data from API..."
curl -s https://api.chatujme.cz/bad-websites/list > data/source.json.tmp

# Check if download was successful
if [ $? -ne 0 ] || [ ! -s data/source.json.tmp ]; then
    echo "Error: Failed to download data from API"
    rm -f data/source.json.tmp
    exit 1
fi

# Format JSON with jq
echo "Formatting JSON..."
if ! jq '.' data/source.json.tmp > data/source.json 2>/dev/null; then
    echo "Error: Downloaded data is not valid JSON"
    rm -f data/source.json.tmp
    exit 1
fi
rm -f data/source.json.tmp

# Check if there are any changes
if git diff --quiet data/source.json; then
    echo "No changes detected. JSON is identical to the previous version."
    exit 0
fi

echo "Changes detected!"
echo "Data successfully updated and formatted!"
echo "To commit and push:"
echo "  git add data/source.json"
echo "  git commit -m 'Update badwebsites list'"
echo "  git push origin main"
