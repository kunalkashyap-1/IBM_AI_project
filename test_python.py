import sys 
import json
param=sys.argv[1]
# print(param)

str={
    "v":"Hello! "+param
}

print(json.dumps(str))
sys.stdout.flush()