#! /bin/bash

composer archive create -t dir -n .
composer network install -a charity@$1.bna -c PeerAdmin@hlfv1
composer network upgrade -c PeerAdmin@hlfv1 -n charity -V $1
