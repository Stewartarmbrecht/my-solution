#!/bin/bash
lowercase=$(echo $1 | tr '[:upper:]' '[:lower:]')
noCaseChange=$(echo $1)
lowercaseSedCommand="s/my/$lowercase/"
noCaseChangeSedCommand="s/My/$noCaseChange/"
for file in $(git ls-files | grep my | sed -e 's/\(my[^/]*\).*/\1/' | uniq); do git mv $file $(echo $file | sed -e $lowercaseSedCommand); done
for file in $(git ls-files | grep my | sed -e 's/\(my[^/]*\).*/\1/' | uniq); do git mv $file $(echo $file | sed -e $lowercaseSedCommand); done
for file in $(git ls-files | grep My | sed -e 's/\(My[^/]*\).*/\1/' | uniq); do git mv $file $(echo $file | sed -e $noCaseChangeSedCommand); done