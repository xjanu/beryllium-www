#!/usr/bin/env python3

import datetime

with open("t", 'r') as t:
    data = map(datetime.datetime.fromisoformat, reversed(t.read().splitlines()))

start = datetime.datetime.fromisoformat("2000-01-01 00:00:00")
end   = datetime.datetime.fromisoformat("2000-01-01 00:00:00")
days = {}
for ts in data:
    if ts.date() == start.date():
        end = ts
    else:
        diff = max(end - start, datetime.timedelta(hours=2))
        print(f"{start.date()}: {diff}")
        days[start.date()] = diff
        start = ts
        end = ts

print(f"Total: {sum(days.values(), datetime.timedelta(0))}")
