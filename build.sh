
EXPO_USERNAME=$1
EXPO_PASSWORD=$2


docker run -i --rm \
-v ${pwd}:/app -w /app --user $(id -u):$(id -g) \
node:10 \
sh -c 'npm i && npm i -g expo && expo login -u ${EXPO_USERNAME} -p ${EXPO_PASSWORD} --non-interactive && expo publish'
