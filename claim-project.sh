#!/bin/bash
lowercase=$(echo $1 | tr '[:upper:]' '[:lower:]')
noCaseChange=$(echo $1)
for file in $(git ls-files | grep my | sed -e 's/\(my[^/]*\).*/\1/' | uniq); do git mv $file $(echo $file | sed -e 's/my/${lowerCase}/'); done
for file in $(git ls-files | grep My | sed -e 's/\(My[^/]*\).*/\1/' | uniq); do git mv $file $(echo $file | sed -e 's/My/${noCaseChange}/'); done