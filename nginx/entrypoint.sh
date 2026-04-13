#!/bin/sh

inotifywait -m -e close_write,create,delete -r /etc/nginx/ssl |
while read; do
	nginx -s reload;
done &

while [ ! -f /etc/nginx/ssl/fullchain.pem ]; do
	echo "Waiting for fullchain.pem"
	sleep 1;
done

trap 'nginx -s quit; exit 0' TERM INT
exec nginx -g "daemon off;"
