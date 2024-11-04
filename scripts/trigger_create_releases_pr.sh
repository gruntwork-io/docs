# CIRCLE_TOKEN="<YOUR_PAT>"

curl --request POST -v \
  --url https://circleci.com/api/v2/project/github/gruntwork-io/docs/pipeline \
  --header "Circle-Token: $CIRCLE_TOKEN" \
  --header 'content-type: application/json' \
  --data '{"branch":"apiRelease"}'