
EXPO_USERNAME=$1
EXPO_PASSWORD=$2


docker run -i --rm \
-v $(PWD):/app -w /app --user $(id -u):$(id -g) \
node: 10 \
sh -c 'npm i -g expo && expo login -u $EXPO_USERNAME -p $EXPO_PASSWORD --non-interactive && npm run build'
