#!/bin/bash

# Spider the site and output everything to a log file for parsing
wget --spider --recursive --no-parent -o wget.log http://docs.gruntwork.io/

# Pull out all the URLs from the logs, remove trailing slashes, then sort and unique the list
awk '/^--/ {gsub(/\\/, "", $3); url=$3; sub(/\/$/, "", url); print url}' wget.log | sort -u  > full_urls_list.txt

# Remove any static content
awk '!/.(png|jpe?g|gif|svg|ico|css|js)$/' full_urls_list.txt >> filtered_urls_list.txt

cp filtered_urls_list.txt combined_lists.txt

cat combined_lists.txt | sort | uniq > filtered_urls_list.txt

rm combined_lists.txt

wc filtered_urls_list.txt