#!/usr/bin/python

import sys
import re

def ignoreEmptyRow(filename):
  csv_filename = filename[0]
  rows = []
  with open(csv_filename, 'r') as f:
    for line in f:
      if len(re.findall(r'^(,{1,100})$', line)) == 0:
        rows.append(line)

  with open(csv_filename, 'w') as f:
    for r in rows:
      f.write(r)

if __name__=="__main__":
  ignoreEmptyRow(sys.argv[1:])