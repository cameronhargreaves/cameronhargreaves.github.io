from os import listdir
from os.path import isfile, join

path = "D:/advent\kits\\nufc"
onlyfiles = [f for f in listdir(path) if isfile(join(path, f))]

# print(onlyfiles)

li = [x[:5] for x in onlyfiles]

li = list(set(li))

print(li)