#!/usr/bin/python

import sys
import csv
import json

def convert(filename):
  csv_filename = filename[0]
  array = []
  with open(csv_filename, 'r') as f:
    print "Opening CSV file: ", csv_filename
    fieldnames = f.readline().replace('\r\n', '').replace('\n', '').split(',')
    reader = csv.DictReader(f, fieldnames)
    for row in reader:
      array.append(row)

  json_filename = csv_filename.split(".")[0]+".json"
  with open(json_filename,'w+') as f:
    print "Saving JSON to file: ", json_filename
    data = json.dumps(array)
    f.write(data)
 
if __name__=="__main__":
  convert(sys.argv[1:])