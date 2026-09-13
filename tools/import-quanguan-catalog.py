"""Import selected Quanguan catalog illustrations into the local website.

The importer keeps supplier references separate from CHUANWEI factory models,
transcribes only table text visible in the supplied catalog pages, and records
the user's website-use authorization for every copied illustration.
"""

from __future__ import annotations

import argparse
import hashlib
import json
import re
from pathlib import Path

from PIL import Image


PROJECT = Path(__file__).resolve().parents[1]
DEFAULT_EXTRACTION = Path(r"D:\work\codex\yunying\outputs\catalog-white-background-extraction\batch-pages-07-end")
DEFAULT_PAGES = Path(r"D:\work\codex\yunying\yunzhan365_泉观消防电子画册\pages")

SERIES = {
    7: ("catalog-brass-finish-hose-valves-page-07", "indoor-hydrants", "Compact Brass-Finish Fire Hose Valves", "صمامات خراطيم حريق مدمجة بتشطيب نحاسي", "室内消防栓"),
    8: ("catalog-brass-finish-hose-valves-page-08", "indoor-hydrants", "Brass-Finish Fire Hose Valve Configurations", "تكوينات صمامات خراطيم حريق بتشطيب نحاسي", "室内消防栓"),
    9: ("catalog-hose-valves-page-09", "indoor-hydrants", "Brass- and Silver-Finish Fire Hose Valves", "صمامات خراطيم حريق بتشطيب نحاسي أو فضي", "室内消防栓"),
    10: ("catalog-hose-valves-page-10", "indoor-hydrants", "Regional-Connection Fire Hose Valves", "صمامات خراطيم حريق بتوصيلات إقليمية", "室内消防栓"),
    11: ("catalog-hose-valves-page-11", "indoor-hydrants", "Flanged and Regional-Connection Fire Hose Valves", "صمامات خراطيم حريق فلنجية وبتوصيلات إقليمية", "室内消防栓"),
    12: ("catalog-hose-valves-page-12", "indoor-hydrants", "French-, NH- and Threaded-Connection Fire Hose Valves", "صمامات خراطيم حريق بتوصيلات فرنسية وNH ولولبية", "室内消防栓"),
    13: ("catalog-twin-outlet-fire-connections-page-13", "fire-department-connections", "Twin-Outlet Fire Service Connection Bodies", "أجسام وصلات خدمة الحريق ثنائية المخرج", "消防水泵接合器"),
    14: ("catalog-hydrant-auxiliary-valves-page-14", "indoor-hydrants", "Hydrant Valves and Auxiliary Valves", "صمامات محابس الحريق والصمامات المساعدة", "室内消防栓"),
    15: ("catalog-fire-connections-distributors-page-15", "fire-department-connections", "Fire Service Connections and Two-Way Distributors", "وصلات خدمة الحريق وموزعات ثنائية الاتجاه", "消防水泵接合器"),
    16: ("catalog-long-straight-stream-nozzles-page-16", "hoses-nozzles-couplings", "Long Straight-Stream Fire Hose Nozzles", "فوهات خراطيم حريق طويلة ذات نفث مستقيم", "消防水枪"),
    17: ("catalog-compact-straight-stream-nozzles-page-17", "hoses-nozzles-couplings", "Compact Straight-Stream Fire Hose Nozzles", "فوهات خراطيم حريق مدمجة ذات نفث مستقيم", "消防水枪"),
    18: ("catalog-coupled-lever-nozzles-page-18", "hoses-nozzles-couplings", "Coupled and Lever-Operated Fire Hose Nozzles", "فوهات خراطيم حريق مزودة بوصلات أو أذرع تشغيل", "消防水枪"),
    19: ("catalog-nozzles-inductors-connections-page-19", "hoses-nozzles-couplings", "Nozzles, Foam Inductors and Fire Service Connections", "فوهات ومحاثات رغوة ووصلات خدمة الحريق", "消防水枪"),
    20: ("catalog-fire-hose-couplings-page-20", "hoses-nozzles-couplings", "Fire Hose Couplings — NH, GOST, UNI and BS 336", "وصلات خراطيم حريق بنظم NH وGOST وUNI وBS 336", "消防水枪"),
    21: ("catalog-fire-hose-adapters-page-21", "hoses-nozzles-couplings", "Fire Hose Couplings and Adapters", "وصلات ومحولات خراطيم الحريق", "消防水枪"),
    22: ("catalog-compact-spray-nozzles-page-22", "hoses-nozzles-couplings", "Compact Spray Nozzles and Coupling Adapters", "فوهات رش مدمجة ومحولات وصلات", "消防水枪"),
    23: ("catalog-red-grip-nozzles-page-23", "hoses-nozzles-couplings", "Red-Grip Fire Hose Nozzles", "فوهات خراطيم حريق بمقبض أحمر", "消防水枪"),
    24: ("catalog-hose-tails-adapters-page-24", "hoses-nozzles-couplings", "Hose Tails and Threaded Adapters", "نهايات خراطيم ومحولات لولبية", "消防水枪"),
    25: ("catalog-threaded-adapters-caps-page-25", "hoses-nozzles-couplings", "Threaded Adapters and Blank Caps", "محولات لولبية وأغطية عمياء", "消防水枪"),
    26: ("catalog-blank-caps-plug-adapters-page-26", "hoses-nozzles-couplings", "Blank Caps and Threaded Plug Adapters", "أغطية عمياء ومحولات سدادة لولبية", "消防水枪"),
    27: ("catalog-hose-reel-parts-page-27", "hose-reels", "Fire Hose Reel Swivel Joints and Supports", "وصلات دوارة ودعامات لبكرات خراطيم الحريق", "软管卷盘"),
    28: ("catalog-hose-assemblies-reels-page-28", "hose-reels", "Fire Hose Assemblies and Hose Reels", "مجموعات خراطيم وبكرات خراطيم الحريق", "软管卷盘"),
    30: ("catalog-fire-cabinets-page-30", "fire-equipment-cabinets", "Hose Reel, Extinguisher and Combined Cabinets", "خزائن بكرات الخراطيم وطفايات الحريق والخزائن المدمجة", "消防器材箱"),
    31: ("catalog-outdoor-hydrant-configurations-page-31", "outdoor-hydrants", "Pillar and Standpipe Fire Hydrant Configurations", "تكوينات صنابير الحريق العمودية وأنابيب الصعود", "室外消防栓"),
}

BASE_TYPES = {
    "泡沫比例混合器组件": ("Foam Inductor Assembly", "مجموعة محاث رغوة"),
    "卷盘摆臂支架": ("Hose Reel Swing-Arm Bracket", "حامل ذراع متأرجح لبكرة الخرطوم"),
    "卷盘管架组件": ("Hose Reel Support Assembly", "مجموعة دعم بكرة الخرطوم"),
    "卷盘旋转接头": ("Hose Reel Swivel Joint", "وصلة دوارة لبكرة الخرطوم"),
    "快接水枪接头": ("Quick-Connect Nozzle Adapter", "محول فوهة سريع التوصيل"),
    "水带尾接头": ("Hose Tail Coupling", "وصلة نهاية خرطوم"),
    "带链闷盖接头": ("Chained Blank-Cap Coupling", "وصلة غطاء أعمى بسلسلة"),
    "消防接合器": ("Fire Department Connection", "وصلة تزويد نظام الحريق بالمياه"),
    "消防分水器": ("Two-Way Fire Hose Distributor", "موزع خرطوم حريق ثنائي الاتجاه"),
    "直流水枪": ("Straight-Stream Fire Hose Nozzle", "فوهة خرطوم حريق ذات نفث مستقيم"),
    "喷雾水枪": ("Spray Fire Hose Nozzle", "فوهة رش لخرطوم الحريق"),
    "开关水枪": ("Shutoff Fire Hose Nozzle", "فوهة خرطوم حريق مزودة بصمام إغلاق"),
    "小水枪": ("Compact Fire Hose Nozzle", "فوهة خرطوم حريق مدمجة"),
    "水带接扣": ("Fire Hose Coupling", "وصلة خرطوم حريق"),
    "转换接头": ("Fire Hose Adapter", "محول خرطوم حريق"),
    "尾接头": ("Hose Tail Coupling", "وصلة نهاية خرطوم"),
    "闷盖接头": ("Blank-Cap Coupling", "وصلة غطاء أعمى"),
    "闷盖": ("Blank Cap", "غطاء أعمى"),
    "消防水带": ("Fire Hose Assembly", "مجموعة خرطوم حريق"),
    "消防卷盘": ("Fire Hose Reel", "بكرة خرطوم حريق"),
    "卷盘箱": ("Hose Reel Cabinet", "خزانة بكرة خرطوم"),
    "灭火器箱": ("Fire Extinguisher Cabinet", "خزانة طفاية حريق"),
    "消防箱": ("Fire Equipment Cabinet", "خزانة معدات حريق"),
    "室外消火栓": ("Outdoor Fire Hydrant", "صنبور حريق خارجي"),
    "消火栓": ("Fire Hydrant", "صنبور حريق"),
    "消防阀": ("Fire Hose Valve", "صمام خرطوم حريق"),
    "直通阀": ("Straight-Through Valve", "صمام مستقيم"),
    "球阀": ("Ball Valve", "صمام كروي"),
    "阀门": ("Valve", "صمام"),
    "水枪": ("Fire Hose Nozzle", "فوهة خرطوم حريق"),
    "接扣": ("Fire Hose Coupling", "وصلة خرطوم حريق"),
    "接头": ("Coupling", "وصلة"),
}

DESCRIPTORS = {
    "红铜双色": ("Red-and-Brass-Finish", "أحمر وبتشطيب نحاسي"),
    "红黑": ("Red-and-Black", "أحمر وأسود"),
    "白红": ("White-and-Red", "أبيض وأحمر"),
    "黄铜": ("Brass-Finish", "بتشطيب نحاسي"),
    "红色": ("Red", "أحمر"),
    "银色": ("Silver-Finish", "بتشطيب فضي"),
    "黑色": ("Black", "أسود"),
    "金色": ("Brass-Finish", "بتشطيب نحاسي"),
    "白色": ("White", "أبيض"),
    "大斜出口": ("Large Angled-Outlet", "بمخرج مائل كبير"),
    "小斜出口": ("Compact Angled-Outlet", "بمخرج مائل مدمج"),
    "左斜出口": ("Left Angled-Outlet", "بمخرج أيسر مائل"),
    "斜出口": ("Angled-Outlet", "بمخرج مائل"),
    "外螺纹底口": ("Male-Threaded Bottom-Inlet", "بمدخل سفلي ملولب خارجي"),
    "内螺纹底口": ("Female-Threaded Bottom-Inlet", "بمدخل سفلي ملولب داخلي"),
    "法式卡口": ("French-Connection", "بتوصيل فرنسي"),
    "法式": ("French-Pattern", "بالنمط الفرنسي"),
    "卡式接头": ("Claw-Coupling", "بوصلة مخلبية"),
    "横向手轮": ("Horizontal-Handwheel", "بعجلة تشغيل أفقية"),
    "白红手轮": ("White-and-Red-Handwheel", "بعجلة تشغيل بيضاء وحمراء"),
    "红手轮": ("Red-Handwheel", "بعجلة تشغيل حمراء"),
    "黑手轮": ("Black-Handwheel", "بعجلة تشغيل سوداء"),
    "黑握把": ("Black-Grip", "بمقبض أسود"),
    "红握把": ("Red-Grip", "بمقبض أحمر"),
    "双外螺纹": ("Twin Male-Threaded", "بلولبين خارجيين"),
    "双接口": ("Twin-Connection", "ثنائي التوصيل"),
    "带压力表": ("With Pressure Gauge", "مع مقياس ضغط"),
    "上下实门": ("Stacked Solid-Door", "بأبواب مصمتة متراصة"),
    "方形单门": ("Square Single-Door", "مربع بباب واحد"),
    "双门落地": ("Floor-Standing Double-Door", "أرضي ببابين"),
    "单窗落地": ("Floor-Standing Single-Window", "أرضي بنافذة واحدة"),
    "上下双门": ("Stacked Double-Door", "ببابين متراصين"),
    "带锁环": ("With Locking Ring", "مع حلقة قفل"),
    "带黑盖": ("With Black Cap", "مع غطاء أسود"),
    "双层耳底": ("Double-Lug Base", "بقاعدة مزدوجة العروات"),
    "双耳底": ("Double-Lug Base", "بقاعدة مزدوجة العروات"),
    "顶部锁扣": ("Top-Latch", "بقفل علوي"),
    "红端锁扣": ("Red-End Latch", "بقفل طرفي أحمر"),
    "带链": ("Chained", "بسلسلة"),
    "双盖": ("Twin-Cap", "بغطاءين"),
    "双锁扣": ("Double-Latch", "بقفلين"),
    "双层耳": ("Double-Lug", "مزدوج العروات"),
    "双手轮": ("Twin-Handwheel", "بعجلتي تشغيل"),
    "双柄": ("Twin-Lever", "بذراعين"),
    "双阀": ("Twin-Valve", "بصمامين"),
    "双口": ("Two-Way", "ثنائي المداخل"),
    "四口": ("Four-Way", "رباعي المداخل"),
    "三接口": ("Three-Connection", "ثلاثي التوصيل"),
    "内螺纹": ("Female-Threaded", "ملولب داخلياً"),
    "外螺纹": ("Male-Threaded", "ملولب خارجياً"),
    "螺纹": ("Threaded", "ملولب"),
    "直角": ("Right-Angle", "بزاوية قائمة"),
    "左出口": ("Left-Outlet", "بمخرج أيسر"),
    "右出口": ("Right-Outlet", "بمخرج أيمن"),
    "水带接头": ("Hose-Tail", "بنهاية خرطوم"),
    "直口": ("Straight-Outlet", "بمخرج مستقيم"),
    "银头": ("Silver-Finish Head", "برأس فضي"),
    "黑头": ("Black Head", "برأس أسود"),
    "铜尾": ("Brass-Finish Tail", "بنهاية نحاسية المظهر"),
    "黑盖": ("Black-Cap", "بغطاء أسود"),
    "金盖": ("Brass-Finish Cap", "بغطاء نحاسي المظهر"),
    "带盖": ("Capped", "مزود بغطاء"),
    "法兰": ("Flanged", "فلنجي"),
    "卡扣": ("Latch-Coupled", "بوصلة قفل"),
    "活接": ("Union", "بوصلة اتحاد"),
    "带盘": ("Flanged-Base", "بقاعدة فلنجية"),
    "厚底": ("Heavy-Base", "بقاعدة سميكة"),
    "筒体": ("Barrel-Body", "بجسم أسطواني"),
    "圆体": ("Round-Body", "بجسم دائري"),
    "锥形": ("Tapered", "مخروطي"),
    "短款": ("Compact", "مدمج"),
    "细长": ("Slim Long", "طويل ونحيف"),
    "长柄": ("Long-Lever", "بذراع طويل"),
    "长款": ("Long", "طويل"),
    "分段": ("Segmented", "مجزأ"),
    "双耳": ("Double-Lug", "مزدوج العروات"),
    "盘底": ("Disc-Base", "بقاعدة قرصية"),
    "平底": ("Flat-Base", "بقاعدة مسطحة"),
    "插口": ("Plug-In", "بتوصيل إدخال"),
    "横柄": ("Side-Handle", "بمقبض جانبي"),
    "手柄": ("Lever-Operated", "يعمل بذراع"),
    "卡口": ("Claw-Coupled", "بوصلة مخلبية"),
    "卡爪": ("Claw", "مخلبي"),
    "圆环": ("Ring-Type", "حلقي"),
    "红圈": ("Red-Seal", "بحلقة حمراء"),
    "黑圈": ("Black-Seal", "بحلقة سوداء"),
    "六角": ("Hexagonal", "سداسي"),
    "短筒": ("Short-Barrel", "بجسم قصير"),
    "齿口": ("Serrated-Tip", "بطرف مسنن"),
    "滚花": ("Knurled", "محزز"),
    "内牙": ("Female-Threaded", "ملولب داخلياً"),
    "双爪": ("Twin-Claw", "ثنائي المخالب"),
    "圆盘": ("Disc-Type", "قرصي"),
    "腰槽": ("Waist-Grooved", "بمجرى وسطي"),
    "细链": ("Fine-Chain", "بسلسلة دقيقة"),
    "铜端": ("Brass-Finish Ends", "بنهايات نحاسية المظهر"),
    "摆臂": ("Swing-Arm", "بذراع متأرجح"),
    "条纹": ("Striped", "مخطط"),
    "支架": ("Bracket-Mounted", "مثبت بحامل"),
    "窄窗": ("Narrow-Window", "بنافذة ضيقة"),
    "单瓶": ("Single-Extinguisher", "لطفاية واحدة"),
    "中窗": ("Center-Window", "بنافذة وسطية"),
    "长管": ("Long-Riser", "بأنبوب صاعد طويل"),
    "链盖": ("Chained-Cap", "بغطاء ذي سلسلة"),
    "立式": ("Standpipe", "بأنبوب قائم"),
    "宽头": ("Wide-Head", "برأس عريض"),
    "短": ("Compact", "مدمج"),
    "长": ("Long", "طويل"),
}

NAME_OVERRIDES = {
    "银色水带接头黄铜消防阀": {
        "en": "Brass-Finish Fire Hose Valve with Silver-Finish Hose Tail",
        "ar": "صمام خرطوم حريق بتشطيب نحاسي ونهاية خرطوم فضية",
    },
    "黄铜银色卡式接头消防阀": {
        "en": "Brass-Finish Fire Hose Valve with Silver-Finish Claw Coupling",
        "ar": "صمام خرطوم حريق بتشطيب نحاسي ووصلة مخلبية فضية",
    },
    "黄铜金色卡式接头消防阀": {
        "en": "Brass-Finish Claw-Coupling Fire Hose Valve",
        "ar": "صمام خرطوم حريق بوصلة مخلبية وتشطيب نحاسي",
    },
    "银色铜端卷盘旋转接头": {
        "en": "Silver-Finish Hose Reel Swivel Joint with Brass-Finish Ends",
        "ar": "وصلة دوارة لبكرة الخرطوم بتشطيب فضي ونهايات نحاسية المظهر",
    },
    "红色单瓶灭火器箱": {
        "en": "Red Single-Extinguisher Cabinet",
        "ar": "خزانة حمراء لطفاية حريق واحدة",
    },
}


def center_x(region: dict) -> float:
    return sum(point[0] for point in region["box"]) / 4


def center_y(region: dict) -> float:
    return sum(point[1] for point in region["box"]) / 4


def clean_value(value: str) -> str:
    value = value.replace("Φ", " mm").replace("J1S", "JIS").replace("JIS10k", "JIS 10K").replace("MM", "mm")
    if value == '7"':
        value = '1"'
    value = re.sub(r'(?<=\d)"', " in ", value)
    value = re.sub(r'(?<=\d)(BSP|NPT|NH|GOST|Storz|BS336|BS4504|JIS|French)', r" in \1", value)
    if re.fullmatch(r"\d+(?:\.\d+)?mm", value):
        value = "Ø" + value
    value = value.replace("*", " × ")
    value = re.sub(r"(?<=\d)mm\b", " mm", value)
    return re.sub(r"\s+", " ", value).strip()


def translate_name(source_name: str) -> dict[str, str]:
    if source_name in NAME_OVERRIDES:
        return NAME_OVERRIDES[source_name]
    remainder = source_name
    base_key = next((key for key in sorted(BASE_TYPES, key=len, reverse=True) if key in remainder), None)
    if not base_key:
        raise ValueError(f"No product type translation for {source_name}")
    remainder = remainder.replace(base_key, "", 1)
    translated: list[tuple[str, str]] = []
    while remainder:
        token = next((key for key in sorted(DESCRIPTORS, key=len, reverse=True) if remainder.startswith(key)), None)
        if not token:
            raise ValueError(f"Untranslated name fragment {remainder!r} in {source_name}")
        translated.append(DESCRIPTORS[token])
        remainder = remainder[len(token):]
    base_en, base_ar = BASE_TYPES[base_key]
    return {
        "en": " ".join([part[0] for part in translated] + [base_en]),
        "ar": " ".join([base_ar] + [part[1] for part in translated]),
    }


def load_or_run_ocr(pages_root: Path, cache: Path) -> dict:
    if cache.exists():
        return json.loads(cache.read_text(encoding="utf-8"))
    from rapidocr_onnxruntime import RapidOCR
    engine = RapidOCR()
    output = {}
    for page in SERIES:
        result, _ = engine(str(pages_root / f"page_{page:02d}.webp"))
        output[str(page)] = [{"box": item[0], "text": item[1], "score": item[2]} for item in (result or [])]
        print(f"OCR page {page}: {len(output[str(page)])} regions")
    cache.write_text(json.dumps(output, ensure_ascii=False, indent=2), encoding="utf-8")
    return output


def page_segments(page: int, ocr: dict) -> list[list[str]]:
    regions = ocr[str(page)]
    headers = sorted((r for r in regions if r["text"] == "Product.NO"), key=center_y)
    segments = []
    for number, header in enumerate(headers):
        y0 = center_y(header) - 15
        y1 = center_y(headers[number + 1]) - 15 if number + 1 < len(headers) else 2600
        part = [r for r in regions if y0 <= center_y(r) < y1 and center_x(r) > 800]
        has_outlet = any(r["text"] == "Outlet" for r in part)
        has_dimension = any(r["text"] == "Dimension" for r in part)
        codes = sorted((r for r in part if re.match(r"^QG/MS-", r["text"])), key=center_y)
        options = []
        for code_number, code in enumerate(codes):
            y = center_y(code)
            next_y = center_y(codes[code_number + 1]) if code_number + 1 < len(codes) else y1
            values = [r for r in part if center_x(r) > 1200
                      and r["text"] not in ("Inlet", "Outlet", "Dimension")
                      and not re.match(r"^QG/MS-", r["text"])
                      and y - 28 <= center_y(r) < next_y - 18]
            same_row = sorted((r for r in values if abs(center_y(r) - y) < 28), key=center_x)
            continuation = sorted((r for r in values if center_y(r) >= y + 28), key=lambda r: (center_y(r), center_x(r)))
            values = [clean_value(r["text"]) for r in same_row + continuation]
            reference = code["text"].replace("QG/MS-", "")
            if has_dimension:
                description = f"{reference}: dimension {values[0]}" if values else f"{reference}: dimensions to be confirmed"
            elif has_outlet:
                if len(values) >= 2:
                    description = f"{reference}: inlet {values[0]}; outlet {values[1]}"
                    if len(values) > 2:
                        description += f"; alternate {' / '.join(values[2:])}"
                elif values:
                    description = f"{reference}: catalog connection data {' / '.join(values)}"
                else:
                    description = f"{reference}: connections to be confirmed"
            else:
                description = f"{reference}: inlet {values[0]}" if values else f"{reference}: connection to be confirmed"
            options.append(description)
        segments.append(options)
    return segments


def selected_manifest_items(extraction_root: Path, page: int) -> list[dict]:
    manifest = extraction_root / f"page_{page:02d}" / "page-manifest.json"
    records = json.loads(manifest.read_text(encoding="utf-8-sig"))
    selected = [record for record in records if record.get("selected") is True]
    return sorted(selected, key=lambda record: int(re.match(r"\d+", str(record["index"])).group()))


def sha256(path: Path) -> str:
    return hashlib.sha256(path.read_bytes()).hexdigest()


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("--extraction-root", type=Path, default=DEFAULT_EXTRACTION)
    parser.add_argument("--pages-root", type=Path, default=DEFAULT_PAGES)
    parser.add_argument("--ocr-cache", type=Path, default=PROJECT / "tmp-catalog-ocr.json")
    args = parser.parse_args()

    ocr = load_or_run_ocr(args.pages_root, args.ocr_cache)
    data = {
        "version": 1,
        "status": "local-draft",
        "source": "User-supplied Quanguan electronic catalog pages 07-31 and selected white-background reconstruction manifests",
        "imageUse": "User instructed that these images be placed on the CHUANWEI FIRE official website on 2026-09-13",
        "series": [],
    }
    rights = {
        "status": "confirmed",
        "scope": "CHUANWEI FIRE official website public display",
        "confirmedAt": "2026-09-13",
        "confirmation": "The user explicitly instructed Codex to place the images from catalog-white-background-extraction on the official website.",
        "imageNature": "AI-reconstructed catalog marketing illustrations; not technical, dimensional, material, certification or exact-construction evidence.",
        "images": [],
    }

    for page, (series_id, family_id, title_en, title_ar, folder) in SERIES.items():
        segments = page_segments(page, ocr)
        items = []
        for record in selected_manifest_items(args.extraction_root, page):
            index = int(re.match(r"\d+", str(record["index"])).group())
            segment_index = (0 if index in (1, 2) else index - 2) if page == 24 else index - 1
            details = segments[segment_index]
            if not details:
                details = [re.sub(r"^QG/MS-", "", str(record["models"])) + ": connection or dimensions to be confirmed"]
            key = f"p{page:02d}-{index:02d}"
            source_image = Path(record["output"])
            relative_image = Path("products") / folder / series_id / f"{key}.webp"
            destination = PROJECT / relative_image
            destination.parent.mkdir(parents=True, exist_ok=True)
            with Image.open(source_image) as image:
                image.convert("RGB").resize((1000, 1000), Image.Resampling.LANCZOS).save(destination, "WEBP", quality=86, method=6)
            old_png = destination.with_suffix(".png")
            if old_png.exists():
                old_png.unlink()
            item_name = translate_name(record["product"])
            references = " / ".join(option.split(":", 1)[0] for option in details)
            item = {
                "key": key,
                "sourceName": record["product"],
                "name": item_name,
                "sourceReferences": references,
                "sourceOptions": details,
                "image": relative_image.as_posix(),
                "imageDimensions": {"width": 1000, "height": 1000},
                "sourceImage": source_image.as_posix(),
            }
            items.append(item)
            rights["images"].append({
                "productId": series_id,
                "path": relative_image.as_posix(),
                "sha256": sha256(destination),
                "sourcePath": source_image.as_posix(),
                "usage": "Configuration illustration; exact technical details require confirmation.",
            })
        data["series"].append({
            "page": page,
            "id": series_id,
            "routeId": f"product:{series_id}",
            "familyId": family_id,
            "folder": folder,
            "title": {"en": title_en, "ar": title_ar},
            "sourceCatalogPage": (args.pages_root / f"page_{page:02d}.webp").as_posix(),
            "items": items,
        })

    data_path = PROJECT / "site-src" / "_data" / "catalog-expansion.json"
    data_path.write_text(json.dumps(data, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    rights_path = PROJECT / "docs" / "release" / "quanguan-catalog-expansion-20260913" / "image-rights-confirmation.json"
    rights_path.parent.mkdir(parents=True, exist_ok=True)
    rights_path.write_text(json.dumps(rights, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    print(f"Imported {sum(len(series['items']) for series in data['series'])} selected configurations across {len(data['series'])} series")
    print(data_path)
    print(rights_path)


if __name__ == "__main__":
    main()
