from calendar import month
import json

# with open("D:\\test\gallery-dl\\twitter\TOWNGOALEVERYDY\\1570130459430113281_1.mp4.json", encoding="utf8") as f:
#     data = json.load(f)

# print(data['content'].split("\n")[0])  # or `print data['two']` in Python 2


from os import walk
import unicodedata
from prettytable import PrettyTable
import datetime
import pandas as pd

f = []
jsons = []
table = PrettyTable()
table.field_names = ['game', 'date', 'link']
months = {"Jan": "January", "Feb": "February", "Mar": "March", "Apr":"April","Jun": "June", "Jul": "July", "Aug": "August", "Sep": "September", "Oct":"October", "Nov":"November","Dec":"December"}

def normalise_day(day_string):
    if (len(day_string) == 1):
        day_string = "0" + day_string
    return day_string

def normalise_month(month_string):
    if ((len(month_string) == 3) & (month_string != "May")):
        month_string = months[month_string]
    return month_string

def normalise_year(year_string):
    if (len(year_string) == 2):
        if (int(year_string) > 23):
            year_string = "19" + year_string
        else:
            year_string = "20" + year_string
    return year_string

def normalise_date(date:str):
    # print(date)
    day,month,year=date.split(" ")
    day = normalise_day(day)
    month = normalise_month(month)
    year = normalise_year(year)
    date = f'{day} {month} {year}'
    return pd.to_datetime(date, infer_datetime_format=True).date()

for (dirpath, dirnames, filenames) in walk("D:\\test\gallery-dl\\twitter\TOWNGOALEVERYDY\\"):
    f.extend(filenames)
    break

for x in f:
    if (x[-4:] == "json"):
        jsons.append(x)

video_files = []

for file in jsons:
    with open(f"D:\\test\gallery-dl\\twitter\TOWNGOALEVERYDY\\{file}", encoding="utf8") as f:
        data = json.load(f)

    text = data['content'].split("\n")[0]
    normal_text = (unicodedata.normalize( 'NFKC', data['content'].split("\n")[0]))
    if normal_text[0] == "@":
        continue
    normal_text, date = normal_text.split("|")
    date = normalise_date(date.strip())
    video_file = (file[:-5].strip())
    
    video_files.append(video_file)

    table.add_row([normal_text, date, video_file])

table.sortby = "date"
print(video_files)