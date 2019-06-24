cd ~/fabric-dev-servers
export FABRIC_VERSION=hlfv12
./stopFabric.sh
./teardownFabric.sh
./teardownAllDocker.sh
docker volume prune
#./downloadFabric.sh
#./startFabric.sh

#cd ~/fabric-dev-servers/fabric-samples
#curl -sSL http://bit.ly/2ysbOFE | bash -s 1.2.1 1.2.1 0.4.10

git checkout multi-org
cd ~/fabric-dev-servers/fabric-samples/first-network

./byfn.sh -m generate
./byfn.sh -m down
./byfn.sh -m up -s couchdb -a

composer card delete -c PeerAdmin@ch-network-org1
composer card delete -c PeerAdmin@ch-network-org2
composer card delete -c alice@charity
composer card delete -c bob@charity
composer card delete -c admin@charity
composer card delete -c PeerAdmin@fabric-network
rm -fr ~/.composer

cd ~/composer/
composer card create -p ~/composer/org1/ch-network-org1.json -u PeerAdmin -c ~/composer/org1/Admin@org1.example.com-cert.pem -k ~/composer/org1/*_sk -r PeerAdmin -r ChannelAdmin -f PeerAdmin@ch-network-org1.card
composer card create -p ~/composer/org2/ch-network-org2.json -u PeerAdmin -c ~/composer/org2/Admin@org2.example.com-cert.pem -k ~/composer/org2/*_sk -r PeerAdmin -r ChannelAdmin -f PeerAdmin@ch-network-org2.card

composer card import -f PeerAdmin@ch-network-org1.card --card PeerAdmin@ch-network-org1
composer card import -f PeerAdmin@ch-network-org2.card --card PeerAdmin@ch-network-org2

composer network install --card PeerAdmin@ch-network-org1 --archiveFile ~/fabric-dev-servers/charity/charity@$1.bna
composer network install --card PeerAdmin@ch-network-org2 --archiveFile ~/fabric-dev-servers/charity/charity@$1.bna

composer identity request -c PeerAdmin@ch-network-org1 -u admin -s adminpw -d alice
composer identity request -c PeerAdmin@ch-network-org2 -u admin -s adminpw -d bob

composer network start -c PeerAdmin@ch-network-org1 -n charity -V $1 -o endorsementPolicyFile=~/composer/endorsement-policy.json -A alice -C alice/admin-pub.pem -A bob -C bob/admin-pub.pem
composer card create -p ~/composer/org1/ch-network-org1.json -u alice -n charity -c alice/admin-pub.pem -k alice/admin-priv.pem
composer card import -f alice@charity.card
composer network ping -c alice@charity
