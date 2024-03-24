#!/bin/bash
lowercase=$(echo $1 | tr '[:upper:]' '[:lower:]')
noCaseChange=$(echo $1)
lowercaseSedCommand="s/my/$lowercase/"
noCaseChangeSedCommand="s/My/$noCaseChange/"
for file in $(git ls-files | grep my | uniq); 
do 
  dir=$(dirname $file);
  mkdir -p $dir;
  git mv $file $(echo $file | sed -e $lowercaseSedCommand);
done

echo "Files with my in the name have been renamed to $lowercase"

for file in $(git ls-files | grep My | uniq); 
do 
  dir=$(dirname $file);
  mkdir -p $dir;
  git mv $file $(echo $file | sed -e $noCaseChangeSedCommand); 
done

echo "Files with My in the name have been renamed to $1"
