"""Ambil kalender Forex Factory (dengan nilai Actual) lalu simpan ke data/ff_thisweek.json."""
import json, re, sys, urllib.request, datetime

UA = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0 Safari/537.36"
OUT = "data/ff_thisweek.json"
IMP = {"high": "High", "medium": "Medium", "low": "Low", "holiday": "Holiday", "non-economic": "Holiday"}

def get(url):
    req = urllib.request.Request(url, headers={"User-Agent": UA, "Accept-Language": "en-US,en;q=0.9"})
    with urllib.request.urlopen(req, timeout=30) as r:
        return r.read().decode("utf-8", "ignore")

def grab_array(s, start):
    i = s.index("[", start); depth = 0; instr = False; esc = False
    for j in range(i, len(s)):
        c = s[j]
        if instr:
            if esc: esc = False
            elif c == "\\": esc = True
            elif c == '"': instr = False
        elif c == '"': instr = True
        elif c == "[": depth += 1
        elif c == "]":
            depth -= 1
            if depth == 0: return s[i:j + 1]
    raise ValueError("array tidak tertutup")

def from_html():
    s = get("https://www.forexfactory.com/calendar?week=this")
    k = s.index("days:", s.index("calendarComponentStates[1]"))
    days = json.loads(grab_array(s, k))
    out = []
    for d in days:
        for e in d.get("events", []):
            ts = e.get("dateline")
            if not ts: continue
            out.append({
                "title": e.get("name", ""), "country": e.get("currency", ""),
                "date": datetime.datetime.fromtimestamp(ts, datetime.timezone.utc).isoformat(),
                "impact": IMP.get((e.get("impactName") or "").lower(), "Low"),
                "forecast": e.get("forecast", ""), "previous": e.get("previous", ""),
                "actual": e.get("actual", ""), "bw": e.get("actualBetterWorse", 0),
                "allDay": bool(e.get("timeLabel") in ("All Day", "Tentative") ),
            })
    if not out: raise ValueError("kosong")
    return out

def from_json():
    d = json.loads(get("https://nfs.faireconomy.media/ff_calendar_thisweek.json"))
    if not d: raise ValueError("kosong")
    return d

try:
    data = from_html(); src = "html"
except Exception as ex:
    print("HTML gagal:", ex, file=sys.stderr)
    data = from_json(); src = "json"
json.dump(data, open(OUT, "w"), ensure_ascii=False, separators=(",", ":"))
print(src, len(data), "berita;", sum(1 for x in data if x.get("actual")), "punya actual")
