#! /usr/bin/env bash

cd /root/games

sudo cp .deploy/games.service /etc/systemd/system
systemctl enable games.service
systemctl daemon-reload
systemctl restart games.service
