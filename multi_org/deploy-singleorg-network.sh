cd ~/fabric-dev-servers
export FABRIC_VERSION=hlfv12
./stopFabric.sh
./teardownFabric.sh
./teardownAllDocker.sh
./downloadFabric.sh
./startFabric.sh

composer card delete -c PeerAdmin@fabric-network
composer card delete -c admin@tutorial-network
rm -fr ~/.composer
export CERT_PATH=~/fabric-dev-servers/fabric-scripts/hlfv12/composer/crypto-config/peerOrganizations/org1.example.com/users/Admin@org1.example.com/msp
composer card create -p ~/fabric-dev-servers/connection.json -u PeerAdmin -c $CERT_PATH/signcerts/Admin@org1.example.com-cert.pem -k $CERT_PATH/keystore/114aab0e76bf0c78308f89efc4b8c9423e31568da0c340ca187a9b17aa9a4457_sk -r PeerAdmin -r ChannelAdmin
composer card import -f PeerAdmin@fabric-network.card

composer network install -c PeerAdmin@fabric-network -a ~/fabric-dev-servers/charity/charity@$1.bna
composer network start --networkName charity --networkVersion $1 -A admin -S adminpw -c PeerAdmin@fabric-network
composer card import -f admin@charity.card
composer network ping -c admin@charity
