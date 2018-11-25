expo login -u $EXPO_USERNAME -p $EXPO_PASSWORD --non-interactive

docker run -i --rm \
-v "$PWD":/app -w /app --user $(id -u):$(id -g) \
sh -c 'expo login -u $EXPO_USERNAME -p $EXPO_PASSWORD --non-interactive && npm run build'
