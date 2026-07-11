import os, shutil, json

BASE = "d:/code/ai-code"
IMG_SRC = os.path.join(BASE, "产品图")
DEST = os.path.join(BASE, "products")

# Product config: folder_name -> (display_name_cn, display_name_en, english_path_name, description, features)
PRODUCTS = {
    "消防喷头": ("洒水喷头", "Fire Sprinklers", "sprinklers",
        "川维消防生产的洒水喷头采用优质玻璃球感温元件，响应迅速、性能稳定。产品涵盖K-ZSTDY15-68°C等多种型号，广泛应用于商业建筑、工业厂房、住宅小区等场所的自动喷水灭火系统。",
        "Chuanwei Fire Sprinklers use quality glass bulb thermal elements for fast response and stable performance. Various models available for commercial, industrial and residential automatic sprinkler systems.",
        ["玻璃球感温，响应迅速", "多种温度等级可选", "镀铜/镀铬防腐处理", "适用于湿式/干式系统", "通过CCCF认证"],
        ["Glass bulb fast response", "Multiple temperature ratings", "Copper/chrome plated", "For wet/dry systems", "CCCF certified"]),
    "消防栓箱": ("消火栓箱", "Fire Hydrant Boxes", "hydrant-boxes",
        "川维消防消火栓箱采用优质钢板制成，表面静电喷涂处理，美观耐用。箱体设计合理，内部空间充裕，可容纳消火栓、水带、水枪等完整配置，满足各类建筑消防验收要求。",
        "Chuanwei Fire Hydrant Boxes are made of quality steel with electrostatic喷涂 finish. Spacious interior accommodates hydrant, hose and nozzle for fire inspection compliance.",
        ["优质钢板制造", "静电喷涂表面处理", "内部空间充裕", "安装方便快捷", "满足消防验收标准"],
        ["Quality steel construction", "Electrostatic coating", "Spacious interior", "Easy installation", "Complies with standards"]),
    "消防水枪": ("消防水枪与水接口", "Fire Nozzles & Couplings", "nozzles",
        "川维消防消防水枪及接口配件产品齐全，包括直流开关水枪、多功能水枪、KD65/KY65内扣式接口等，工艺先进，性能可靠，是消防灭火系统中的关键配套设备。",
        "Chuanwei Fire Nozzles and couplings include straight-stream nozzles, multi-purpose nozzles, KD65/KY65 couplings. Advanced technology for reliable firefighting performance.",
        ["多种水枪类型可选", "接口密封性好", "耐高压设计", "操作简单方便", "与消火栓完美适配"],
        ["Multiple nozzle types", "Excellent seal", "High-pressure rated", "Easy operation", "Compatible with hydrants"]),
    "消防水泵接合器": ("消防水泵接合器", "Fire Pump Adapters", "pump-adapters",
        "川维消防消防水泵接合器是连接消防车与建筑物消防管网的专用接口，采用优质材料制造，结构紧凑、密封可靠，确保在火灾时消防车能够快速向建筑管网供水。",
        "Chuanwei Fire Pump Adapters connect fire trucks to building pipe networks. Quality materials, compact design, reliable sealing for rapid water supply during emergencies.",
        ["优质材料制造", "结构紧凑耐用", "密封性能可靠", "安装维护方便", "消防车快速对接"],
        ["Quality materials", "Compact and durable", "Reliable sealing", "Easy maintenance", "Quick truck connection"]),
    "消防阀": ("消防阀门与蝶阀", "Fire Gate & Butterfly Valves", "gate-valves",
        "川维消防消防阀门系列包括闸阀、蝶阀、信号蝶阀等多种产品，专为消防给水系统设计。产品铸造精良、密封可靠，广泛应用于各类建筑的消防主管网系统中。",
        "Chuanwei Fire Valves include gate valves, butterfly valves and signal butterfly valves for fire water systems. Fine casting, reliable seal for main fire pipelines.",
        ["铸造精良，经久耐用", "密封可靠无泄漏", "开关灵活轻便", "信号蝶阀带反馈功能", "适用于消防主管网"],
        ["Fine casting durable", "Leak-proof seal", "Smooth operation", "Signal feedback available", "For main pipelines"]),
    "消防阀门": ("消防阀", "Fire Valves", "fire-valves",
        "川维消防阀采用优质材料制造，通过手轮/旋钮控制消防管网中水流的通断，结构紧凑、密封可靠，广泛应用于各类建筑的消防管道系统中。",
        "Chuanwei Fire Valves are made of quality materials with handwheel control for on/off water flow in fire pipelines. Compact, reliable seal for building fire systems.",
        ["优质材料制造", "结构紧凑耐用", "密封性能可靠", "手轮启闭灵活", "适用于消防管道系统"],
        ["Quality materials", "Compact durable", "Reliable sealing", "Smooth handwheel", "For fire pipelines"]),
    "软管卷盘": ("消防软管卷盘", "Fire Hose Reels", "hose-reels",
        "川维消防软管卷盘系列产品采用优质材料制造，结构紧凑，操作简便。产品包括消防软管卷盘、消防水带等，适合安装在商业建筑、住宅楼等场所，为初期火灾扑救提供便利。",
        "Chuanwei Fire Hose Reels are made of quality materials, compact design, easy to operate. Suitable for commercial and residential buildings for initial firefighting.",
        ["结构紧凑美观", "操作简便快捷", "软管耐压耐磨", "安装位置灵活", "适合初期火灾扑救"],
        ["Compact design", "Easy operation", "Durable hose", "Flexible installation", "For initial firefighting"]),
}

def generate_detail_page(cn_name, en_name, eng_path, folder, description, description_en, features, feature_ens):
    """Generate a product detail HTML page"""
    img_dir = os.path.join(DEST, folder)
    os.makedirs(img_dir, exist_ok=True)

    # Get all image files in the source folder
    src_folder = os.path.join(IMG_SRC, folder)
    images = []
    if os.path.exists(src_folder):
        for f in sorted(os.listdir(src_folder)):
            if f.lower().endswith(('.jpg', '.jpeg', '.png', '.webp')):
                # Copy image to products folder
                shutil.copy2(os.path.join(src_folder, f), os.path.join(img_dir, f))
                images.append(f)

    # Find main image (主图)
    main_img = None
    other_imgs = []
    for img in images:
        if '主图' in img:
            main_img = img
        else:
            other_imgs.append(img)
    if not main_img and images:
        main_img = images[0]
        other_imgs = images[1:]

    # Add folder prefix to image paths (page is at products/ root, images in subfolder)
    img_prefix = folder + "/"
    if main_img:
        main_img = img_prefix + main_img
    other_imgs = [img_prefix + img for img in other_imgs]

    # Generate related products (exclude self)
    related = [(k, PRODUCTS[k]) for k in PRODUCTS if k != folder][:4]

    features_html = ""
    for i, f in enumerate(features):
        features_html += f'                    <li data-i18n="feat_{i}">✓ {f}</li>\n'

    other_imgs_html = ""
    for img in other_imgs:
        other_imgs_html += f'                <div class="gallery-item"><img loading="lazy" src="{img}" alt="{cn_name}" onclick="openModal(this.src)"></div>\n'

    related_html = ""
    for rf, rp in related:
        related_html += f'''            <a href="{rf}.html" class="related-card">
                <h4 data-i18n="rel_{rf}">{rp[0]}</h4>
                <p>{rp[1]}</p>
            </a>
'''

    # Build related products i18n data
    rel_zh = {}
    rel_en = {}
    for rf, rp in related:
        rel_zh[f"rel_{rf}"] = rp[0]
        rel_en[f"rel_{rf}"] = rp[1]

    # Build i18n translations for this product
    zh_i18n = {
        "prod_name": cn_name,
        "prod_name_en": en_name,
        "prod_desc": description,
        "gallery_title": "系列产品展示",
        "related_title": "相关产品",
        "inquiry_btn": "📩 立即询价",
        "back_btn": "← 返回首页",
        "footer_home": "首页",
        "footer_products": "产品中心",
        "footer_contact": "联系我们",
    }
    en_i18n = {
        "prod_name": en_name,
        "prod_name_en": cn_name,
        "prod_desc": description_en if description_en else description,
        "gallery_title": "Product Gallery",
        "related_title": "Related Products",
        "inquiry_btn": "📩 Send Inquiry",
        "back_btn": "← Back to Home",
        "footer_home": "Home",
        "footer_products": "Products",
        "footer_contact": "Contact Us",
    }
    # Add feature translations
    if feature_ens:
        for i, f in enumerate(feature_ens):
            zh_i18n[f"feat_{i}"] = features[i]
            en_i18n[f"feat_{i}"] = f
    else:
        for i, f in enumerate(features):
            zh_i18n[f"feat_{i}"] = f
            en_i18n[f"feat_{i}"] = f

    # Merge with related product translations
    zh_i18n.update(rel_zh)
    en_i18n.update(rel_en)

    # Build i18n JSON
    i18n_json = json.dumps({"zh": zh_i18n, "en": en_i18n}, ensure_ascii=False)

    html = f'''<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{cn_name} - {en_name} - 川维消防设备有限公司</title>
    <meta name="description" content="川维消防{cn_name}产品，{description[:80]}">
    <link rel="icon" href="../favicon.ico" type="image/x-icon">
    <link rel="apple-touch-icon" href="../apple-touch-icon.png">
    <link rel="canonical" href="https://chuanweifire.com/products/{eng_path}.html">
    <style>
        * {{ box-sizing: border-box; margin: 0; padding: 0; }}
        body {{
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, 'Microsoft YaHei', sans-serif;
            color: #333; line-height: 1.6; background: #fff;
        }}
        img {{ max-width: 100%; display: block; }}
        a {{ text-decoration: none; color: inherit; }}
        .container {{ max-width: 1200px; margin: 0 auto; padding: 0 20px; }}
        :root {{ --primary: #1a5276; --primary-light: #2e86c1; --primary-dark: #0e2f44; --bg-light: #f8f9fa; --text-light: #666; --border: #e0e0e0; }}

        /* Header */
        .header {{
            position: fixed; top: 0; left: 0; width: 100%; z-index: 1000;
            background: #fff; box-shadow: 0 2px 20px rgba(0,0,0,0.08);
        }}
        .header-inner {{ display: flex; align-items: center; justify-content: space-between; padding: 8px 20px; max-width: 1200px; margin: 0 auto; }}
        .logo {{ display: flex; align-items: center; gap: 10px; }}
        .logo-img {{ height: 36px; border-radius: 6px; }}
        .logo-text h1 {{ font-size: 16px; color: var(--primary); }}
        .logo-text span {{ font-size: 10px; color: var(--text-light); }}
        .back-link {{
            display: inline-flex; align-items: center; gap: 6px;
            color: var(--primary); font-size: 14px; font-weight: 500;
            padding: 6px 14px; border-radius: 6px; transition: background 0.2s;
        }}
        .back-link:hover {{ background: #e8f0fe; }}

        /* Product Detail */
        .detail {{ padding: 100px 0 60px; }}
        .detail-grid {{ display: grid; grid-template-columns: 1fr 1fr; gap: 40px; align-items: start; }}
        .main-image {{
            border-radius: 12px; overflow: hidden; border: 1px solid var(--border);
            cursor: pointer; background: #f5f7fa;
        }}
        .main-image img {{ width: 100%; height: auto; object-fit: contain; max-height: 500px; }}
        .product-info h2 {{ font-size: 28px; color: var(--primary); margin-bottom: 6px; }}
        .product-info .en-name {{ font-size: 14px; color: var(--primary-light); margin-bottom: 16px; }}
        .product-info .desc {{ font-size: 14px; color: #555; line-height: 1.8; margin-bottom: 20px; }}
        .features {{ list-style: none; margin-bottom: 24px; }}
        .features li {{ display: flex; align-items: center; gap: 8px; font-size: 14px; color: #444; margin-bottom: 8px; }}
        .features li::before {{ content: '✓'; color: var(--primary-light); font-weight: 700; font-size: 16px; }}
        .inquiry-btn {{
            display: inline-flex; align-items: center; gap: 8px;
            background: var(--primary); color: #fff; padding: 12px 28px;
            border-radius: 8px; font-size: 14px; font-weight: 600;
            transition: background 0.3s; border: none; cursor: pointer;
        }}
        .inquiry-btn:hover {{ background: var(--primary-dark); }}

        /* Gallery */
        .gallery {{ margin-top: 40px; }}
        .gallery h3 {{ font-size: 20px; color: var(--primary); margin-bottom: 16px; }}
        .gallery-grid {{ display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px; }}
        .gallery-item {{
            border-radius: 8px; overflow: hidden; border: 1px solid var(--border);
            cursor: pointer; transition: all 0.3s; background: #f5f7fa;
        }}
        .gallery-item:hover {{ transform: translateY(-3px); box-shadow: 0 8px 20px rgba(0,0,0,0.08); }}
        .gallery-item img {{ width: 100%; height: 180px; object-fit: contain; background: #f5f7fa; }}
        .gallery-item .label {{ padding: 8px 12px; font-size: 12px; color: var(--text-light); text-align: center; }}

        /* Related */
        .related {{ margin-top: 50px; padding-top: 40px; border-top: 1px solid var(--border); }}
        .related h3 {{ font-size: 20px; color: var(--primary); margin-bottom: 16px; }}
        .related-grid {{ display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px; }}
        .related-card {{
            padding: 16px; border-radius: 10px; border: 1px solid var(--border);
            transition: all 0.3s; display: block;
        }}
        .related-card:hover {{ box-shadow: 0 8px 20px rgba(0,0,0,0.06); border-color: var(--primary-light); }}
        .related-card h4 {{ font-size: 14px; color: var(--primary); margin-bottom: 4px; }}
        .related-card p {{ font-size: 12px; color: var(--text-light); line-height: 1.4; }}

        /* Modal */
        .modal {{
            display: none; position: fixed; top: 0; left: 0; width: 100%; height: 100%;
            background: rgba(0,0,0,0.85); z-index: 9999; cursor: pointer;
            align-items: center; justify-content: center;
        }}
        .modal.open {{ display: flex; }}
        .modal img {{ max-width: 90%; max-height: 90%; object-fit: contain; }}
        .modal .close {{
            position: absolute; top: 20px; right: 30px; color: #fff;
            font-size: 36px; cursor: pointer; font-weight: 300;
        }}
        .modal .nav-btn {{
            position: absolute; top: 50%; transform: translateY(-50%);
            background: rgba(255,255,255,0.12); color: #fff;
            border: none; font-size: 28px; padding: 14px 20px;
            cursor: pointer; border-radius: 50%; transition: all 0.3s;
            z-index: 10; line-height: 1;
        }}
        .modal .nav-btn:hover {{ background: rgba(255,255,255,0.3); }}
        .modal .nav-prev {{ left: 16px; }}
        .modal .nav-next {{ right: 16px; }}

        /* Footer */
        .footer {{ background: var(--primary-dark); color: rgba(255,255,255,0.65); padding: 30px 0 20px; text-align: center; font-size: 12px; }}
        .footer a {{ color: rgba(255,255,255,0.8); margin: 0 10px; }}
        .footer a:hover {{ color: var(--primary-light); }}

        @media (max-width: 768px) {{
            .detail-grid {{ grid-template-columns: 1fr; gap: 24px; }}
            .gallery-grid {{ grid-template-columns: repeat(2, 1fr); }}
            .related-grid {{ grid-template-columns: repeat(2, 1fr); }}
            .product-info h2 {{ font-size: 22px; }}
        }}
    </style>
</head>
<body>

    <header class="header">
        <div class="header-inner">
            <a href="../index.html" class="logo">
                <img class="logo-img" src="../apple-touch-icon.png" alt="川维消防">
                <div class="logo-text">
                    <h1>川维消防</h1>
                    <span>Chuanwei Fire</span>
                </div>
            </a>
            <div class="lang-toggle" style="display:inline-flex;align-items:center;gap:4px;background:#f8f9fa;border-radius:8px;padding:3px;border:1px solid #e0e0e0;">
                <button class="lang-btn" style="padding:5px 11px;border:none;border-radius:6px;font-size:12px;font-weight:600;cursor:pointer;background:transparent;color:#666;font-family:inherit;line-height:1;transition:all 0.25s;" onclick="switchLang('zh')">中</button>
                <button class="lang-btn active" style="padding:5px 11px;border:none;border-radius:6px;font-size:12px;font-weight:600;cursor:pointer;background:#1a5276;color:#fff;font-family:inherit;line-height:1;transition:all 0.25s;" onclick="switchLang('en')">EN</button>
            </div>
            <a href="../index.html" class="back-link" data-i18n="back_btn">← 返回首页</a>
        </div>
    </header>

    <section class="detail">
        <div class="container">
            <div class="detail-grid">
                <div class="main-image" onclick="openModal(this.querySelector('img').src)">
                    <img loading="lazy" src="{main_img}" alt="{cn_name}">
                </div>
                <div class="product-info">
                    <h2 data-i18n="prod_name">{cn_name}</h2>
                    <div class="en-name" data-i18n="prod_name_en">{en_name}</div>
                    <p class="desc" data-i18n="prod_desc">{description}</p>
                    <ul class="features">
{features_html}                    </ul>
                    <a href="../index.html#contact" class="inquiry-btn" data-i18n="inquiry_btn">📩 立即询价</a>
                </div>
            </div>

            <div class="gallery">
                <h3 data-i18n="gallery_title">系列产品展示</h3>
                <div class="gallery-grid">
{other_imgs_html}                </div>
            </div>

            <div class="related">
                <h3 data-i18n="related_title">相关产品</h3>
                <div class="related-grid">
{related_html}                </div>
            </div>
        </div>
    </section>

    <footer class="footer">
        <div class="container">
            <p>&copy; 2026 川维消防设备有限公司 | <a href="../index.html" data-i18n="footer_home">首页</a> | <a href="../index.html#products" data-i18n="footer_products">产品中心</a> | <a href="../index.html#contact" data-i18n="footer_contact">联系我们</a></p>
        </div>
    </footer>

    <div class="modal" id="imageModal">
        <span class="close">&times;</span>
        <button class="nav-btn nav-prev" onclick="changeImage(-1)">&#10094;</button>
        <img id="modalImage" src="" alt="">
        <button class="nav-btn nav-next" onclick="changeImage(1)">&#10095;</button>
    </div>

    <script>
        // ===== i18n Translations =====
        const i18n = {i18n_json};

        let currentLang = localStorage.getItem('lang') || 'en';

        function switchLang(lang) {{
            currentLang = lang;
            localStorage.setItem('lang', lang);
            document.querySelectorAll('.lang-btn').forEach(b => {{
                const isActive = b.textContent.trim() === (lang === 'zh' ? '中' : 'EN');
                b.classList.toggle('active', isActive);
                b.style.background = isActive ? '#1a5276' : 'transparent';
                b.style.color = isActive ? '#fff' : '#666';
            }});
            const t = i18n[lang];
            document.querySelectorAll('[data-i18n]').forEach(el => {{
                const key = el.getAttribute('data-i18n');
                if (t[key] !== undefined) {{
                    if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {{
                        el.placeholder = t[key];
                    }} else {{
                        el.innerHTML = t[key];
                    }}
                }}
            }});
            document.documentElement.lang = lang === 'zh' ? 'zh-CN' : 'en';
        }}

        let galleryImages = [];
        let currentImageIndex = 0;

        function openModal(src) {{
            // Collect all gallery images
            const imgs = document.querySelectorAll('.gallery-grid img');
            galleryImages = Array.from(imgs).map(img => img.src);
            // Also include the main image if available (put it first)
            const mainImg = document.querySelector('.main-image img');
            if (mainImg) {{
                const mainSrc = mainImg.src;
                const idx = galleryImages.indexOf(mainSrc);
                if (idx !== -1) {{
                    galleryImages.splice(idx, 1);
                }}
                galleryImages.unshift(mainSrc);
            }}
            currentImageIndex = galleryImages.indexOf(src);
            if (currentImageIndex === -1) currentImageIndex = 0;
            showImage();
            document.getElementById('imageModal').classList.add('open');
        }}

        function changeImage(direction) {{
            currentImageIndex += direction;
            if (currentImageIndex < 0) currentImageIndex = galleryImages.length - 1;
            if (currentImageIndex >= galleryImages.length) currentImageIndex = 0;
            showImage();
        }}

        function showImage() {{
            document.getElementById('modalImage').src = galleryImages[currentImageIndex];
        }}

        // Close modal on background click
        document.getElementById('imageModal').addEventListener('click', function(e) {{
            if (e.target === this) this.classList.remove('open');
        }});

        // Close modal on X click
        document.querySelector('.modal .close').addEventListener('click', function() {{
            document.getElementById('imageModal').classList.remove('open');
        }});

        // Keyboard navigation
        document.addEventListener('keydown', function(e) {{
            if (!document.getElementById('imageModal').classList.contains('open')) return;
            if (e.key === 'ArrowLeft') changeImage(-1);
            if (e.key === 'ArrowRight') changeImage(1);
            if (e.key === 'Escape') document.getElementById('imageModal').classList.remove('open');
        }});

        // Init language from localStorage (default English)
        document.addEventListener('DOMContentLoaded', function() {{
            const saved = localStorage.getItem('lang') || 'en';
            switchLang(saved);
        }});
    </script>
</body>
</html>'''

    # Write the file
    filepath = os.path.join(DEST, f"{folder}.html")
    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(html)

    return folder, main_img, len(images)

if __name__ == '__main__':
    results = []
    for folder, info in PRODUCTS.items():
        cn_name, en_name, eng_path, desc, desc_en, features, feat_ens = info
        folder_name, main_img, img_count = generate_detail_page(cn_name, en_name, eng_path, folder, desc, desc_en, features, feat_ens)
        results.append((folder_name, main_img, img_count))
        print(f"✓ {cn_name}: {img_count}张图片, 主图: {main_img}")

    print(f"\n共生成 {len(results)} 个产品详情页")

    # Output mapping for reference
    mapping = {}
    for folder, info in PRODUCTS.items():
        cn_name = info[0]
        for f in os.listdir(os.path.join(DEST, folder)):
            if '主图' in f:
                mapping[cn_name] = f"products/{folder}/{f}"
                break
    print("\n主图映射:")
    for k, v in mapping.items():
        print(f"  {k}: {v}")
