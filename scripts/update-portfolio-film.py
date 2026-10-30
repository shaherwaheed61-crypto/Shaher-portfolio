#!/usr/bin/env python3
"""Rebuild stakeholder cards and credentials while retaining the approved film evidence.

Requires Python/Pillow, ffmpeg/ffprobe and Node >=22. Uses the committed approved
90-second baseline, never external or previously excluded footage. The 48 fps
evidence plays at 57 fps without dropping its source frames, making room for
the Niqat model views and seven actual certificate images in a 90-second film.
"""
from __future__ import annotations
import argparse
from concurrent.futures import ThreadPoolExecutor
import hashlib
import io
import json
import math
from pathlib import Path
import re
import subprocess
from urllib.request import urlopen
from PIL import Image, ImageDraw, ImageFont, ImageOps

ROOT = Path(__file__).resolve().parents[1]
WORK = ROOT / "work/film-revision"
BASE = WORK / "baseline"
BASELINE_COMMIT = "a9e62d7e6c33fc766c44de4fa92a60265cee9abd"
REVISION = "full-marsa-drawing-niqat-model-saif-v5"
W, H, FPS, SOURCE_FPS = 1920, 1080, 57, 48
BG, PANEL, INK, MUTED, ACCENT = "#0d1214", "#142226", "#f0f1ed", "#aeb9bb", "#e4a66f"
COLORS = ["#e4a66f", "#89b7ae", "#a2b6d2", "#d1bd82"]
SANS = "/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf"
BOLD = "/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf"
MONO = "/usr/share/fonts/truetype/dejavu/DejaVuSansMono.ttf"

def run(args):
    result = subprocess.run(args, cwd=ROOT, capture_output=True, text=True)
    if result.returncode:
        raise RuntimeError(f"{args[0]} failed ({result.returncode}): {result.stderr[-4000:]}")
    return result.stdout

def prepare_baseline():
    """Read only the approved published revision; keep source footage ignored."""
    BASE.mkdir(parents=True, exist_ok=True)
    manifest = json.loads(run(["git", "show", f"{BASELINE_COMMIT}:data/github-pages-assets.json"]))
    video_asset = next(a for a in manifest["files"] if a["path"] == "media/shaher-portfolio-film.mp4")
    sources = {
        "shaher-portfolio-film.mp4": "public/media/shaher-portfolio-film.mp4",
        "shaher-portfolio-film.vtt": "public/media/shaher-portfolio-film.vtt",
        "portfolio-film-storyboard.json": "data/portfolio-film-storyboard.json",
        "portfolio-film-timeline.json": "data/portfolio-film-timeline.json",
    }
    for filename, source in sources.items():
        target = BASE / filename
        if not target.exists():
            url = f"https://raw.githubusercontent.com/shaherwaheed61-crypto/Shaher-portfolio/{BASELINE_COMMIT}/{source}"
            with urlopen(url, timeout=120) as response:
                target.write_bytes(response.read())
        if filename.endswith(".mp4"):
            raw = target.read_bytes()
            assert len(raw) == video_asset["size"]
            assert hashlib.sha256(raw).hexdigest() == video_asset["sha256"]

def font(size, bold=False, mono=False):
    return ImageFont.truetype(MONO if mono else BOLD if bold else SANS, size)

def wrapped(draw, text, face, width):
    lines, line = [], ""
    for word in text.split():
        proposed = (line + " " + word).strip()
        if draw.textlength(proposed, font=face) > width and line:
            lines.append(line)
            line = word
        else:
            line = proposed
    return lines + ([line] if line else [])

def text(draw, xy, value, size=26, fill=INK, width=None, bold=False, mono=False, leading=1.3):
    face = font(size, bold, mono)
    lines = wrapped(draw, value, face, width) if width else [value]
    for i, line in enumerate(lines):
        draw.text((xy[0], xy[1] + i * round(size * leading)), line, font=face, fill=fill)
    return len(lines) * round(size * leading)

def canvas(section):
    im = Image.new("RGB", (W, H), BG)
    d = ImageDraw.Draw(im)
    for x in range(0, W, 96): d.line((x, 0, x, H), fill="#182125")
    for y in range(36, H, 96): d.line((0, y, W, y), fill="#182125")
    d.rounded_rectangle((48, 30, 650, 86), radius=28, outline="#455054", fill=BG)
    d.ellipse((71, 50, 85, 64), fill=ACCENT)
    text(d, (106, 42), "SHAHER WAHID RUSHDI", 23, mono=True)
    label = section.upper()
    text(d, (W - 70 - d.textlength(label, font=font(21, mono=True)), 46), label, 21, ACCENT, mono=True)
    return im, d

def fit_image(im, filename, box):
    source = Image.open(filename).convert("RGB")
    fitted = ImageOps.contain(source, (box[2]-box[0], box[3]-box[1]), Image.Resampling.LANCZOS)
    im.paste(fitted, (box[0]+(box[2]-box[0]-fitted.width)//2,
                      box[1]+(box[3]-box[1]-fitted.height)//2))

def save_image(im, path):
    buffer=io.BytesIO();im.save(buffer,format="PNG")
    raw=buffer.getvalue();assert len(raw)>10000
    temporary=path.with_suffix(".tmp")
    temporary.write_bytes(raw);temporary.replace(path)
    assert path.stat().st_size==len(raw)

def project_card(project, chapter, collection, index):
    im, d = canvas(f"PROJECT {index:02d} / 10 · MY CONTRIBUTION")
    name = project["title"]
    size = 62
    while d.textlength(name, font=font(size, True)) > 1776: size -= 1
    text(d, (72, 132), name, size, bold=True)
    group = collection["title"] if collection["id"] != "kaig" else project["client"]
    text(d, (76, 250), group.upper(), 23, ACCENT, width=1760, mono=True)
    d.line((72, 304, 1848, 304), fill="#3b494d")
    text(d, (76, 334), "MY ROLE", 20, ACCENT, mono=True)
    text(d, (72, 369), project["role"], 31, width=565, bold=True)
    if project.get("client"):
        text(d, (76, 480), "OWNER", 19, ACCENT, mono=True)
        text(d, (76, 511), project["client"], 25, MUTED, width=565)
    consultant = project.get("consultant")
    if consultant:
        text(d, (76, 585), "CONSULTANT", 19, ACCENT, mono=True)
        if " / Parsons" in consultant:
            text(d, (76, 616), consultant.replace(" / Parsons", ""), 25, MUTED, width=565)
            text(d, (76, 681), "Parsons (Owner's Consultant)", 25, MUTED)
        else:
            text(d, (76, 616), consultant, 25, MUTED, width=565)
    label = project.get("companyLabel", "Contractor")
    if project["slug"] == "blue-development": label = "Project team"
    text(d, (76, 768), label.upper(), 19, ACCENT, mono=True)
    text(d, (76, 801), project["company"], 24, MUTED, width=565)
    text(d, (76, 913), project["location"].upper(), 21, MUTED, width=570, mono=True)
    for i, metric in enumerate(project.get("metrics", [])[:2]):
        x = 74 + 285*i
        d.rounded_rectangle((x, 966, x+270, 1043), radius=13, fill=PANEL, outline="#455054")
        text(d, (x+16, 978), metric["value"], 26, ACCENT, bold=True)
        text(d, (x+16, 1013), metric["label"], 16, MUTED, width=240)
    cx, cy = 1300, 674
    for radius, color in [(208,"#364247"),(198,"#53626a"),(145,"#44555b")]:
        d.ellipse((cx-radius,cy-radius,cx+radius,cy+radius), outline=color, width=1)
    d.ellipse((cx-135,cy-135,cx+135,cy+135), fill="#102025")
    streams = chapter["workstreams"]
    for i in range(len(streams)):
        start = -178 + i*360/len(streams)
        d.arc((cx-174,cy-174,cx+174,cy+174),start,start+360/len(streams)-16,fill=COLORS[i],width=12)
    for degree in range(0,360,6):
        a=math.radians(degree)
        d.line((cx+204*math.cos(a),cy+204*math.sin(a),cx+214*math.cos(a),cy+214*math.sin(a)),fill="#607079" if degree%30==0 else "#2f3a40")
    for value, y, size, color, bold in [("MY CONTRIBUTION",605,18,MUTED,False),
        (project["code"],649,48,INK,True),("TECHNICAL OFFICE",731,16,ACCENT,False)]:
        face=font(size,bold,not bold)
        text(d,(cx-d.textlength(value,font=face)/2,y),value,size,color,bold=bold,mono=not bold)
    positions=[(710,365),(1465,365),(710,820),(1465,820)]
    if len(streams)==3: positions=[positions[0],positions[1],positions[3]]
    for i,(stream,(x,y)) in enumerate(zip(streams,positions)):
        width,height=390,188
        color=COLORS[i]
        d.rounded_rectangle((x,y,x+width,y+height),radius=16,fill=PANEL,outline="#53626a")
        d.rounded_rectangle((x,y,x+5,y+height),radius=2,fill=color)
        d.rounded_rectangle((x+20,y+22,x+58,y+60),radius=8,fill=color)
        text(d,(x+26,y+29),f"{i+1:02d}",18,BG,mono=True)
        text(d,(x+76,y+25),stream["label"],25,width=width-94,bold=True)
        text(d,(x+23,y+94),stream["detail"],23,MUTED,width=width-42)
        anchor_x=x+width if x<cx else x
        anchor_y=y+height-35 if y<cy else y+35
        near_x=cx-142 if x<cx else cx+142
        near_y=cy-142 if y<cy else cy+142
        d.line((anchor_x,anchor_y,near_x,anchor_y,near_x,near_y),fill=color,width=2)
        d.ellipse((near_x-6,near_y-6,near_x+6,near_y+6),fill=color)
    destination=WORK/f"card-{project['slug']}.png"
    save_image(im,destination)
    return destination

def selected_work_card():
    im, d = canvas("SELECTED DESIGN WORK · MY SCOPE")
    text(d, (82, 175), "Selected architectural work.", 76, bold=True)
    d.rounded_rectangle((78, 357, 1842, 717), radius=28, fill=PANEL, outline="#53626a", width=2)
    text(d, (124, 409), "MY SCOPE", 35, ACCENT, mono=True)
    text(d, (118, 491), "DESIGN", 102, INK, bold=True)
    text(d, (86, 802), "Residential · Landscape · Commercial · Facades", 43, ACCENT)
    text(d, (88, 910), "Selected design work from Shaher's Behance portfolio.", 32, MUTED)
    destination = WORK / "selected-work-design-scope.png"
    save_image(im, destination)
    return destination

def full_marsa_drawing_card():
    """Use the approved complete sheet instead of the cropped source-film view."""
    im = Image.new("RGB", (W, H), BG)
    fit_image(im, ROOT / "public/images/safwa-shopdrawing/al-khuzama-gardens-zone-8.jpg", (0, 0, W, H))
    destination = WORK / "marsa-zones-8-9-full-sheet.png"
    save_image(im, destination)
    return destination

def niqat_model_cards(project):
    """Show only the three approved views derived from the supplied IFC model."""
    source = ROOT / "public/images/niqat-project"
    im, d = canvas("PROJECT 09 / 10 · IFC-DERIVED MODEL")
    text(d, (72, 165), project["title"], 72, bold=True)
    text(d, (76, 282), "Architectural collaboration", 37, ACCENT)
    text(d, (76, 370), "Niqat team · Cairo, Egypt", 30, MUTED)
    text(d, (76, 813), "IFC-DERIVED", 33, ACCENT, mono=True)
    text(d, (76, 870), "3D MODEL", 62, INK, bold=True)
    fit_image(im, source / "model-overview.jpg", (665, 185, 1845, 1000))
    destination = WORK / "card-niqat-project.png"
    save_image(im, destination)
    result = [(destination, "Niqat Project. Architectural collaboration with the Niqat team in Cairo. IFC-derived 3D model.", None)]
    for filename, label in [("model-overview.jpg", "MODEL OVERVIEW"),
                            ("model-side.jpg", "SIDE PERSPECTIVE"),
                            ("model-reverse.jpg", "REVERSE PERSPECTIVE")]:
        im, d = canvas("NIQAT PROJECT · IFC-DERIVED MODEL")
        text(d, (72, 135), label, 52, INK, bold=True)
        fit_image(im, source / filename, (46, 220, 1874, 1030))
        destination = WORK / f"niqat-{filename.removesuffix('.jpg')}.png"
        save_image(im, destination)
        result.append((destination, f"Niqat Project. IFC-derived architectural model — {label.lower()}.", f"/images/niqat-project/{filename}"))
    return result

def certificate_cards(data):
    certs={Path(c["image"]).name:c for c in data["credentials"]}
    result=[]
    im,d=canvas("CREDENTIALS · 01 / 03")
    text(d,(72,135),"Professional accreditation.",64,bold=True)
    fit_image(im,ROOT/"public"/data["portfolio"]["registrationDetails"]["certificate"]["image"].lstrip("/"),(68,280,1150,1040))
    text(d,(1210,330),"SAUDI COUNCIL OF ENGINEERS",23,ACCENT,width=620,mono=True)
    text(d,(1210,423),"Accredited Architect",48,width=620,bold=True)
    text(d,(1210,600),"Specialization: Urban Planning",26,MUTED,width=600)
    text(d,(1210,704),"Professional registration",25,ACCENT)
    text(d,(1210,750),"Valid until 13 February 2027",27,width=600)
    path=WORK/"credentials-sce.png";save_image(im,path)
    result.append((path,"Saudi Council of Engineers professional accreditation: Architect; Specialization: Urban Planning."))
    groups=[
      ("BIM training & certification.","BIM · 02 / 03",[
        ("bim-diploma-management.jpg","BIM Diploma — BIM Management"),
        ("certified-bim-coordinator.jpg","Certified BIM Coordinator"),
        ("certified-bim-modeler.jpg","Certified BIM Modeler (Architectural)")]),
      ("Information & coordination.","PRACTICE · 03 / 03",[
        ("certified-information-manager.jpg","Information Manager — Level 1 Basics"),
        ("iso-19650-readiness.jpg","ISO 19650 Certification Readiness"),
        ("revit-coordinates-workshop.jpg","Revit Coordinates Workshop")])]
    for num,(title,section,items) in enumerate(groups):
        im,d=canvas(section);text(d,(72,135),title,64,bold=True)
        for i,(filename,label) in enumerate(items):
            x=66+i*620
            d.rounded_rectangle((x,267,x+548,817),radius=16,fill=PANEL,outline="#53626a")
            fit_image(im,ROOT/"public/images/certifications"/filename,(x+14,281,x+534,803))
            text(d,(x,855),label,28,width=548,bold=True)
            text(d,(x,966),certs[filename]["issuer"],21,ACCENT,width=548)
        path=WORK/f"credentials-training-{num+1}.png";save_image(im,path)
        result.append((path,"Certificates: "+"; ".join(label+" — "+certs[filename]["issuer"] for filename,label in items)+"."))
    return result

def time_to_seconds(value):
    h,m,s=map(float,value.split(":"));return h*3600+m*60+s

def stamp(seconds):
    ms=round(seconds*1000)
    return f"{ms//3600000:02d}:{ms//60000%60:02d}:{ms//1000%60:02d}.{ms%1000:03d}"

def read_cues():
    source=(BASE/"shaher-portfolio-film.vtt").read_text()
    return [(time_to_seconds(a),time_to_seconds(b),t.strip()) for a,b,t in
      re.findall(r"(\d\d:\d\d:\d\d\.\d+) --> (\d\d:\d\d:\d\d\.\d+)\n(.*?)(?=\n\n|\Z)",source,re.S)]

def probe(path):
    return json.loads(run(["ffprobe","-v","error","-show_streams","-show_format","-of","json",str(path)]))

def encode_clip(task):
    index,scene=task
    target=WORK/f"clip-{index:03d}.mp4"
    signature=hashlib.sha256((json.dumps(scene,sort_keys=True)+(hashlib.sha256(Path(scene["image"]).read_bytes()).hexdigest() if scene.get("image") else "")).encode()).hexdigest()
    cache=target.with_suffix(".signature")
    if target.exists() and cache.exists() and cache.read_text()==signature:
        try:
            if int(probe(target)["streams"][0]["nb_frames"])==scene["frames"]:return target
        except (RuntimeError,KeyError,ValueError,IndexError):pass
    encoding=target.with_suffix(".partial.mp4")
    common=["ffmpeg","-hide_banner","-loglevel","error","-nostdin","-y","-threads","2","-filter_threads","1"]
    if scene.get("image"):
        args=["-loop","1","-framerate",str(FPS),"-i",str(scene["image"])]
    else:
        args=["-ss",str(scene["sourceStart"]),"-i",str(BASE/"shaher-portfolio-film.mp4"),
          "-vf",f"setpts=(PTS-STARTPTS)*{scene['speedNumerator']}/{scene['speedDenominator']}"]
    run(common+args+["-map","0:v:0","-an","-sn","-dn","-r",str(FPS),"-fps_mode","cfr",
      "-frames:v",str(scene["frames"]),"-c:v","libx264","-preset","fast","-crf","18","-threads","2",
      "-pix_fmt","yuv420p","-video_track_timescale","57000",str(encoding)])
    actual=probe(encoding)["streams"][0]
    assert int(actual["nb_frames"])==scene["frames"],(index,actual["nb_frames"],scene["frames"])
    encoding.replace(target)
    cache.write_text(signature)
    return target

def main():
    ap=argparse.ArgumentParser();ap.add_argument("--encode",action="store_true");ap.add_argument("--if-needed",action="store_true");args=ap.parse_args()
    edit_path=ROOT/"data/portfolio-film-edit.json"
    if args.if_needed and edit_path.exists() and json.loads(edit_path.read_text()).get("revision")==REVISION:
        print("Current film revision already generated; verified public media retained.",flush=True)
        return
    WORK.mkdir(parents=True,exist_ok=True)
    prepare_baseline()
    data=json.loads(run(["node","--input-type=module","-e",
      "import {projects,projectCollections,credentials,portfolio} from './data/portfolio.ts'; console.log(JSON.stringify({projects,projectCollections,credentials,portfolio}));"]))
    projects={p["slug"]:p for p in data["projects"]}
    groups={slug:c for c in data["projectCollections"] for slug in c["projectSlugs"]}
    storyboard=json.loads((BASE/"portfolio-film-storyboard.json").read_text())
    scope={p["slug"]:p for p in storyboard["projectChapters"]}
    baseline=json.loads((BASE/"portfolio-film-timeline.json").read_text())
    chapters={c["id"]:c for c in baseline["chapters"]}
    order=["intro","kaig","hpp","alu","mkz","sdm","jdp","salb","blue","niq","zad","selected-work"]
    project_order=[cid for cid in order if cid=="niq" or chapters[cid]["slug"]]
    cards={chapters[cid]["slug"]:project_card(projects[chapters[cid]["slug"]],scope[chapters[cid]["slug"]],groups[chapters[cid]["slug"]],i+1)
      for i,cid in enumerate(project_order) if cid!="niq"}
    design_scope_card = selected_work_card()
    marsa_drawing_card = full_marsa_drawing_card()
    niqat_cards = niqat_model_cards(projects["niqat-project"])
    certificates=certificate_cards(data)
    scenes=[];output_chapters=[];cursor=0
    cues=read_cues();assert len(cues)==52,len(cues)
    removed_duplicates=[]
    for cid in order:
        if cid=="niq":
            project=projects["niqat-project"];group=groups[project["slug"]]
            new={"id":cid,"title":project["title"],"role":project["role"],"slug":project["slug"],
              "collectionId":group["id"],"collectionTitle":group["title"],"collectionContext":group["context"],"start":cursor/FPS}
            for i,(path,caption,asset) in enumerate(niqat_cards):
                frames=86 if i==0 else 57
                scene={"image":str(path),"frames":frames,"chapter":cid,"caption":caption,
                  "start":cursor/FPS,"end":(cursor+frames)/FPS}
                if asset:scene["asset"]=asset
                scenes.append(scene);cursor+=frames
            new["end"]=cursor/FPS;output_chapters.append(new)
            continue
        old=chapters[cid];new=dict(old);new["start"]=cursor/FPS
        slug=old["slug"]
        if slug:
            group=groups[slug]
            new.update(collectionId=group["id"],collectionTitle=group["title"],collectionContext=group["context"])
        for a,b,caption in cues:
            if a < old["start"]-1e-5 or b > old["end"]+1e-5:continue
            if cid=="mkz" and abs(a-34.25)<1e-5 and abs(b-36)<1e-5:
                removed_duplicates.append({"sourceStart":a,"sourceEnd":b,"chapter":cid,
                    "reason":"User-confirmed duplicate Zone 9 drawing; same geometry as Zone 8."})
                continue
            count=round((b-a)*SOURCE_FPS)
            scene={"sourceStart":a,"sourceEnd":b,"sourceFrames":count,"frames":count,
              "speedNumerator":16,"speedDenominator":19,"chapter":cid,"caption":caption}
            if cid=="intro":scene.update(frames=86,speedNumerator=1,speedDenominator=1)
            if slug and abs(a-old["start"])<1e-5:
                project=projects[slug];group=groups[slug]
                scene["image"]=str(cards[slug])
                scene["caption"]=" ".join([project["title"]+".",group["title"]+".",
                  "Owner: "+project["client"]+"." if project.get("client") else "",
                  "Consultant: "+project["consultant"].replace(" / Parsons","; Owner's Consultant: Parsons")+"." if project.get("consultant") else "",
                  (project.get("companyLabel") or ("Project team" if slug=="blue-development" else "Contractor"))+": "+project["company"]+".",
                  "My role: "+project["role"]+".",
                  "; ".join(w["label"]+": "+w["detail"] for w in scope[slug]["workstreams"])+"."])
            if cid=="mkz" and abs(a-32.5)<1e-5 and abs(b-34.25)<1e-5:
                scene["image"]=str(marsa_drawing_card)
                scene["asset"]="/images/safwa-shopdrawing/al-khuzama-gardens-zone-8.jpg"
                scene["caption"]="Marsa Khuzam. Complete landscape shop drawing sheet for Al-Khuzama Gardens Zones 8 and 9."
            if cid=="selected-work" and abs(a-old["start"])<1e-5:
                scene["image"]=str(design_scope_card)
                scene["caption"]="Selected architectural work. My scope: design. Residential, landscape, commercial and facade projects."
            elif cid=="selected-work":
                scene["caption"]=caption.replace("Design and visualization. Behance portfolio.", "My scope: design. Selected Behance work.")
            scene["start"]=cursor/FPS;cursor+=scene["frames"];scene["end"]=cursor/FPS;scenes.append(scene)
        new["end"]=cursor/FPS;output_chapters.append(new)
    credential_start=cursor/FPS
    for i,(path,caption) in enumerate(certificates):
        frames=203 if i<2 else 204
        scenes.append({"image":str(path),"frames":frames,"chapter":"credentials","caption":caption,
          "start":cursor/FPS,"end":(cursor+frames)/FPS});cursor+=frames
    output_chapters.append({"id":"credentials","title":"Certificates & professional accreditation",
      "role":"SCE · Niqat Global · Plannerly · KAITECH","slug":None,"start":credential_start,"end":cursor/FPS})
    scenes.append({"sourceStart":88.5,"sourceEnd":90,"sourceFrames":72,"frames":85,
      "speedNumerator":1,"speedDenominator":1,"chapter":"contact","caption":cues[-1][2],"start":cursor/FPS,"end":90})
    output_chapters.append({**chapters["contact"],"title":"Contact Shaher","start":cursor/FPS,"end":90})
    cursor+=85;assert cursor==90*FPS,cursor
    ranges=sorted((s["sourceStart"],s["sourceEnd"]) for s in scenes if "sourceStart" in s)
    assert len(ranges)==51 and ranges[0][0]==0 and ranges[-1][1]==90
    assert [(a[1],b[0]) for a,b in zip(ranges,ranges[1:]) if abs(a[1]-b[0])>1e-6]==[(34.25,36)],ranges
    assert len(removed_duplicates)==1
    manifest={"revision":REVISION,"duration":90,"fps":FPS,"frames":cursor,"baselineSha256":hashlib.sha256((BASE/"shaher-portfolio-film.mp4").read_bytes()).hexdigest(),
      "certificateImageCount":7,"certificatePages":3,"sourceSceneCount":51,"publishedSceneCount":len(scenes),
      "removedDuplicateScenes":removed_duplicates,
      "projectOrder":["niqat-project" if cid=="niq" else chapters[cid]["slug"] for cid in project_order],
      "scenes":[{k:v for k,v in s.items() if k!="image"}|({"card":Path(s["image"]).name} if "image" in s else {}) for s in scenes]}
    (WORK/"edit-manifest.json").write_text(json.dumps(manifest,indent=2)+"\n")
    print("Cards prepared; full Marsa sheet and Niqat IFC-derived views included; 51 source scenes retained; duplicate removed; 7 certificates on 3 pages.",flush=True)
    if not args.encode:return
    with ThreadPoolExecutor(max_workers=1) as pool:
        files=list(pool.map(encode_clip,enumerate(scenes)))
    (WORK/"concat.txt").write_text("\n".join(f"file '{p.as_posix()}'" for p in files)+"\n")
    metadata=";FFMETADATA1\n"
    for c in output_chapters:
        metadata+=f"[CHAPTER]\nTIMEBASE=1/57000\nSTART={round(c['start']*57000)}\nEND={round(c['end']*57000)}\ntitle={c['title']}\n"
    (WORK/"chapters.ffmetadata").write_text(metadata)
    final=WORK/"shaher-portfolio-film.mp4"
    run(["ffmpeg","-hide_banner","-loglevel","error","-nostdin","-xerror","-y","-f","concat","-safe","0","-i",str(WORK/"concat.txt"),
      "-i",str(WORK/"chapters.ffmetadata"),"-map","0:v:0","-map_metadata","1","-map_chapters","1",
      "-c","copy","-an","-movflags","+faststart",str(final)])
    info=probe(final);video=next(s for s in info["streams"] if s["codec_type"]=="video")
    assert video["width"]==W and video["height"]==H and int(video["nb_frames"])==90*FPS
    assert abs(float(info["format"]["duration"])-90)<1e-6
    assert not any(s["codec_type"]=="audio" for s in info["streams"])
    media=ROOT/"public/media";media.joinpath(final.name).write_bytes(final.read_bytes())
    Image.open(cards["king-abdullah-international-gardens"]).convert("RGB").save(media/"shaher-portfolio-film-poster.jpg",quality=94)
    timeline={**baseline,"video":"/media/shaher-portfolio-film.mp4?v=13","poster":"/media/shaher-portfolio-film-poster.jpg?v=13","captions":"/media/shaher-portfolio-film.vtt?v=13",
      "chapterTrack":"/media/shaher-portfolio-film-chapters.vtt?v=13","chapters":output_chapters}
    (ROOT/"data/portfolio-film-timeline.json").write_text(json.dumps(timeline,indent=2,ensure_ascii=False)+"\n")
    media.joinpath("shaher-portfolio-film.vtt").write_text("WEBVTT\n\n"+"\n\n".join(f"{stamp(s['start'])} --> {stamp(s['end'])}\n{s['caption']}" for s in scenes)+"\n")
    media.joinpath("shaher-portfolio-film-chapters.vtt").write_text("WEBVTT\n\n"+"\n\n".join(f"{stamp(c['start'])} --> {stamp(c['end'])}\n{c['title']}" for c in output_chapters)+"\n")
    (ROOT/"data/portfolio-film-edit.json").write_text(json.dumps(manifest,indent=2,ensure_ascii=False)+"\n")
    niqat_scope={"slug":"niqat-project","scopeSeconds":86/FPS,"evidence":"IFC-derived model views","evidenceSeconds":171/FPS,
      "workstreams":[{"label":"Architectural collaboration","detail":"Work with the Niqat team"},
        {"label":"IFC-derived model","detail":"Approved geometry and appearance"},
        {"label":"Three perspectives","detail":"Overview, side and reverse views"}]}
    new_storyboard={**storyboard,"duration":90,"publishedDuration":90,"playbackSpeed":1,
      "introSeconds":86/FPS,"outroSeconds":85/FPS,"selectedWorkSeconds":768/FPS,"credentialsSeconds":610/FPS,
      "source":f"Published approved baseline at {BASELINE_COMMIT}","revision":"Complete Marsa sheet, Niqat IFC-derived views and Security consultant",
      "projectChapters":[niqat_scope if slug=="niqat-project" else
        {**scope[slug],"scopeSeconds":scope[slug]["scopeSeconds"]*8/19,"evidenceSeconds":scope[slug]["evidenceSeconds"]*8/19-(84/FPS if slug=="marsa-khuzam" else 0)}
        for slug in manifest["projectOrder"]]}
    (ROOT/"data/portfolio-film-storyboard.json").write_text(json.dumps(new_storyboard,indent=2,ensure_ascii=False)+"\n")
    media_manifest=json.loads((ROOT/"data/github-pages-assets.json").read_text())
    for asset in media_manifest["files"]:
        p=ROOT/"public"/asset["path"]
        if asset["path"].startswith("media/"):
            raw=p.read_bytes();asset.update(size=len(raw),sha256=hashlib.sha256(raw).hexdigest())
    (ROOT/"data/github-pages-assets.json").write_text(json.dumps(media_manifest,indent=2,ensure_ascii=False)+"\n")
    print(f"Verified: 90 seconds, {video['nb_frames']} frames, 1920×1080, no audio. {final.stat().st_size:,} bytes.",flush=True)

if __name__=="__main__":main()

