#! /bin/bash

composer archive create -t dir -n .
composer network install -a charity@$1.bna -c PeerAdmin@fabric-network
composer network upgrade -c PeerAdmin@fabric-network -n charity -V $1
