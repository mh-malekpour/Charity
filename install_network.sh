#! /bin/bash


rm -rf ~/.composer/
export FABRIC_VERSION=hlfv12
~/fabric-dev-servers/startFabric.sh
~/fabric-dev-servers/createPeerAdminCard.sh


composer archive create -t dir -n .;
composer network install --card PeerAdmin@hlfv1 --archiveFile charity@0.0.1.bna;
composer network start --networkName charity --networkVersion 0.0.1 --networkAdmin admin --networkAdminEnrollSecret adminpw --card PeerAdmin@hlfv1 --file networkadmin.card;
composer card import --file networkadmin.card;
composer network ping --card admin@charity;
